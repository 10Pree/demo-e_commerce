const { getDB } = require("../config/db")

class modlesImages {
    static async create(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO images SET ?', data)
            return resulte 
        }catch(error){
            throw error
        }
    }

    static async getImageAll(){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM images')
            return resulte
        }catch(error){
            throw error
        }
    }

    static async getById(id){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM images WHERE id = ?', id)
            return resulte
        }catch(error){
            throw error
        }
    }

    static async update(id, data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE images SET ? WHERE id = ?', [data, id])
            return resulte
        }catch(error){
            throw error
        }
    }

    static async delete(id){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM images WHERE id = ? ', id)
            return resulte
        }catch(error){
            throw error
        }
    }
    static async createMap(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO map_images SET ?', data)
            return resulte
        }catch(error){
            throw error
        }
    }
}

module.exports = modlesImages