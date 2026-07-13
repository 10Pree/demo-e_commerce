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
            console.log("Name:", name)
            if (!name) {
                return res.status(400).json({
                    message: "Missing required fields"
                })
            }
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
}

module.exports = controllersSearch