const { getDB } = require("../config/db")

class modelsPayments{
        static async createPayment(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO payments SET ?', [data])
            return resulte
        }catch(error){
            throw error
        }
    }
    
}

module.exports = modelsPayments