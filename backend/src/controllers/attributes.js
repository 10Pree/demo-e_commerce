const modelsProductAttributes = require("../models/attributes")
class controllerAttributes {
    static async getProductAttributesAndValues(req, res) {
        try{
            const attributes = await modelsProductAttributes.getProductAttributesAndValues()
            if(attributes.length === 0){
                return res.status(404).json({
                    message: "Attributes Not Found"
                })
            }
            const rowAttributes = []
            for(const attribute of attributes){
                if(!rowAttributes.includes(attribute.id) && !rowAttributes.includes(attribute.name)){
                    rowAttributes.push({id: attribute.id, name: attribute.name})
                }
            }
            const rowValues = []
            for(const attribute of attributes){
                if(!rowValues.includes(attribute.attribute_id) && !rowValues.includes(attribute.value)){
                    rowValues.push({attribute_id: attribute.attribute_id, value: attribute.value})
                }
            }

            return res.status(200).json({
                message: "Get Attributes Successful!!",
                rowValues,
                rowAttributes
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