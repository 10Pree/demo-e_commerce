const { getDB, getConnection } = require("../config/db");
const { CreateLogProducts } = require("../services/logAction");
const { json } = require("stream/consumers");
const genProductCode = require("../services/genProductCode");
const multer = require('multer')
const modelsCategories = require("../models/categories");
const modlesImagesProducts = require("../models/images_products");
const moduleProduct = require("../models/product");
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
                const dup = await moduleProduct.readCode(code);
                if (dup.length === 0) { data.p_code = code; break; }
            }
            if (!data.p_code) return res.status(409).json({ message: 'สร้างรหัสไม่สำเร็จ ลองใหม่อีกครั้ง' });
            if (p_name) data.p_name = p_name;
            if (p_price) data.p_price = p_price;
            if (p_details) data.p_details = p_details;
            if (p_stock) data.p_stock = p_stock;


            const product = await moduleProduct.create(data);

            // console.log("p_image_url:", image_url, Array.isArray(image_url))

            if (Array.isArray(image_url) && image_url.length > 0) {
                const imageIds = []

                for (const file of image_url) {
                    const url = `/uploads/products/${file.filename}`
                    const image = await modlesImagesProducts.create(url)
                    imageIds.push(image.insertId)
                }

                const rows = imageIds.map(imgId => [product.insertId, imgId])
                await modlesImagesProducts.createMap(rows)
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
            const { p_name, p_price, p_details, p_stock, categories_ids, variants } = req.body || {};
            const image_url = req.files
            const parsedCategories = categories_ids ? categories_ids.split(',').map(Number) : []
            const parsedVariants = variants ? JSON.parse(variants) : []

            const preparedImages = (Array.isArray(image_url) ? image_url : []).map(file => {
                const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                const url = `/uploads/products/${filename}`
                return {
                    filename,
                    buffer: file.buffer,
                    url
                }
            })

            const data = {};
            for (let i = 0; i < 3; i++) { // สุ่มใหม่ 3 ครั้ง
                const code = genProductCode('PRD', 6);
                const dup = await moduleProduct.isCodeExists(code, conn);
                if (dup.length === 0) { data.p_code = code; break; }
            }
            if (!data.p_code) throw new Error("สร้างรหัสไม่สำเร็จ ลองใหม่อีกครั้ง");
            if (!p_name) {
                throw new Error("กรุณาระบุชื่อสินค้า (p_name)");
            }
            if (p_name) data.p_name = p_name;
            if (p_price) data.p_price = p_price;
            if (p_details) data.p_details = p_details;
            if (p_stock) data.p_stock = p_stock;

            const product = await moduleProduct.create(data, conn);

            if (preparedImages.length > 0) {
                const imageIds = []

                for (const file of preparedImages) {
                    const image = await modlesImagesProducts.create(file.url, conn)
                    imageIds.push(image.insertId)
                }

                const rows = imageIds.map(imgId => [product.insertId, imgId])
                await modlesImagesProducts.createMap(rows, conn)
            }

            if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                const rows = parsedCategories.map(catId => [product.insertId, catId])
                // console.log(rows)
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

                }
            }

            const userId = req.user.userId
            await CreateLogProducts(product.insertId, userId, "Create.Product", conn)

            await conn.commit()

            for (const file of preparedImages) {
                await fs.writeFile(path.join(path_Products, file.filename), file.buffer);
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
            const products = await moduleProduct.reads()
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

            const product = await moduleProduct.readById(productId)
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

    static async ReadCode(req, res) {
        try {
            const productId = req.params.code
            console.log()
            const product = await moduleProduct.readCode(productId)
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
            const checkProduct = await moduleProduct.read(productId, conn)
            if (checkProduct.length === 0) throw new Error("Product Not Found")
            const { p_name, p_price, p_details, p_stock, variants, categories_ids, old_images } = req.body
            const parsedOldImages = old_images ? JSON.parse(old_images) : []
            const parsedCategories = categories_ids ? categories_ids.split(',').map(Number) : []
            const parsedVariants = variants ? JSON.parse(variants) : []
            const newFiles = req.files
            const newData = {}

            if (p_name) newData.p_name = p_name
            if (p_price) newData.p_price = p_price
            if (p_details) newData.p_details = p_details
            if (p_stock) newData.p_stock = p_stock

            if (Object.keys(newData).length > 0) {
                const product = await moduleProduct.update(productId, newData, conn)
            }

            if (parsedVariants && Array.isArray(parsedVariants) && parsedVariants.length > 0) {
                for (const variant of parsedVariants) {
                    const { variant_id, sku, price, stock, attribute_value_ids } = variant
                    let currentVariantId = variant_id

                    if(variant_id){
                        const productVariants = await modelsProductDetails.updateProductVariants({ products_id: productId, sku, price, stock }, variant_id, conn)

                        if(productVariants.affectedRows === 0) throw new Error(`Product Variant ID ${variant_id} Not Found`)
                    }else{
                        const productVariants = await modelsProductDetails.createProductVariants({ products_id: productId, sku, price, stock }, conn)
                        currentVariantId = productVariants.insertId
                    }

                    if (Array.isArray(attribute_value_ids) && attribute_value_ids.length > 0) {
                        await modelsProductDetails.deleteMap_Variant_Attribute_Values(currentVariantId, conn)
                        const mapData = attribute_value_ids.map(attrValueID => ([currentVariantId, attrValueID]))
                        await modelsProductDetails.CreateMap_Variant_Attribute_Values(mapData, conn)
                    }

                }
            }

            // === จัดการรูปภาพ ===
            const currentImages = await modlesImagesProducts.getImgByIdProduct(productId, conn)
            // หารูปที่ต้องลบ = มีใน DB แต่ไม่อยู่ใน old_images ที่ user เก็บไว้
            const imagesToDelete = currentImages.filter(
                img => !parsedOldImages.includes(img.image_url)
            )

            for (const img of imagesToDelete) {
                await modlesImagesProducts.deleteImgById(img.id, conn)
                filesToDeleteAfterCommit.push(
                    path.join(__dirname, '../../', img.image_url)
                )
            }

            if (Array.isArray(newFiles) && newFiles.length > 0) {
                // เพิ่มรูปใหม่ที่ upload เข้ามา
                if (newFiles.length > 0) {
                    const imgIds = []
                    for (const file of newFiles) {
                        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
                        const url = `/uploads/products/${filename}`

                        const image = await modlesImagesProducts.create(url, conn)
                        imgIds.push(image.insertId)

                        filesToWriteAfterCommit.push({
                            fillPath: path.join(path_Products, filename),
                            buffer: file.buffer
                        })
                    }
                    const mapImages = imgIds.map(imgid => [productId, imgid])
                    await modlesImagesProducts.createMap(mapImages, conn)
                }
            }

            if (Array.isArray(parsedCategories) && parsedCategories.length > 0) {
                await modelsCategories.delete(productId, conn)

                const rows = parsedCategories.map(catId => [productId, catId])
                await modelsCategories.createMap(rows, conn)
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
                for (const { fillPath, buffer } of filesToWriteAfterCommit) {
                    await fs.writeFile(fillPath, buffer)
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
        try {
            const productId = req.params.id
            const checkProduct = await moduleProduct.read(productId)
            if (checkProduct.length === 0 || checkProduct[0].deleted_at !== null) {
                return res.status(401).json({
                    message: "Product Not Found"
                })
            }

            // const rows = await modlesImages.getImgByIdProduct(productId)

            // for(const img of rows){
            //     const fullPath = path.join(__dirname,'../../',img.image_url)
            //     if(fs.existsSync(fullPath)){
            //         fs.unlinkSync(fullPath)
            //     }
            // }


            // await modlesImages.deleteImgByIdProduct(productId)

            // await modelsCategories.delete(productId)


            const userId = req.user.userId
            await CreateLogProducts(productId, userId, "Delete.Product")

            await moduleProduct.softDelete(productId)

            return res.status(200).json({
                message: "Delete Product Successful!!"
                // data: product
            })

        } catch (error) {
            console.log("Message Error:", error.message);
            return res.status(500).json({
                message: "Server Error",
            });
        }
    }

    static async searchProduct(req, res) {
        try {
            const { name } = req.query
            console.log(name)
            if (!name) return res.status(400).json({ message: "กรุณาใส่คำค้นหา" })
            const search = await moduleProduct.searchProduct(name)

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
