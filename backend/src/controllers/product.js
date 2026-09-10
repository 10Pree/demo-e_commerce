const { getDB, getConnection } = require("../config/db");
const { CreateLogProducts } = require("../services/logAction");
const { json } = require("stream/consumers");
const genProductCode = require("../services/genProductCode");
const multer = require('multer')
const modelsCategories = require("../models/categories");
const modelsImagesProducts = require("../models/images_products");
const modelsProduct = require("../models/product");
const modelsProductDetails = require("../models/productDetails");
const fs = require('fs/promises')
const path = require("path");
const path_Products = path.join(__dirname, '../../uploads/products')

class controllerProduct {
    static async Create(req, res) {
        try {
            const { p_name, p_price, p_details, p_stock, categories_ids } = req.body || {};
            const image_url = req.files
            const parsedCategories = categories_ids ? categories_ids.split(',').map(Number) : []
            // console.log("CONTENT-TYPE:", req.headers['content-type']);
            // console.log("FILES:", req.files);
            // console.log("BODY:", req.body);

            const data = {};
            for (let i = 0; i < 3; i++) { // สุ่มใหม่ 3 ครั้ง
                const code = genProductCode('PRD', 6);
                const dup = await modelsProduct.readCode(code);
                if (dup.length === 0) { data.p_code = code; break; }
            }
            if (!data.p_code) return res.status(409).json({ message: 'สร้างรหัสไม่สำเร็จ ลองใหม่อีกครั้ง' });
            if (p_name) data.p_name = p_name;
            if (p_price) data.p_price = p_price;
            if (p_details) data.p_details = p_details;
            if (p_stock) data.p_stock = p_stock;


            const product = await modelsProduct.create(data);

            // console.log("p_image_url:", image_url, Array.isArray(image_url))

            if (Array.isArray(image_url) && image_url.length > 0) {
                const imageIds = []

                for (const file of image_url) {
                    const url = `/uploads/products/${file.filename}`
                    const image = await modelsImagesProducts.create(url)
                    imageIds.push(image.insertId)
                }

                const rows = imageIds.map(imgId => [product.insertId, imgId])
                await modelsImagesProducts.createMap(rows)
            }

            if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                const rows = parsedCategories.map(catId => [product.insertId, catId])
                // console.log(rows)
                await modelsCategories.createMap(rows)
            }

            // await modelsCategories.createMap(row)

            // console.log("product id", productId.insertId )
            const userId = req.user.userId
            await CreateLogProducts(product.insertId, userId, "Create.Product")
            return res.status(201).json({
                message: "Create Product Successful!!",
            });
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Create2(req, res) {
        const conn = await getConnection()
        try {
            await conn.beginTransaction()
            const { p_name, p_details, categories_ids, variants } = req.body || {};
            const image_url = req.files
            const parsedCategories = categories_ids ? categories_ids.split(',').map(Number) : []
            const parsedVariants = variants ? JSON.parse(variants) : []
            let stockAll = 0
            let minPrice = null
            let maxPrice = null

            const preparedImages = (Array.isArray(image_url) ? image_url : []).map(file => {
                const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                const url = `/uploads/products/${filename}`
                return {
                    filename,
                    buffer: file.buffer,
                    url
                }
            })

            if (!p_name) {
                throw new Error("กรุณาระบุชื่อสินค้า (p_name)");
            }
            const data = {};
            for (let i = 0; i < 3; i++) { // สุ่มใหม่ 3 ครั้ง
                const code = genProductCode('PRD', 6);
                const dup = await modelsProduct.isCodeExists(code, conn);
                if (dup.length === 0) { data.p_code = code; break; }
            }
            if (!data.p_code) throw new Error("สร้างรหัสไม่สำเร็จ ลองใหม่อีกครั้ง");
            if (p_name) data.p_name = p_name;
            if (p_details) data.p_details = p_details;

            const product = await modelsProduct.create(data, conn);

            if (preparedImages.length > 0) {
                const imageIds = []

                for (const file of preparedImages) {
                    const image = await modelsImagesProducts.create(file.url, conn)
                    imageIds.push(image.insertId)
                }

                const rows = imageIds.map(imgId => [product.insertId, imgId])
                await modelsImagesProducts.createMap(rows, conn)
            }

            if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                const rows = parsedCategories.map(catId => [product.insertId, catId])
                await modelsCategories.createMap(rows, conn)
            }

            if (parsedVariants && Array.isArray(parsedVariants) && parsedVariants.length > 0) {
                for (const variant of parsedVariants) {
                    const { sku, price, stock, attribute_value_ids } = variant
                    const productVariants = await modelsProductDetails.createProductVariants({ products_id: product.insertId, sku, price, stock }, conn)

                    const variantId = productVariants.insertId

                    if (Array.isArray(attribute_value_ids) && attribute_value_ids.length > 0) {
                        const mapData = attribute_value_ids.map(attrValueID => ([variantId, attrValueID]))
                        await modelsProductDetails.CreateMap_Variant_Attribute_Values(mapData, conn)
                    }
                    stockAll += stock
                    if (minPrice === null || price < minPrice) minPrice = price
                    if (maxPrice === null || price > maxPrice) maxPrice = price
                }
            }
            await modelsProduct.updatePrice(minPrice, product.insertId, conn)
            await modelsProduct.updateStock(product.insertId, stockAll, conn)

            const userId = req.user.userId
            await CreateLogProducts(product.insertId, userId, "Create.Product", conn)

            await conn.commit()

            try {
                for (const file of preparedImages) {
                    await fs.writeFile(path.join(path_Products, file.filename), file.buffer);
                }
            } catch (error) {
                console.log("File operation error after commit (DB already saved):", error)
            }

            return res.status(201).json({
                message: "Create Product Successful!!",
            });
        } catch (error) {
            await conn.rollback()
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        } finally {
            conn.release()
        }
    }

    static async Reads(req, res) {
        try {
            const products = await modelsProduct.reads()
            return res.status(200).json({
                message: "Reads Products Successful!!",
                data: products
            })
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Read(req, res) {
        try {
            const productId = req.params.id

            const product = await modelsProduct.readById(productId)
            const variants = await modelsProductDetails.getProductVariants(productId)
            if (product.length === 0) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }
            return res.status(200).json({
                message: "Read Product Successful!!",
                product,
                variants
            })
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async ReadCode(req, res) {
        try {
            const productId = req.params.code
            console.log()
            const product = await modelsProduct.readCode(productId)
            if (product.length === 0) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }
            return res.status(200).json({
                message: "Read Product Successful!!",
                data: product
            })
        } catch (error) {
            console.log("Message Error:", error);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async Update(req, res) {
        const conn = await getConnection()
        const filesToDeleteAfterCommit = []   // เก็บ path ไฟล์เก่าที่รอลบ
        const filesToWriteAfterCommit = []    // เก็บ buffer ไฟล์ใหม่ที่รอเขียน

        try {
            await conn.beginTransaction()
            const productId = req.params.id
            const checkProduct = await modelsProduct.read(productId, conn)
            if (checkProduct.length === 0) throw new Error("Product Not Found")
            const { p_name, p_details, variants, categories_ids, old_images } = req.body
            const parsedOldImages = old_images ? JSON.parse(old_images) : []
            const parsedCategories = categories_ids ? categories_ids.split(',').map(Number) : []
            const parsedVariants = variants ? JSON.parse(variants) : []
            const newFiles = req.files
            const newData = {}
            let stockAll = 0
            let minPrice = null
            let maxPrice = null

            if (p_name) newData.p_name = p_name
            if (p_details) newData.p_details = p_details

            if (Object.keys(newData).length > 0) {
                await modelsProduct.update(productId, newData, conn)
            }

            // รันเฉพาะตอนมีการแก้ไข variants เท่านั้น
            if (parsedVariants && Array.isArray(parsedVariants) && parsedVariants.length > 0) {
                for (const variant of parsedVariants) {
                    const { vid, sku, price, stock, attribute_value_ids } = variant
                    let currentVariantId = vid

                    if (vid) {
                        const productVariants = await modelsProductDetails.updateProductVariants({ sku, price, stock }, vid, productId, conn)

                        if (productVariants.affectedRows === 0) throw new Error(`Product Variant ID ${vid} Not Found`)
                    } else {
                        const productVariants = await modelsProductDetails.createProductVariants({ products_id: productId, sku, price, stock }, conn)
                        currentVariantId = productVariants.insertId
                    }

                    if (attribute_value_ids !== undefined) {
                        await modelsProductDetails.deleteMap_Variant_Attribute_Values(currentVariantId, conn)
                        if (Array.isArray(attribute_value_ids) && attribute_value_ids.length > 0) {
                            const mapData = attribute_value_ids.map(attrValueID => ([currentVariantId, attrValueID]))
                            await modelsProductDetails.CreateMap_Variant_Attribute_Values(mapData, conn)
                        }
                    }
                }
            }

            const stockAndPrice = await modelsProductDetails.getProductVariantsStockAndPrice(productId, conn)

            for (const v of stockAndPrice) {
                stockAll += v.stock
                if (v.price != null) {
                    if (minPrice === null || v.price < minPrice) minPrice = v.price
                    if (maxPrice === null || v.price > maxPrice) maxPrice = v.price
                }
            }

            // === จัดการราคาและสต๊อก ===
            await modelsProduct.updateStock(productId, stockAll, conn)
            await modelsProduct.updatePrice(minPrice, productId, conn)

            // === จัดการรูปภาพ ===
            const currentImages = await modelsImagesProducts.getImgByIdProduct(productId, conn)
            // หารูปที่ต้องลบ = มีใน DB แต่ไม่อยู่ใน old_images ที่ user เก็บไว้
            const imagesToDelete = currentImages.filter(
                img => !parsedOldImages.includes(img.image_url)
            )

            for (const img of imagesToDelete) {
                await modelsImagesProducts.deleteImgById(img.id, conn)
                filesToDeleteAfterCommit.push(
                    path.join(__dirname, '../../', img.image_url)
                )
            }

            if (Array.isArray(newFiles) && newFiles.length > 0) {
                // เพิ่มรูปใหม่ที่ upload เข้ามา
                const imgIds = []
                for (const file of newFiles) {
                    const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                    const url = `/uploads/products/${filename}`

                    const image = await modelsImagesProducts.create(url, conn)
                    imgIds.push(image.insertId)

                    filesToWriteAfterCommit.push({
                        fullPath: path.join(path_Products, filename),
                        buffer: file.buffer
                    })
                }
                const mapImages = imgIds.map(imgid => [productId, imgid])
                await modelsImagesProducts.createMap(mapImages, conn)
            }

            if (categories_ids !== undefined) {
                await modelsCategories.delete(productId, conn)
                if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                    const rows = parsedCategories.map(catId => [productId, catId])
                    await modelsCategories.createMap(rows, conn)
                }
            }

            const userId = req.user.userId
            await CreateLogProducts(productId, userId, "Update.Product", conn)

            await conn.commit()

            try {
                for (const filePath of filesToDeleteAfterCommit) {
                    try {
                        await fs.unlink(filePath)
                    } catch (error) {
                        if (error.code !== "ENOENT") console.log("ลบไฟล์เก่าไม่สำเร็จ:", filePath, error)
                    }
                }
                for (const { fullPath, buffer } of filesToWriteAfterCommit) {
                    await fs.writeFile(fullPath, buffer)
                }
            } catch (fileError) {
                console.log("File operation error after commit (DB already saved):", fileError)
            }
            return res.status(200).json({
                message: "Update Product Successful!!",
            })
        } catch (error) {
            console.log("Message Error:", error);
            await conn.rollback()
            return res.status(500).json({
                message: "Server Error",
            });
        } finally {
            conn.release()
        }
    }

    static async Delete(req, res) {
        const conn = await getConnection()
        try {
            await conn.beginTransaction()
            const productId = req.params.id
            const checkProduct = await modelsProduct.read(productId, conn)
            if (checkProduct.length === 0 || checkProduct[0].deleted_at !== null) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }

            const userId = req.user.userId
            await CreateLogProducts(productId, userId, "Delete.Product", conn)

            await modelsProduct.softDelete(productId, conn)

            await conn.commit()
            return res.status(200).json({
                message: "Delete Product Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error.message);
            return res.status(500).json({
                message: "Server Error",
            });
            await conn.rollback()
        } finally {
            conn.release()
        }
    }

    static async searchProduct(req, res) {
        try {
            const { name } = req.query
            if (!name) return res.status(400).json({ message: "กรุณาใส่คำค้นหา" })
            const search = await modelsProduct.searchProduct(name)

            return res.status(200).json({
                message: "Search Product Successful!!",
                data: search
            })
        } catch (error) {
            console.log("Message Error:", error.message);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }
}

module.exports = controllerProduct;
