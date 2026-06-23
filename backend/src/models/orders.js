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
    static async createOrderItem(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO order_items SET ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async productItem(productId) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, p_price FROM products WHERE id = ?', productId)
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async updateOrder(orderId) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE orders SET total = ( SELECT COALESCE(SUM(line_total)) FROM order_items WHERE orders_id = ? ) WHERE id = ?', [orderId, orderId])
            return resulte
        } catch (error) {
            throw error
        }
        // COALESCE กันค่า NULL
    }

    static async updateOrderPaid(orderId) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`UPDATE orders SET status = 'paid', paid_at = NOW() WHERE id = ?`, [orderId])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async orderItmeByID(orderId) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT total FROM orders WHERE id = ?', orderId)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getOrdersAndpayments() {
        try{
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT 
                    (SELECT COUNT(*) FROM orders) AS total_orders,
                    (SELECT COUNT(*) FROM orders WHERE status = 'paid') AS paid_orders,
                    (SELECT COUNT(*) FROM orders WHERE status = 'pending') AS pending_orders,
                    (SELECT SUM(amount) FROM payments WHERE status = 'paid') AS total_revenue
                `)
                return resulte.map(r => ({
                    ...r,
                    total_revenue: Number(r.total_revenue || 0).toFixed(2)
                }))
        }catch(error){
            throw error
        }
    }

    static async getDailyOrders() {
        try{
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT DATE(creates_at) AS date, COUNT(*) AS total_orders 
                FROM orders 
                WHERE creates_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR) 
                GROUP BY DATE(creates_at) 
                ORDER BY date ASC
                `)
            return resulte.map(r => ({
                ...r,
                date: r.date.toISOString().split('T')[0]
            }))
        }catch(error){
            throw error
        }
    }
}

module.exports = moduleOrders