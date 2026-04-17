const { getDB } = require("../config/db")

class modlesImagesProducts {
    static async create(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO images_products (image_url) VALUES (?)', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getImageAll() {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM images_products')
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getById(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM images_products WHERE id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM map_images_products WHERE id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getImgByIdProduct(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT i.*
                FROM images_products i
                JOIN map_images_products mi ON mi.images_id = i.id
                WHERE mi.products_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async update(id, data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE images_products SET ? WHERE id = ?', [data, id])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM images_products WHERE id = ? ', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
        static async deleteImgByIdProduct(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                DELETE i
                FROM images_products i
                JOIN map_images_products mi ON mi.images_id = i.id
                WHERE mi.products_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async deleteByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM map_images_products WHERE products_id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createMap(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO map_images_products (products_id, images_id) VALUES ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
}

module.exports = modlesImagesProducts