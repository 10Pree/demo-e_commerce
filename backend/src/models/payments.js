const { getDB } = require("../config/db")

class modelsPayments {
    static async createPayment(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO payments SET ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async updatePayment(ordersId) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`UPDATE payments SET status = 'paid', paid_at = NOW() WHERE orders_id = ?`, [ordersId])
            return results
        } catch (error) {
            throw error
        }
    }
    static async orderIdByPayment(orderId) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM payments WHERE orders_id = ? ORDER BY id DESC LIMIT 1', [orderId])
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getDailyIncome() {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT
                    DATE(paid_at) AS date,
                    SUM(amount) AS revenue
                    FROM payments
                    GROUP BY DATE(paid_at)
                    ORDER BY date ASC
                `)
            return resulte.map(r => ({
                ...r,
                date: r.date.toISOString().split('T')[0],
                revenue: Number(r.revenue)
            }))
        } catch (error) {
            throw error
        }
    }

}

module.exports = modelsPayments