const { getDB } = require("../config/db")

class moduleProduct {
    static async create(data) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO products SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }
    static async reads(){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM products')
            return results
        }catch(error){
            throw error
        }
    }

    static async read(productId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM products WHERE id = ?', productId)
            return results
        }catch(error){
            throw error
        }
    }

    static async readCode(codeId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM products WHERE p_code = ?', codeId)
            return results
        }catch(error){
            throw error
        }
    }

    static async update(productId, data){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE products SET ? WHERE id = ?',[data, productId])
            return results
        }catch(error){
            throw error
        }
    }
    
    static async delete(productId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('DELETE FROM products WHERE id = ?', productId)
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = moduleProduct