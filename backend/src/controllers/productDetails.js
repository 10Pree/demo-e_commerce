const ModelsProductDetails = require('../models/productDetails');

class ControllerProductDetails {
    static async createProductAttributes(req, res){
        try{
            const { name } = req.body
            if(!name){
                return res.status(400).json({ message: "Name is required" })
            }
            const Attribute = await ModelsProductDetails.createProductAttributes({ name })
            return res.status(201).json({ message: "Create Product Attribute Successful!!", data: Attribute })
        }catch(error){
            return res.status(500).json({ message: error.message })
        }
    }

    static async createProductAttributeValues(req, res){
        try{
            const { id, value } = req.body
            if(!id || !value){
                return res.status(400).json({ message: "Id and Value are required" })
            }
            const Attribute = await ModelsProductDetails.createProductAttributesValues(id, value)
            return res.status(201).json({ message: "Create Product Attribute Value Successful!!", data: Attribute })
        }catch(error){
            return res.status(500).json({ message: error.message })
        }
    }

    static async createProductVariants(req, res){
        try{
            const { products_id, sku, price, stock } = req.body
            if(!products_id || !sku || !price || !stock) {
                return res.status(400).json({ message: "Product ID, SKU, Price and Stock are required" })
            } 
            const variant = await ModelsProductDetails.createProductVariants({ products_id, sku, price, stock })
            return res.status(201).json({ message: "Create Product Variant Successful!!", data: variant })
        }catch(error){
            return res.status(500).json({ message: error.message })
        }
    }

    static async createMap_Variant_Attribute_Values(req, res){
        try{
            const { product_variants_id, product_attribute_values_id } = req.body
            if(!product_variants_id || !product_attribute_values_id) {
                return res.status(400).json({ message: "Product Variant ID and Product Attribute Value ID are required" })
            }
            const map = await ModelsProductDetails.CreateMap_Variant_Attribute_Values({ product_variants_id, product_attribute_values_id })
            return res.status(201).json({ message: "Create Map Variant Attribute Value Successful!!", data: map })
        }catch(error){
            return res.status(500).json({ message: error.message })
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
            return res.status(500).json({ message: error.message })

        }
    }

    static async updateProductAttributesValue(req, res){
        try{
            const {paid, value , id} = req.body
            const data = { product_attributes_id: paid, value: value}
            const attributes = await ModelsProductDetails.updateProductAttributesValues(data, id)
            return res.status(200).json({ message: "Update Product Attribute Value Successful!!", data: attributes })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async updateProductVariants(req, res){
        try{
            const {products_id, sku, price, stock, id} = req.body
            const data = {products_id: products_id, sku: sku, price: price, stock: stock}
            const attributes = await ModelsProductDetails.updateProductVariants(data, id)
            return res.status(200).json({ message: "Update Product Variant Successful!!", data: attributes })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }

    static async updateMap_Variant_Attribute_Values(req, res){
        try{
            const {id, pvid, pavid} = req.body
            const data = { product_variants_id: pvid, product_attribute_values_id: pavid}
            const attributes = await ModelsProductDetails.updateMap_Variant_Attribute_Values(data, id)
            return res.status(200).json({ message: "Update Map Variant Attribute Value Successful!!", data: attributes })
        }catch(error){
            console.log(error)
            return res.status(500).json({ message: error.message })
        }
    }

}

module.exports = ControllerProductDetails