const moduleOrders = require("../models/orders")

class controllerOrders {
    static async create(req, res){
        try{
            const { users_id, states, total} = req.body

            const data = {}
            if(users_id){
                data.users_id = users_id
            }
            if(states){
                data.states = states
            }
            if(total){
                data.total = total
            }

            await moduleOrders.create(data)
            
            res.status(200).json({
                message: "Create Order Successful!!"
            })
        }catch(error){
            console.log("Message Error:",error)
            res.status(500).json({
                message: "Server Error"
            })
        }
    }
}

module.exports = controllerOrders