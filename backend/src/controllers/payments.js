const moduleOrders = require("../models/orders")
const modelsPayments = require("../models/payments")

class controllerPayments {
    static async CreatePayment(req, res) {
        try {
            const { orders_id } = req.body
            if (!orders_id) {
                return res.status(400).json({
                    message: "orderID and amount Not Found"
                })
            }


            const product = await moduleOrders.orderItmeByID(orders_id)
            if (product.length === 0) {
                return res.status(404).json({
                    message: "Orders Not Found"
                })
            }
            // console.log(product[0].total)
            const data = {
                orders_id: orders_id,
                amount: product[0].total
            }
            await modelsPayments.createPayment(data)

            return res.status(200).json({
                message: "Create Payment Successful!!!"
            })
        } catch (error) {
            console.log("Server Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }

    static async UpdatePayment(req, res) {
        try {
            const { orders_id } = req.body
            if (!orders_id) {
                return res.status(400).json({
                    message: "OrderID Not Fonud"
                })
            }
            const payment = await modelsPayments.orderIdByPayment(orders_id)
            if (payment.length === 0) {
                return res.status(404).json({
                    message: "OrderID Not Fonud"
                })
            }

            if (payment[0].status === 'paid') {
                return res.status(200).json({
                    message: "This order has been paid."
                })
            }
            if (payment[0].status  === 'failed') {
                return res.status(409).json({
                    message: "This order has been failed."
                })
            }
            await modelsPayments.updatePayment(orders_id)

            // console.log(payment)

            await moduleOrders.updateOrderPaid(payment[0].orders_id)

            res.status(200).json({
                message: `Update Payment Order:${orders_id} Successful!!`
            })
        } catch (error) {
            console.log("Server Error:", error)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllerPayments