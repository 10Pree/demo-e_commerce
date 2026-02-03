
const multer = require('multer')
const path = require('path')

const path_Products = '/uploads/products'

const storage = multer.diskStorage({
    destination: (req, File, cd) => {
        cd(null, path_Products)
    },
    filename: (req, File, cd) => {
        const ext = path.extname(File.originalname)
        const name = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cd(null, name + ext)
    }

})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024}
})

module.exports = upload