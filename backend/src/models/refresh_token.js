const { getDB } = require("../config/db")

class modelsRefreshToken {
    static async create(data){
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO refresh_token SET ?', data)
            return results
        }catch(error){
            throw error
        }
    }
    static async getToken(token){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM refresh_token WHERE token = ? and status = 0', token)
            return results
        }catch(error){
            throw error
        }
    }
    static async revokeAllByUserId(id){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE refresh_token SET status = 1 WHERE users_id = ?', [id])
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = modelsRefreshToken