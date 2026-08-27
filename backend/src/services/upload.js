
const multer = require('multer');
const path = require('path');

const path_Products = path.join(__dirname, '../../uploads/products')
const path_Users = path.join(__dirname, '../../uploads/users')
const path_Customers = path.join(__dirname, '../../uploads/customers')

const storageProducts = multer.memoryStorage();

const storageUsers = multer.memoryStorage()

const storageCustomers = multer.memoryStorage()

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
    storage: storageCustomers
    // ,
    // limits: { fileSize: 5 * 1024 * 1024}
})

module.exports = { uploadProduct, uploadUser, uploadCustomers}