const { getDB } = require("../config/db");

class modelsOAuth{
    static async getPermission(userId){
        try{
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
        }catch(error){
            throw error
        }
    }

    static async addRole(data){
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO roles SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }

    static async addPermission(data) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO permissions SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }

    static async addRole_permissions(data) {
        try{
            const conn = getDB()
            const [results] = await conn.query('INSERT INTO role_permissions SET ?', [data])
            return results
        }catch(error){
            throw error
        }
    }

    static async mapRoleUser(data) {
        try{
            const conn = await getDB()
            const [results] = await conn.query('INSERT INTO map_roles SET ?', [data])
            return results
        }catch(error){
            throw Error
        }
    }
}

module.exports = modelsOAuth