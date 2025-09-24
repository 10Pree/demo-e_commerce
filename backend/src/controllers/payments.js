const moduleOrders = require("../models/orders")
const modelsPayments = require("../models/payments")

class controllerPayments {
    static async createPayment(req, res){
        try{
            const { orders_id } = req.body
            if(!orders_id){
                res.status(404).json({
                    message: "orderID and amount Not Found"
                })
            }

            
            const product = await moduleOrders.orderItmeByID(orders_id)
            if(product.length === 0){
                res.status(404).json({
                    message: "Orders Not Found"
                })
            }
            // console.log(product[0].total)
            const data = {
                orders_id: orders_id,
                amount: product[0].total
            }
            await modelsPayments.createPayment(data)

            res.status(200).json({
                message: "Create Payment Successful!!!"
            })
        }catch(error){
            console.log("Server Error:",error)
            res.status(500).json({
                message: "Server Error" 
            })
        }
    }
}

module.exports = controllerPayments