const modelsOAuth = require("../models/auth");
const modelsCustomers = require("../models/customers");
const modlesImagesCustomers = require("../models/images_customers");
const { hashPassword } = require("../services/password-service");

class controllerCustomers {
    static async Create(req, res) {
        try {
            const { username, password, email, phone, address, role } = req.body;
            const file_Image = req.file
            // console.log('Body:', req.body); 
            // console.log('File:', req.file); 
            const hash_Password = await hashPassword(password)
            const data = {
                username,
                password: hash_Password,
                email,
                phone,
                address
            }
            const customer = await modelsCustomers.create(data)

            if (file_Image && customer) {
                const url = `/uploads/users/${customer.filename}`
                const image = await modlesImagesCustomers.create(url)

                await modlesImagesCustomers.createMapCustomer([customer.insertId, image.insertId])
            }

            if (customer) {
                await modelsOAuth.mapRoleCustomer({ customers_id: customer.insertId, roles_id: role || 1 })
            }
            return res.status(201).json({
                message: "Create customer Successful!!"
            })
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Duplicate entry (username or email already exists)" })
            }
            console.log("Message Error:", err);
            return res.status(500).json({
                message: "Server Error",
            });
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
                return res.status(400).json({
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
        try {
            const customerId = req.params.id
            const { username, email, phone, address } = req.body
            const file_image = req.file
            // console.log("id:", customerId)
            // console.log("image:", file_image)
            if (!customerId) {
                return res.status(400).json({
                    message: "Customer ID Not Found"
                })
            }
            const newData = {}
            const checkCustomer = await modelsCustomers.getCustomerById(customerId)
            if (checkCistomer.length <= 0) {
                return res.status(400).json({
                    message: "Customer ID Not Found"
                })
            }

            if (username) newData.username = username
            if (email) newData.email = email
            if (phone) newData.phone = phone
            if (address) newData.address = address
            // console.log("DATA:", newData)
            if (Object.keys(newData).length > 0) {
                const newCustomer = await modelsCustomers.update(customerId, newData)
            }
            if (file_image) {
                const url = `/uploads/customers/${file_image.filename}`
                const rowImg = await modlesImagesCustomers.getImgByIdCustomer(customerId)
                // console.log(rowImg)
                if(rowImg.length > 0){
                    await modlesImagesCustomers.deleteByMapId(customerId)
                    await modlesImagesCustomers.delete(rowImg[0].id)
                }
                const image = await modlesImagesCustomers.create(url)
                const map = await modlesImagesCustomers.createMapCustomer(customerId, image.insertId)
            }
            // console.log(newData)


            return res.status(200).json({
                message: "Update Data Customer Successful!!"
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