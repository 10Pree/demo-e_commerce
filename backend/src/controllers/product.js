const moduleProduct = require("../models/product");
const genProductCode = require("../services/genProductCode");
const { CreateLogProducts } = require("../services/logAction");

class controllerProduct {
    static async Create(req, res) {
        try {
            const { p_name, p_price, p_details, p_stock } = req.body;
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

            await moduleProduct.create(data);

            const userId = req.user
            // console.log("user id", userId.userId )
            await CreateLogProducts(data.p_code, userId, "Create.Product")
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
        try {
            // const userId = 
            const productId = req.params.id
            const { p_name, p_price, p_details, p_stock, p_image_url } = req.body
            const newData = {}
            if (p_name) newData.p_name = p_name
            if (p_price) newData.p_price = p_price
            if (p_details) newData.p_details = p_details
            if (p_stock) newData.p_stock = p_stock
            if (p_image_url) newData.p_image_url = p_image_url

            const checkProduct = await moduleProduct.read(productId)
            if (checkProduct.length === 0) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }
            const product = await moduleProduct.update(productId, newData)
            const token = req.cookies.access_token
            const productCode = checkProduct[0].p_code
            await CreateLogProducts(productCode, token, "Update.Product")
            return res.status(200).json({
                message: "Update Product Successful!!",
                data: product
            })

        } catch (error) {
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
            const token = req.cookies.access_token
            const productCode = checkProduct[0].p_code
            await CreateLogProducts(productCode, token, "Delete.Product")

            const product = await moduleProduct.delete(productId)
            return res.status(200).json({
                message: "Delete Product Successful!!",
                data: product
            })

        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
}

module.exports = controllerProduct;
