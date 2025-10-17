const { getDB } = require("../config/db")

class modlesRefreshToken {
    static async create(data){
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO refresh_token SET ?', data)
            return results
        }catch(error){
            throw error
        }
    }
    static async getToken(){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM refresh_token')
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = modlesRefreshToken