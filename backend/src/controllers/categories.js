const modelsCategories = require("../models/categories")
const moduleProduct = require("../models/product");

class controllerCategories {
    static async Create(req, res) {
        try {
            const { name } = req.body
            if (!name) return res.status(400).json({ message: "categorie Not Name" })

            const data = { name: name }
            const categorie = await modelsCategories.create(data)

            return res.status(200).json({
                message: "Create categorie Successful!!",
                // categorie
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async GetCategories(req, res) {
        try {
            const categories = await modelsCategories.gets()
            return res.status(200).json({
                message: "Get categories Successful!!",
                data: categories
            })
        } catch (error) {
            console.log("Server Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async GetById(req, res) {
        try {
            const categorieId = req.params.id
            const categories = await modelsCategories.getById(categorieId)
            return res.status(200).json({
                message: "Get categories Successful!!",
                data: categories
            })
        } catch (error) {
            console.log("Server Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async Update(req, res) {
        try {
            const categorieId = req.params.id
            const { name } = req.body
            if (!name || !categorieId) return res.status(400).json({ message: "ID and categorie Not Name" })
            const data = { name: name }
            const categorie = await modelsCategories.update(categorieId, data)
            return res.status(200).json({
                message: "Update categories Successful!!",
            })
        } catch (error) {
            console.log("Server Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async CreateMap(req, res) {
        try {
            const { products_id, categories_id } = req.body
            if(!products_id || !categories_id) return res.status(400).json({ message: "productsId and categoriesId Not ID"})

            // const product = await moduleProduct.read(products_id)
            // const categorie = await modelsCategories.getById(categories_id)
            // if(product.length === 0 || categorie.length === 0) return res.status(400).json({ message: "productId and categotieId Not Found"})
            const data = { products_id: products_id, categories_id: categories_id}
            await modelsCategories.createMap(data)
            return res.status(200).json({
                message: "Create Map Categories Successful!!"
            }) 
        } catch (error) {
            console.log("Server Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllerCategories