const modelsOAuth = require("../models/auth")

class controllersOAuth {
    static async AddRole(req, res) {
        try {
            const roleName = req.body
            if (!roleName) {
                return res.status(401).json({
                    message: "Not Role"
                })
            }
            const role = await modelsOAuth.addRole(roleName)
            if (!role) {
                return res.status(401), json({
                    message: "Server Error"
                })
            }

            return res.status(200).json({
                message: "Add Role Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
    static async AddPermission(req, res) {
        try {
            const key = req.body
            if (!key) {
                return res.status(401).json({
                    message: "Not key"
                })
            }
            const permission = await modelsOAuth.addPermission(key)
            if (!permission) {
                return res.status(401).json({
                    message: "Server Error"
                })
            }
            return res.status(200).json({
                message: "Add Permission Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async AddRole_Permission(req, res) {
        try {
            const { roles_id, permissions_id } = req.body
            if (!roles_id || !permissions_id) {
                return res.status(401).json({
                    message: "Not Role and Permission"
                })
            }
            const data = { roles_id, permissions_id }

            await modelsOAuth.addRole_permissions(data)

            return res.status(200).json({
                message: "Add Role and Permission Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async MapRole(req, res) {
        try {
            const { users_id, roles_id } = req.body
            if (!users_id || !roles_id) {
                return res.status(401).json({
                    message: "Not UserID and Role"
                })
            }
            const data = { users_id, roles_id }

            const map = await modelsOAuth.mapRoleUser(data)

            return res.status(200).json({
                message: "Map User and Role Successful!!"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Server"
            })
        }
    }
}

module.exports = controllersOAuth