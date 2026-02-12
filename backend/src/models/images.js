const { getDB } = require("../config/db")

class modlesImages {
    static async create(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO images (image_url) VALUES (?)', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getImageAll() {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM images')
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getById(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM images WHERE id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM map_images WHERE id = ?', id)
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
                FROM images i
                JOIN map_images mi ON mi.images_id = i.id
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
            const [resulte] = await conn.query('UPDATE images SET ? WHERE id = ?', [data, id])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM images WHERE id = ? ', id)
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
                FROM images i
                JOIN map_images mi ON mi.images_id = i.id
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
            const [resulte] = await conn.query('DELETE FROM map_images WHERE products_id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createMap(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO map_images (products_id, images_id) VALUES ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
}

module.exports = modlesImages