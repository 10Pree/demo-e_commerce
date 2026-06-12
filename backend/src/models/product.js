const { getDB } = require("../config/db")

class moduleProduct {
    static async create(data) {
        try{
            const conn = await getDB()
            const [results] = await conn.query(`INSERT INTO products SET ?`, [data])
            return results
        }catch(error){
            throw error
        }
    }
    static async reads(){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM products WHERE deleted_at IS NULL')
            return results
        }catch(error){
            throw error
        }
    }

    static async read(productId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM products WHERE id = ? AND deleted_at IS NULL', productId)
            return results
        }catch(error){
            throw error
        }
    }

    static async readById(productId){
        try{
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT p.* , GROUP_CONCAT(ip.image_url) AS images
                FROM products p
                LEFT JOIN map_images_products mip ON  p.id = mip.products_id
                LEFT JOIN images_products ip ON ip.id = mip.images_id
                WHERE p.id = ? AND deleted_at IS NULL`, productId)
            return results.map(p => ({
                ...p, images: p.images ? p.images.split('.') : []
            }))
        }catch(error){
            throw error
        }
    }

    static async readCode(codeId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT * FROM products WHERE p_code = ? AND deleted_at IS NULL', codeId)
            return results
        }catch(error){
            throw error
        }
    }

    static async update(productId, data){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE products SET ? WHERE id = ?',[data, productId])
            return results
        }catch(error){
            throw error
        }
    }
    
    static async delete(productId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('DELETE FROM products WHERE id = ?', productId)
            return results
        }catch(error){
            throw error
        }
    }

        static async softDelete(productId){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE products SET deleted_at = Now() WHERE id = ?', productId)
            return results
        }catch(error){
            throw error
        }
    }
}

module.exports = moduleProduct