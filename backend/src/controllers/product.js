const moduleProduct = require("../models/product")

class controllerProduct {
    static async create(req, res) {
        try {
            const { p_code, p_name, p_rice, p_details, p_stock, p_image_url } = req.body
            const data = {}
            if (p_code) data.p_code = p_code
            if (p_name) data.p_name = p_name
            if (p_rice) data.p_rice = p_rice
            if (p_details) data.p_details = p_details
            if (p_stock) data.p_stock = p_stock
            if (p_image_url) data.p_image_url = p_image_url

            await moduleProduct.create(data)

            res.status(200).json({
                message: "Create Product Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllerProduct