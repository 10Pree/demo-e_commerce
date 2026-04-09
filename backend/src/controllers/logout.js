
class controllerLogout {
    static async logout(req, res) {
        try {
            res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'lax', secure: false })
            res.clearCookie('access_token', { httpOnly: true, sameSite: 'lax', secure: false})

            return res.status(200).json({
                message: "Logout successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllerLogout