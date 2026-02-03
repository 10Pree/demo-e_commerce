
const multer = require('multer');
const path = require('path');

const path_Products = path.join(__dirname, '../../uploads/products')

const storage = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, path_Products)
    },
    filename: (req, File, cb) => {
        const ext = path.extname(File.originalname)
        const name = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, name + ext)
    }

})

const upload = multer({
    storage
    // ,
    // limits: { fileSize: 5 * 1024 * 1024}
})

module.exports = upload