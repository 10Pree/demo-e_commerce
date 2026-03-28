const { getDB } = require("../config/db");

class modelsUser {
    static async create(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO users SET ?', [data])
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }

    static async reads() {
        try {
            const conn = await getDB()
            const [results] = await conn.query('SELECT id, username, email, phone, address FROM users WHERE deleted_at IS NULL')
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }
    static async readsMapRole() {
        try{
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT
                u.id,
                u.username,
                u.email,
                u.phone,
                u.address,
                r.name AS roles_name
                FROM users u
                JOIN map_roles mr ON mr.users_id = u.id
                JOIN roles r ON r.id = mr.roles_id
                WHERE deleted_at IS NULL
                `)
                return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async readById(userId) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT u.*, iu.id AS img_id, iu.image_url
                FROM users u 
                LEFT JOIN map_image_users miu ON u.id = miu.users_id
                LEFT JOIN images_users iu ON iu.id = miu.images_id
                WHERE u.id = ? AND deleted_at IS NULL`, userId)
            return results
        } catch (error) {
            console.log("Message Error:", error)
            throw error
        }
    }

    static async getEmail(email){
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT id, email, password FROM users WHERE email = ? LIMIT 1', [email])
            return results
        }catch(error){
            console.log(error)
            throw error
        }
    }

    static async update(userId, userData) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE users SET ? WHERE id = ?', [userData, userId])
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async updatePassword(userId, hashPassword){
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE users SET password = ? WHERE id = ?', [hashPassword, userId])
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async getPassword(userId) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('SELECT password FROM users WHERE id = ?', userId)
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }

    static async delete(userId) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('DELETE FROM users WHERE id = ?', userId)
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }
        static async softdelete(userId) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('UPDATE users SET deleted_at = Now() WHERE id = ?', userId)
            return results
        }catch(error){
            console.log("Message Error:", error)
            throw error
        }
    }
}

module.exports = modelsUser