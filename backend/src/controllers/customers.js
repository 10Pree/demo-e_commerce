const modelsCustomers = require("../models/customers");
const modlesImagesCustomers = require("../models/images_customers");
const { hashPassword } = require("../services/password-service");

class controllerCustomers {
    static async Create(req, res) {
        try {
            const { username, password, email, phone, address } = req.body;
            const file_Image = req.files
            const hash_Password = await hashPassword(password)
            const data = {
                username,
                password: hash_Password,
                email,
                phone,
                address
            }
            console.log(data)
            const customer = await modelsCustomers.create(data)
ฃ
            return res.status(201).json({
                message: "Create customer Successful!!"
            })
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: "Duplicate entry (username or email already exists)" })
            }
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
}

module.exports = controllerCustomers