const modelsProductAttributes = require("../models/attributes")
class controllerAttributes {
    static async getProductAttributesAndValues(req, res) {
        try {
            const attributes = await modelsProductAttributes.getProductAttributesAndValues()
            if (attributes.length === 0) {
                return res.status(404).json({
                    message: "Attributes Not Found"
                })
            }
            const rowAttributes = new Map()
            const rowValues = []

            for (const row of attributes) {
                if (!rowAttributes.has(row.attribute_id)) {
                    rowAttributes.set(row.attribute_id, { attribute_id: row.attribute_id, attribute_name: row.attribute_name })
                }
                if (row.value !== null) {
                    rowValues.push({ attribute_id: row.fk_attribute_id, value: row.value })
                }
            }

            return res.status(200).json({
                message: "Get Attributes Successful!!",
                rowValues,
                rowAttributes : [...rowAttributes.values()]
            })
        } catch (error) {
            console.log("Server Error:", error);
            return res.status(500).json({
                message: "Server Error"
            });
        }
    }
}

module.exports = controllerAttributes