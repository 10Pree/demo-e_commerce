const { getDB } = require("../config/db")

class ModelsProductDetails {
    static async createProductAttributes(data, conn) {
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('INSERT INTO product_attributes SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }

    static async createProductAttributesValues(id, value, conn) {
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('INSERT INTO product_attribute_values (value, product_attributes_id) VALUES (?, ?)', [value, id])
            return results
        }catch(error){
            throw error
        }
    }

    static async createProductVariants (data, conn) {
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('INSERT INTO product_variants SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }

    static async CreateMap_Variant_Attribute_Values(data, conn) {
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('INSERT INTO map_variant_attribute_values (product_variants_id, product_attribute_values_id) VALUES ?', [data])
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = ModelsProductDetails