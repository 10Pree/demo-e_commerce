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

    static async createProductVariants(req, res){
        try{
            const { products_id, sku, price, stock } = req.body
            if(!products_id || !sku || !price || !stock) {
                return res.status(400).json({ message: "Product ID, SKU, Price and Stock are required" })
            } 
            const variant = await ModelsProductDetails.createProductVariants({ products_id, sku, price, stock })
            res.status(201).json({ message: "Create Product Variant Successful!!", data: variant })
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    }

    static async createMap_Variant_Attribute_Values(req, res){
        try{
            const { product_variants_id, product_attribute_values_id } = req.body
            if(!product_variants_id || !product_attribute_values_id) {
                return res.status(400).json({ message: "Product Variant ID and Product Attribute Value ID are required" })
            }
            const map = await ModelsProductDetails.CreateMap_Variant_Attribute_Values({ product_variants_id, product_attribute_values_id })
            res.status(201).json({ message: "Create Map Variant Attribute Value Successful!!", data: map })
        }catch(error){
            res.status(500).json({ message: error.message })
        }
    }

    static async updateProductAttributes(req, res){
        try{
            const { id, name} = req.body
            if(!id || !name){
                return res.status(400).json({ message: "Id and Name are required" })
            }
            const attributes = await ModelsProductDetails.updateProductAttributes({ id, name })
            return res.status(200).json({ message: "Update Product Attribute Successful!!", data: attributes })
        }catch(error){
            
        }
    }
}

module.exports = ControllerProductDetails