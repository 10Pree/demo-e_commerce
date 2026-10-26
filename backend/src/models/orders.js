const { getDB } = require("../config/db");

class modelsOrders {
    static async createOrder(data, conn) {
        try {
            const executer = conn || getDB()
            const resulte = await executer.query('INSERT INTO orders SET ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createOrderItem(data, conn) {
        try {
            const executer = conn || getDB()
            const [resulte] = await executer.query('INSERT INTO order_items SET ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async productItem(productId, conn) {
        try {
            const executer = conn || getDB()
            const [resulte] = await executer.query('SELECT id, p_price, p_name FROM products WHERE id = ?', productId)
            return resulte
        } catch (error) {
            throw error
        }
    }


    static async getListOrders() {
        try{
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT
                o.id, o.status, o.total, o.creates_at, o.paid_at, 
                c.username AS customer_name, c.email, c.phone, 
                p.method AS payment_method, p.status AS payment_status,
                COALESCE(oi.item_conut, 0) AS item_conut, COALESCE(oi.total_qty, 0) AS total_qty
                FROM orders o
                JOIN customers c ON c.id = o.customers_id
                LEFT JOIN payments p ON p.orders_id = o.id
                LEFT JOIN (
                    SELECT
                    orders_id, COUNT(*) AS item_conut, SUM(qty) AS total_qty
                    FROM
                    order_items
                    GROUP BY orders_id
                    ) oi ON oi.orders_id = o.id
                ORDER BY o.id DESC, o.id DESC
                LIMIT 100 OFFSET 0
                `)
            return resulte
        }catch(error){
            throw error
        }
    }

    static async getOrderDetail(orderId){
        try{
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT 
                oi.product_name, oi.price, oi.qty, oi.line_total,
                c.username AS customer_name, c.email, c.phone, c.address,
                p.amount, p.method AS payment_method, p.status AS payment_status, p.paid_at, p.expires_at, p.external_ref, p.payer_ref
                FROM order_items oi
                JOIN orders o ON o.id = oi.orders_id
                JOIN customers c ON c.id = o.customers_id
                JOIN payments p ON p.orders_id = o.id
                WHERE o.id = ?
                `, [orderId])
                return resulte
        }catch(error){
            throw error
        }
    }

    static async updateOrder(orderId, conn) {
        try {
            const executer = conn || getDB()
            const [resulte] = await executer.query('UPDATE orders SET total = ( SELECT COALESCE(SUM(line_total)) FROM order_items WHERE orders_id = ? ) WHERE id = ?', [orderId, orderId])
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
    static async getOrdersAndpayments(conn) {
        try{
            const executer = conn ||  getDB()
            const [resulte] = await executer.query(`
                SELECT 
                    (SELECT COUNT(*) FROM orders) AS total_orders,
                    (SELECT COUNT(*) FROM products) AS total_products,
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
                WHERE creates_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY) 
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

module.exports = modelsOrders