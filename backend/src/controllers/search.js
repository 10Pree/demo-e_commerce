const modelsSearch = require("../models/search")

class controllersSearch {
    static async search(req, res) {
        try {
            const { search, category } = req.query
            let sql
            let sqlBase = `
                SELECT DISTINCT  p.*
                FROM products p 
                LEFT JOIN map_categories mc ON mc.products_id = p.id
                LEFT JOIN categories c ON c.id = mc.categories_id
                WHERE 1=1
                `
            let params = []
            if (search) {
                sqlBase += ` AND p.p_name LIKE ? AND deleted_at IS NULL`
                params.push(`%${search}%`)
            }
            if (category) {
                sqlBase += ` AND c.id = ? AND deleted_at IS NULL`
                params.push(category)
            }
            if (search || category) {
                sql = sqlBase
            } else {
                sql = `SELECT * FROM products WHERE deleted_at IS NULL`
            }

            const data = await modelsSearch.search(sql, params)
            return res.status(200).json({
                message: "Search Successful!!",
                data: data
            })
        } catch (error) {
            console.log("Server Error: ", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async searchOrders(req, res) {
        try {
            const { search, status } = req.query
            console.log("Search:", search, "Status:", status)
            // let sql
            let sql = `
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
                     WHERE 1=1
            `
            let params = []
            if (search) {
                sql += ` AND c.username LIKE ?`
                params.push(`%${search}%`)
            }

            if (status) {
                sql += ` AND o.status = ?`
                params.push(status)
            }

            sql += `ORDER BY o.id DESC, o.id DESC`

            // sql = sqlBase
            

            const data = await modelsSearch.search(sql, params)
            return res.status(200).json({
                message: "Search Successful!!",
                data: data
            })
        } catch (error) {
            console.log("Server Error: ", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
    static async searchUsers(req, res) {
        try {
            const { name } = req.query

            const user = await modelsSearch.searchUser(name)

            return res.status(200).json({
                message: "Search User Successful!!",
                data: user
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async searchCustomers(req, res) {
        try {
            const { name } = req.query

            const customer = await modelsSearch.searchCustomers(name)
            return res.status(200).json({
                message: "Search Customer Successful!!",
                data: customer
            })
        } catch (err) {
            console.log("Message Error:", err);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async searchProductsPublic(req, res) {
        try {
            const { search, category } = req.query
            let sql = `
                SELECT p.p_code, p.p_name, p.p_price, p.p_details, p.p_stock,
                    (
                        SELECT ip.image_url 
                        FROM map_images_products mip
                        LEFT JOIN images_products ip ON ip.id = mip.images_id
                        WHERE mip.products_id = p.id
                        ORDER BY mip.id ASC
                        LIMIT 1 
                    ) AS image_url
                FROM products p 
                LEFT JOIN map_categories mc ON mc.products_id = p.id
                LEFT JOIN categories c ON c.id = mc.categories_id
                WHERE p.deleted_at IS NULL
                `
            let params = []
            if (search) {
                sql += ` AND p.p_name LIKE ?`
                params.push(`%${search}%`)
            }
            if (category) {
                sql += ` AND c.id = ?`
                params.push(category)
            }

            sql += `GROUP BY p.id`

            const data = await modelsSearch.searchProductsPublic(sql, params)

            return res.status(200).json({
                message: "Search Successful!!",
                data: data
            })

        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllersSearch