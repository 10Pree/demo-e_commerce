const { getDB } = require("../config/db")

class modelsCustomers {
    static async create(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO customers SET ?', [data])
            return results
        } catch (err) {
            throw err
        }
    }
    static async getCustomers() {
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT id, username, email, phone, address FROM customers WHERE deleted_at IS NULL')
            return results
        }catch(err){
            throw err
        }
    }
    static async getCustomerById(id){
        try{
            const conn = await getDB()
            const [results] = await conn.query(`SELECT id, username, email, phone, address FROM customers WHERE id = ? AND deleted_at IS NULL`, id)
            return results
        }catch(err){
            throw err
        }
    }
    static async update(id, newData){
        try{
            const conn  = await getDB()
            const [results] = await conn.query('UPDATE customers SET ? WHERE id = ?',[newData, id] )
        }catch(err){
            throw err
        }
    }
    static async deleted(id){
        try{
            const conn = await getDB()
            const [results] = await conn.query('DELETE FROM customers WHERE id = ?', id)
            return results
        }catch(err){
            throw err
        }
    }
    static async softdelete(id){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE customers SET deleted_at = Now() WHERE id = ?', id)
            return results
        }catch(err){
            throw err
        }
    }
}

module.exports = modelsCustomers