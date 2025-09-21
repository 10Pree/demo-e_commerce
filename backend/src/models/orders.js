const { getDB } = require("../config/db");

class moduleOrders {
    static async createOrder(data) {
        try {
            const conn = await getDB()
            const resulte = await conn.query('INSERT INTO orders SET ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createOrderItem(data){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO order_items SET ?', [data])
            return resulte
        }catch(error){
            throw error
        }
    }

    static async productItem(productId){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, p_price FROM products WHERE id = ?', productId)
            return resulte
        }catch(error){
            throw error
        }
    }

    static async updataOrderItme(orderId, line_total){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE orders SET total = ? WHERE id = ?', [line_total, orderId])
            return resulte
        }catch(error){
            throw error
        }
    }
}

module.exports = moduleOrders