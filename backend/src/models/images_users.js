const { getDB } = require("../config/db")

class modlesImages {
    static async create(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO images_users (image_url) VALUES (?)', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getImageAll() {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM images_users')
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getById(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM images_users WHERE id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM map_images_users WHERE id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getImgByIdUsers(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT i.*
                FROM images_users i
                JOIN map_images_users mi ON mi.images_id = i.id
                WHERE mi.users_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async update(id, data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE images_users SET ? WHERE id = ?', [data, id])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM images_users WHERE id = ? ', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
        static async deleteImgByIdUsers(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                DELETE i
                FROM images_users i
                JOIN map_image_users mi ON mi.images_id = i.id
                WHERE mi.users_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async deleteByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM map_image_users WHERE users_id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createMap(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO map_image_users  (users_id, images_id) VALUES ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
}

module.exports = modlesImages