const { getDB } = require("../config/db");
const fs = require('fs')
const modelsCategories = require("../models/categories");
const modlesImages = require("../models/images");
const moduleProduct = require("../models/product");
const genProductCode = require("../services/genProductCode");
const { CreateLogProducts } = require("../services/logAction");
const path = require("path");


class controllerProduct {
    static async Create(req, res) {
        try {
            const { p_name, p_price, p_details, p_stock, categories_ids } = req.body || {};
            const image_url = req.files
            console.log("CONTENT-TYPE:", req.headers['content-type']);
            console.log("FILES:", req.files);
            console.log("BODY:", req.body);

            const data = {};
            for (let i = 0; i < 3; i++) { // สุ่มใหม่ 3 ครั้ง
                const code = genProductCode('PRD', 6);
                const dup = await moduleProduct.readCode(code);
                if (dup.length === 0) { data.p_code = code; break; }
            }
            if (!data.p_code) return res.status(409).json({ message: 'สร้างรหัสไม่สำเร็จ ลองใหม่อีกครั้ง' });
            if (p_name) data.p_name = p_name;
            if (p_price) data.p_price = p_price;
            if (p_details) data.p_details = p_details;
            if (p_stock) data.p_stock = p_stock;


            const product = await moduleProduct.create(data);

            // console.log("p_image_url:", image_url, Array.isArray(image_url))

            if (Array.isArray(image_url) && image_url.length > 0) {
                const imageIds = []

                for (const file of image_url) {
                    const url = `/uploads/products/${file.filename}`
                    const image = await modlesImages.create(url)
                    imageIds.push(image.insertId)
                }

                const rows = imageIds.map(imgId => [product.insertId, imgId])
                await modlesImages.createMap(rows)
            }

            if (Array.isArray(categories_ids) && categories_ids.length > 0) {
                const rows = categories_ids.map(catId => [product.insertId, catId])
                await modelsCategories.createMap(rows)
            }

            // await modelsCategories.createMap(row)

            // console.log("product id", productId.insertId )
            const userId = req.user.userId
            await CreateLogProducts(product.insertId, userId, "Create.Product")
            return res.status(200).json({
                message: "Create Product Successful!!",
            });
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Reads(req, res) {
        try {
            const products = await moduleProduct.reads()
            return res.status(200).json({
                message: "Reads Products Successful!!",
                data: products
            })
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Read(req, res) {
        try {
            const productId = req.params.id

            const product = await moduleProduct.read(productId)
            if (product.length === 0) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }
            return res.status(200).json({
                message: "Read Product Successful!!",
                data: product
            })
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async ReadCode(req, res) {
        try {
            const productId = req.params.code
            console.log()
            const product = await moduleProduct.readCode(productId)
            if (product.length === 0) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }
            return res.status(200).json({
                message: "Read Product Successful!!",
                data: product
            })
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Update(req, res) {
        // const conn = await getDB()
        try {
            // await conn.beginTransaction()
            const productId = req.params.id
            const checkProduct = await moduleProduct.read(productId)
            if (checkProduct.length === 0) {
                throw new Error("Product Not Found")
            }

            const { p_name, p_price, p_details, p_stock, categories_ids } = req.body
            const image_url = req.files
            const newData = {}
            if (p_name) newData.p_name = p_name
            if (p_price) newData.p_price = p_price
            if (p_details) newData.p_details = p_details
            if (p_stock) newData.p_stock = p_stock

            if (Object.keys(newData).length > 0) {
                await moduleProduct.update(productId, newData)
            }

            if (Array.isArray(image_url) && image_url.length > 0) {
                const imgIds = []
                const rows = await modlesImages.getImgByIdProduct(productId)

                for(const img of rows){
                    const fullPath = path.join(__dirname, '../../', img.image_url)

                    if(fs.existsSync(fullPath)){
                        fs.unlinkSync(fullPath)
                    }
                }
                    
                await modlesImages.deleteImgByIdProduct(productId)
                for (const file of image_url) {
                    const url = `/uploads/products/${file.filename}`
                    const image = await modlesImages.create(url)
                    imgIds.push(image.insertId)
                }

                const mapImages = imgIds.map(imgid => [productId, imgid])
                await modlesImages.createMap(mapImages)
            }

            if (Array.isArray(categories_ids) && categories_ids.length > 0) {
                await modelsCategories.delete(productId)

                const rows = categories_ids.map(catId => [productId, catId])
                await modelsCategories.createMap(rows)

            }


            const userId = req.user.userId
            await CreateLogProducts(productId, userId, "Update.Product")
            return res.status(200).json({
                message: "Update Product Successful!!",
            })

        } catch (error) {
        
            if(req.files){
                for(const file of req.files){
                    fs.unlinkSync(file.path)
                }
            }
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Delete(req, res) {
        try {
            const productId = req.params.id
            const checkProduct = await moduleProduct.read(productId)
            if (checkProduct.length === 0) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }


            await modelsCategories.delete(productId)
            await modlesImages.deleteImgByIdProduct(productId)
            const product = await moduleProduct.delete(productId)

            const userId = req.user.insertId
            await CreateLogProducts(productId, userId, "Delete.Product")


            return res.status(200).json({
                message: "Delete Product Successful!!"
                // data: product
            })

        } catch (error) {
            console.log("Message Error:", error.message);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
}

module.exports = controllerProduct;
