const modelsSearch = require("../models/search")

class controllersSearch {
    static async search(req, res) {
        try {
            const { search, category } = req.query
            let sql 
            let sqlBase = `
                SELECT p.*
                FROM products p
                LEFT JOIN map_categories mc ON mc.products_id = p.id
                LEFT JOIN categories c ON c.id = mc.categories_id
                WHERE 1=1
                `
            let params = []
            if (search) {
                sqlBase += ` AND p.p_name LIKE ?`
                params.push(`%${search}%`)
            } 
            if (category) {
                sqlBase += ` AND c.id = ?`
                params.push(category)
            }
            if(search || category){
                 sql = sqlBase
            }else{
                sql = `SELECT * FROM products`
            }

            // console.log(sql, params)

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
}

module.exports = controllersSearch