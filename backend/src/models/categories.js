const { getDB } = require("../config/db")

class modelsCategories {
    static async create(data){
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO categories SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }
    static async gets(){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM categories')
            return resulte
        }catch(error){
            throw error
        }
    }
        static async getById(id){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM categories WHERE id = ?', id)
            return resulte
        }catch(error){
            throw error
        }
    }
    static async update(id,data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE categories SET ? WHERE id = ?', [data, id])
            return resulte
        }catch(error){
            throw error
        }
    }
}

module.exports = modelsCategories