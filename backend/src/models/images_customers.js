const { getDB } = require("../config/db")

class modlesImagesCustomers {
    static async create(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO images_customers (image_url) VALUES (?)', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getImageAll() {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT * FROM images_customers')
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async getById(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM images_customers WHERE id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getMapByIdUser(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT *
                FROM users u
                JOIN map_image_customers miu ON u.id = miu.customers_id
                JOIN images_customers iu ON iu.id = miu.images_id
                WHERE u.id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async getByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('SELECT id, image_url FROM map_images_customers WHERE id = ?', id)
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
                FROM images_customers i
                JOIN map_image_customers mi ON mi.images_id = i.id
                WHERE mi.customers_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async update(id, data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('UPDATE images_customers SET ? WHERE id = ?', [data, id])
            return resulte
        } catch (error) {
            throw error
        }
    }

    static async delete(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM images_customers WHERE id = ? ', id)
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
                FROM images_customers i
                JOIN map_image_customers mi ON mi.images_id = i.id
                WHERE mi.customers_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async deleteByMapId(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('DELETE FROM map_image_customers WHERE customers_id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createMap(data) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO map_image_customers  (customers_id, images_id) VALUES ?', [data])
            return resulte
        } catch (error) {
            throw error
        }
    }
}

module.exports = modlesImagesCustomers