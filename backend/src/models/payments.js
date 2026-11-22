const { getDB } = require("../config/db")

class modelsPayments {
    static async createPayment(data, conn) {
        try {
            const executer = conn || getDB()
            const [resulte] = await executer.query('INSERT INTO payments SET ?', [data])
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
    static async orderIdByPayment(orderId, conn) {
        try {
            const executer = conn || await getDB()
            const [resulte] = await executer.query('SELECT * FROM payments WHERE orders_id = ? ORDER BY id DESC LIMIT 1', [orderId])
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
                    WHERE status = 'paid' AND paid_at >= DATE_SUB(CURDATE(), INTERVAL 12 year)
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

        static async getDailyMonthIncome(year) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                WITH RECURSIVE m AS (
                    SELECT 1 AS n
                    UNION ALL
                    SELECT n + 1 FROM m WHERE n < 12
                ),
                monthly AS (
                    SELECT 
                        MONTH(paid_at) AS month_on ,
                        SUM(amount) AS revenue
                        FROM payments 
                        WHERE status = "paid" 
                            AND paid_at >= MAKEDATE(?, 1)
                            AND paid_at < MAKEDATE(? + 1, 1)
                         GROUP BY MONTH(paid_at)
                )
                SELECT
                    m.n AS month, COALESCE(monthly.revenue) AS revenue
                FROM m
                LEFT JOIN monthly ON monthly.month_on = m.n
                ORDER BY m.n
                `, [year, year])
            return resulte
        } catch (error) {
            throw error
        }
    }

}

module.exports = modelsPayments