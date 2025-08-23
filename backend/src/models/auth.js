const { getDB } = require("../config/db");

class modelsOAuth{
    static async getPermission(permission){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT ')
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }
}

module.exports = modelsOAuth