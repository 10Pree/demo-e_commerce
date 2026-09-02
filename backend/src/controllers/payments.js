const moduleOrders = require("../models/orders")
const modelsPayments = require("../models/payments")
const { getConnection } = require("../config/db")

class controllerPayments {
    static async CreatePayment(req, res) {
        const conn = await getConnection()
        try {
            await conn.beginTransaction()
            const { orders_id } = req.body
            if (!orders_id) {
                throw new Error("orders_id is required")
            }

            const product = await moduleOrders.orderItmeByID(orders_id, conn)
            if (product.length === 0) {
                throw new Error("Orders Not Found")
            }
            const data = {
                orders_id: orders_id,
                amount: product[0].total
            }
            await modelsPayments.createPayment(data, conn)

            await conn.commit()
            return res.status(201).json({
                message: "Create Payment Successful!!"
            })
        } catch (error) {
            console.log("Server Error:", error)
            await conn.rollback()
            return res.status(500).json({
                message: "Server Error"
            })
        } finally {
            conn.release()
        }
    }

    static async UpdatePayment(req, res) {
        try {
            const { orders_id } = req.body
            if (!orders_id) {
                return res.status(404).json({
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
            if (payment[0].status === 'failed') {
                return res.status(409).json({
                    message: "This order has been failed."
                })
            }
            await modelsPayments.updatePayment(orders_id)


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

    static async getDailyIncome(req, res) {
        try {
            const data = await modelsPayments.getDailyIncome()

            return res.status(200).json({
                message: "Get DailyIncome Successful!!",
                data: data
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