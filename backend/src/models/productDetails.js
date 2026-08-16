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

    static async updateProductAttributes(data, conn){
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('UPDATE product_attributes SET ? WHERE id = ?', [data, data.id])
            return results
        }catch(error){
            throw error
        }
    }

    static async updateProductAttributesValues(data, id, conn){
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('UPDATE product_attribute_values SET ? WHERE id = ?', [data, id])
            return results
        }catch(error){
            throw error
        }
    }

    static async updateProductVariants(data, id, conn){
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('UPDATE product_variants SET ? WHERE id = ?', [data, id])
            return results
        }catch(error){
            throw error
        }
    }

    static async updateMap_Variant_Attribute_Values(data, id, conn){
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('UPDATE map_variant_attribute_values SET ? WHERE id = ?', [data, id])
            return results
        }catch(error){
            throw error
        }
    }

        static async deleteMap_Variant_Attribute_Values(id, conn){
        try{
            const executer = conn || getDB()
            const [results] = await executer.query('DELETE FROM map_variant_attribute_values WHERE product_variants_id = ?', [id])
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = ModelsProductDetails