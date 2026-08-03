const ModelsProductDetails = require('../models/productDetails');

class ControllerProductDetails {
    static async createProductAttributes(req, res){
        try{
            const { name } = req.body
            if(!name){
                return res.status(400).json({ message: "Name is required" })
            }
            const Attribute = await ModelsProductDetails.createProductAttributes({ name })
            res.status(201).json({ message: "Create Product Attribute Successful!!", data: Attribute })
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    }

    static async createProductAttributeValues(req, res){
        try{
            const { id, value } = req.body
            if(!id || !value){
                return res.status(400).json({ message: "Id and Value are required" })
            }
            const Attribute = await ModelsProductDetails.createProductAttributesValues(id, value)
            res.status(201).json({ message: "Create Product Attribute Value Successful!!", data: Attribute })
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    }
}

module.exports = ControllerProductDetails