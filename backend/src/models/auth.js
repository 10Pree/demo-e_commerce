const { getDB } = require("../config/db");

class modelsOAuth {
    static async getRoleName(userId) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT r.name
                FROM users u
                JOIN map_roles mr ON mr.users_id = u.id
                JOIN roles r ON r.id = mr.roles_id
                WHERE u.id = ?
                `, userId)
            return results
        } catch (error) {
            throw error
        }
    }
    static async getPermission(userId) {
        try {
            const conn = await getDB()
            const [results] = await conn.query(`
                SELECT DISTINCT p.key 
                FROM users u
                JOIN map_roles mr ON mr.users_id = u.id
                JOIN role_permissions rp ON rp.roles_id = mr.roles_id
                JOIN permissions p ON p.id = rp.permissions_id
                WHERE u.id = ?
                `, userId)
            return results
        } catch (error) {
            throw error
        }
    }

    static async addRole(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO roles SET ?', [data])
            return results
        } catch (error) {
            throw error
        }
    }

    static async addPermission(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO permissions SET ?', [data])
            return results
        } catch (error) {
            throw error
        }
    }

    static async addRole_permissions(data) {
        try {
            const conn = getDB()
            const [results] = await conn.query('INSERT INTO role_permissions SET ?', [data])
            return results
        } catch (error) {
            throw error
        }
    }

    static async mapRoleUser(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO map_roles SET ?', [data])
            return results
        } catch (error) {
            throw error
        }
    }
    static async mapRoleCustomer(data) {
        try {
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO map_roles_customers SET ?', [data])
            return results
        } catch (error) {
            throw error
        }
    }
    static async updateMapRoleUser(userId, data) {
        try {
            const conn = await getDB()
            console.log(userId, data)
            const [results] = await conn.query('UPDATE map_roles SET ? WHERE users_id = ?', [data, userId])
            return results
        } catch (error) {
            throw error
        }
    }
}

module.exports = modelsOAuth