
const modelsCategories = require("../models/categories")
const moduleOrders = require("../models/orders")
const modelsPayments = require("../models/payments")
const { getConnection } = require("../config/db")

class controllerOrders {
    static async createOrder(req, res) {
        try {
            const { customers_id, states, total } = req.body

            const data = {}
            if (customers_id) {
                data.customers_id = customers_id
            }
            if (states) {
                data.states = states
            }
            if (total) {
                data.total = total
            }

            await moduleOrders.createOrder(data)

            return res.status(201).json({
                message: "Create Order Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async createOrderItem(req, res) {
        const conn = await getConnection()
        try {
            await conn.beginTransaction()
            const { orders_id, products_id, qty } = req.body
            if (!orders_id && !products_id) {
                throw new Error("orders_id and products_id are required")
            }
            const product = await moduleOrders.productItem(products_id, conn)
            console.log(product)
            if(product.length === 0){
                throw new Error("Product Not Found")
            }

            const price = product[0].p_price
            const line_total = price * qty

            const data = {
                orders_id,
                products_id,
                product_name: product[0].p_name,
                price,
                qty,
                line_total
            }
            console.log(data)

            await moduleOrders.createOrderItem(data, conn)

            await moduleOrders.updateOrder(orders_id, conn)

            await conn.commit()

            return res.status(201).json({
                message: "Create OrderItem  Successful!!"
            })

        } catch (error) {
            console.log("Message Error:", error)
            await conn.rollback()
            return res.status(500).json({
                message: "Server Error"
            })
        } finally {
            conn.release()
        }
    }

    static async getOrdersAndpayments(req, res) {
        try {
            const orders = await moduleOrders.getOrdersAndpayments()

            return res.status(200).json({
                message: "Get getOrdersAndpayments Successful!!",
                data: orders
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
    static async getDailyOrdersAndPayments(req, res) {
        try {
            const dataOrders = await moduleOrders.getDailyOrders()
            const dataPayments = await modelsPayments.getDailyIncome()
            const dataCategoriesProduct = await modelsCategories.getProductsCategories()


            return res.status(200).json({
                message: "Get DailyOrders Successful!!",
                dataPayments,
                dataOrders,
                dataCategoriesProduct
            })
        } catch (error) {
            console.log("Message Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

}

module.exports = controllerOrders