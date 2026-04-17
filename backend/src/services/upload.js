
const multer = require('multer');
const path = require('path');

const path_Products = path.join(__dirname, '../../uploads/products')
const path_Users = path.join(__dirname, '../../uploads/users')

const storageProducts = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, path_Products)
    },
    filename: (req, File, cb) => {
        const ext = path.extname(File.originalname)
        const name = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, name + ext)
    }

})

const storageUsers = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, path_Users)
    },
    filename: (req, File, cb) => {
        const ext = path.extname(File.originalname)
        const name = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, name + ext)
    }

})
const storageCustomers = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, path_Users)
    },
    filename: (req, File, cb) => {
        const ext = path.extname(File.originalname)
        const name = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, name + ext)
    }

})

const uploadProduct = multer({
    storage: storageProducts
    // ,
    // limits: { fileSize: 5 * 1024 * 1024}
})
const uploadUser = multer({
    storage: storageUsers
    // ,
    // limits: { fileSize: 5 * 1024 * 1024}
})
const uploadCustomers = multer({
    storage: storageUsers
    // ,
    // limits: { fileSize: 5 * 1024 * 1024}
})

module.exports = { uploadProduct, uploadUser, uploadCustomers}