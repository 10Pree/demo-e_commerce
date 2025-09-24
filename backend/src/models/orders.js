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

    static async updateOrder(orderId){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE orders SET total = ( SELECT COALESCE(SUM(line_total)) FROM order_items WHERE orders_id = ? ) WHERE id = ?', [orderId, orderId])
            return resulte
        }catch(error){
            throw error
        }
        // COALESCE กันค่า NULL
    }

        static async orderItmeByID(orderId){
            try{
                const conn = await getDB()
                const [resulte] = await conn.query('SELECT total FROM orders WHERE id = ?',orderId)
                return resulte
            }catch(error){
                throw error
            }
        }
}

module.exports = moduleOrders