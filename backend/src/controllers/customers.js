const modelsOAuth = require("../models/auth");
const modelsCustomers = require("../models/customers");
const modlesImagesCustomers = require("../models/images_customers");
const { hashPassword, verifyPassword } = require("../services/password-service");
const { getConnection } = require("../config/db");
const fs = require('fs/promises')
const path = require('path')
const path_Customers = path.join(__dirname, '../../uploads/customers')

class controllerCustomers {
    static async Create(req, res) {
        const conn = await getConnection()
        try {
            await conn.beginTransaction()
            const { username, password, email, phone, address, role } = req.body;
            const newFiles = req.files || []
            const file_Image = newFiles.map(file => {
                const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                const url = `/uploads/customers/${filename}`
                return {
                    filename,
                    buffer: file.buffer,
                    url
                }
            })
            const hash_Password = await hashPassword(password)
            const data = {
                username,
                password: hash_Password,
                email,
                phone,
                address
            }
            const customer = await modelsCustomers.create(data, conn)

            if (Array.isArray(file_Image) && file_Image.length > 0) {
                const image = await modlesImagesCustomers.create(file_Image[0].url, conn)
                await modlesImagesCustomers.createMapCustomer(customer.insertId, image.insertId, conn)
                console.log("image:", image, "customer_id:", customer.insertId, "image_id:", image.insertId )
            }

            if (customer) {
                await modelsOAuth.mapRoleCustomer({ customers_id: customer.insertId, roles_id: role || 1 }, conn)
            }

            await conn.commit()

            if(Array.isArray(file_Image) && file_Image.length > 0){
                try {
                    await fs.writeFile(path.join(path_Customers, file_Image[0].filename), file_Image[0].buffer)
                } catch(fileError) {
                    console.log("File write error after commit (DB already saved):", fileError)
                }
            }

            return res.status(201).json({
                message: "Create customer Successful!!"
            })
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Duplicate entry (username or email already exists)" })
            }
            console.log("Message Error:", err);
            await conn.rollback()
            return res.status(500).json({
                message: "Server Error",
            });
        } finally {
            conn.release()
        }
    }
    static async GetCustomers(req, res) {
        try {
            const customers = await modelsCustomers.getCustomers()
            return res.status(200).json({
                message: "Get Customers Successful!!",
                data: customers
            })
        } catch (err) {
            console.log("Message Error:", err);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
    static async GetCustomerById(req, res) {
        try {
            const customerId = req.params.id
            if (!customerId) {
                return res.status(404).json({
                    message: "Customer ID Not Found"
                })
            }
            const customer = await modelsCustomers.getCustomerById(customerId)
            return res.status(200).json({
                message: "Get By ID Customer Successful!!",
                data: customer
            })
        } catch (err) {
            console.log("Message Error:", err);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
    static async UpdateCustomer(req, res) {
        const conn = await getConnection()
        const filesToDeleteAfterCommit = []
        const filesToWriteAfterCommit = []
        try {
            await conn.beginTransaction()
            const customerId = req.params.id
            const { username, email, phone, address } = req.body
            const new_files = req.files || []
            const file_image = new_files.map(file => {
                const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                const url = `/uploads/customers/${filename}`
                return {
                    filename,
                    buffer: file.buffer,
                    url
                }
            })
            if (!customerId) {
                throw new Error('Customer ID Not Found')
            }
            const newData = {}
            const checkCustomer = await modelsCustomers.getCustomerById(customerId, conn)
            if (checkCustomer.length <= 0) {
                throw new Error('Customer Not Found')
            }

            if (username) newData.username = username
            if (email) newData.email = email
            if (phone) newData.phone = phone
            if (address) newData.address = address
            if (Object.keys(newData).length > 0) {
                await modelsCustomers.update(customerId, newData, conn)
            }
            if (Array.isArray(file_image) && file_image.length > 0) {
                const images = []
                const rowImg = await modlesImagesCustomers.getImgByIdCustomer(customerId, conn)

                for(const img of rowImg){
                    const full_Path = path.join(__dirname, '../../', img.image_url)
                    filesToDeleteAfterCommit.push(full_Path)
                }
                await modlesImagesCustomers.deleteImgByIdCustomer(customerId, conn)
                for(const img of file_image){
                    const url = `/uploads/customers/${img.filename}`
                    const image = await modlesImagesCustomers.create(url, conn)
                    images.push(image.insertId)
                    filesToWriteAfterCommit.push({
                        fullPath: path.join(path_Customers, img.filename),
                        buffer: img.buffer
                    })
                }

                const rowMapId = images.map(imageId => [customerId, imageId])
                await modlesImagesCustomers.createMapCustomer(rowMapId, conn)
            }

            await conn.commit()

            for(const img of filesToDeleteAfterCommit){
                try{
                    await fs.unlink(img)
                }catch(fileError){
                    if (error.code !== "ENOENT") console.log("ลบไฟล์เก่าไม่สำเร็จ:", img, error)
                }
            }
            for(const { fullPath, buffer } of filesToWriteAfterCommit){
                try{
                    await fs.writeFile(fullPath, buffer)
                }catch(fileError){
                    console.log("File write error after commit (DB already saved):", fileError)
                }
            }
            return res.status(200).json({
                message: "Update Data Customer Successful!!"
            })

        } catch (err) {
            console.log("Message Error:", err);
            await conn.rollback()
            return res.status(500).json({
                message: "Server Error",
            });
        } finally {
            conn.release()
        }
    }
    static async UpdatePassword(req, res) {
        const conn = await getConnection()
        try {
            await conn.beginTransaction()
            const userId = req.params.id 
            const { currentPassword ,newPassword} = req.body

            if(!newPassword || newPassword.length < 8 || typeof newPassword !== 'string'){ 
                throw new Error("Password must be at least 8 characters") 
            }

            if(!userId){
                throw new Error("Customer ID Not Found")
            }

            const row = await modelsCustomers.getPassword(userId, conn)
            if(row.length === 0){
                throw new Error("Customer Not Found")
            }

            const isMatch = await verifyPassword(row[0].password, currentPassword)
            if(!isMatch){
                throw new Error("Password not match")
            }
            
            const newHash = await hashPassword(String(newPassword))
            await modelsCustomers.updatePassword(userId, newHash, conn)

            await conn.commit()

            return res.status(200).json({
                message: "Update Customer Successful!!"
            })

        } catch (err) {
            console.log("Message Error:", err);
            await conn.rollback()
            return res.status(500).json({
                message: "Server Error",
            });
        } finally {
            conn.release()
        }
    }
    static async deleted(req, res) {
        try {
            const customerId = req.params.id
            const rowImg = await modlesImagesCustomers.getImgByIdCustomer(customerId)
            // console.log(rowImg[0].id)
            await modlesImagesCustomers.deleteByMapId(customerId)
            await modlesImagesCustomers.delete(rowImg[0].id)

            const image = await modelsCustomers.deleted(customerId)
            return res.status(204).json({
                message: "Deleted Customer Successful!!"
            })
        } catch (err) {
            console.log("Message Error:", err);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
    static async softdelete(req, res) {
        try {
            const customerId = req.params.id
            const row = await modelsCustomers.getCustomerById(customerId)
            if (customerId && row.length < 0) {
                return res.status(404).json({
                    message: "Customer Not Found"
                })
            }
            const image = await modelsCustomers.softdelete(customerId)

            return res.status(204).json({
                message: "Deleted Customer Successful!!"
            })
        } catch (err) {
            console.log("Message Error:", err);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

}

module.exports = controllerCustomers