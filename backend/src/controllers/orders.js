const moduleOrders = require("../models/orders")
const moduleProduct = require("../models/product")

class controllerOrders {
    static async createOrder(req, res) {
        try {
            const { users_id, states, total } = req.body

            const data = {}
            if (users_id) {
                data.users_id = users_id
            }
            if (states) {
                data.states = states
            }
            if (total) {
                data.total = total
            }

            await moduleOrders.createOrder(data)

            res.status(200).json({
                message: "Create Order Successful!!"
            })
        } catch (error) {
            console.log("Message Error:", error)
            res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async createOrderItem(req, res) {
        try {
            const { orders_id, products_id, qty } = req.body
            if (!orders_id && !products_id) {
                res.status(400).json({
                    message: "Not ProductId and OrderId"
                })
            }
            const product = await moduleOrders.productItem(products_id)
            // console.log(product)
            const price = product[0].p_price

            const line_total = price * qty

            const data = {
                orders_id,
                products_id,
                price,
                qty,
                line_total
            }
            // console.log(data)

            await moduleOrders.createOrderItem(data)

            await moduleOrders.updateOrder(orders_id)



            res.status(200).json({
                message: "Create OrderItem  Successful!!"
            })

        } catch (error) {
            console.log("Message Error:", error)
            res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllerOrders