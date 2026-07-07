const { getDB } = require("../config/db")

class modelsLog {
    static async createLogAction(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO log_action SET ?', [data])
            return resulte
        }catch(error){
            throw error
        }
    }
        static async createLogProduct(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO log_products SET ?', [data])
            return resulte
        }catch(error){
            throw error
        }
    }
    static async getLogUsers(){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM log_action')
            return resulte
        }catch(error){
            throw error
        }
    }

    static async getLogProducts() {
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM log_products')
            return resulte
        }catch(error){
            throw error
        }
    }
}

module.exports = modelsLog
