const modelsSearch = require("../models/search")

class controllersSearch {
    static async search(req, res) {
        try {
            const { search, category } = req.body

            let sql = 'SELECT * FROM products WHERE 1=1'

            if (search) {
                sql += ` AND p_name LIKE '${search}'`
            }
            if (category) {
                // sql += `AND p_cat`
            }
            const data = await modelsSearch.search(sql)
            res.status(200).json({
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