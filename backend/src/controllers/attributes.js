const modelsProductAttributes = require("../models/attributes")
class controllerAttributes {
    static async getAttributes(req, res) {
        try{
            const attributes = await modelsProductAttributes.getProductAttributes()
            if(attributes.length === 0){
                return res.status(404).json({
                    message: "Attributes Not Found"
                })
            }
            return res.status(200).json({
                message: "Get Attributes Successful!!",
                attributes
            })
        }catch(error){
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error"
            });
        }
    }
}

module.exports = controllerAttributes