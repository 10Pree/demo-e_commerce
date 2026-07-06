const { json } = require("express")
const modelsLog = require("../models/log")

class controllersLog {
    static async getLog(req, res) {
        try{
            const data = await modelsLog.getLog()
            if(data.length === 0) {
                return res.status(404).json({
                    message: "Log User Not Found"
                })
            }
            return res.status(200).json({
                message: "Get Log User Successful!!",
                data: data
            })
        }catch(error){
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllersLog