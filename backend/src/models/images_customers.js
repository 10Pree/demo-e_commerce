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
    static async getMapByIdCustomer(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT *
                FROM customers c
                JOIN map_image_customers miu ON u.id = miu.customers_id
                JOIN images_customers iu ON iu.id = miu.images_id
                WHERE c.id = ?
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
    static async getImgByIdCustomer(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                SELECT ic.*
                FROM images_customers ic
                JOIN map_images_customers mic ON mic.images_id = ic.id
                WHERE mic.customers_id = ?
                `, id)
            return resulte
        } catch (error) {
            throw error
        }
    }
static async updateImgByIdCustomer(id, data) {
    try {
        const conn = await getDB()
        const [result] = await conn.query(`
            UPDATE images_customers ic
            JOIN map_images_customers mic ON mic.images_id = ic.id
            SET ic.image_url = ? WHERE mic.customers_id = ?
            `, [data, id])
        
        console.log("affectedRows:", result.affectedRows) // ✅ เช็คตรงนี้
        return result
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
    static async deleteImgByIdCustomer(id) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query(`
                DELETE ic
                FROM images_customers ic
                JOIN map_images_customers mi ON mi.images_id = ic.id
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
            const [resulte] = await conn.query('DELETE FROM map_images_customers WHERE customers_id = ?', id)
            return resulte
        } catch (error) {
            throw error
        }
    }
    static async createMapCustomer(customerId, imageId) {
        try {
            const conn = await getDB()
            const [resulte] = await conn.query('INSERT INTO map_images_customers  (customers_id, images_id) VALUES (?, ?)', [customerId, imageId])
            return resulte
        } catch (error) {
            throw error
        }
    }
}

module.exports = modlesImagesCustomers