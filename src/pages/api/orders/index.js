import ordersModel from "@/src/models/Orders";
import dbConnect from "@/src/config/dbConnect";
import Products from "@/src/models/Products";

export default async function handler(req,res){
   
    dbConnect()

 switch(req.method){
    case "GET" : 
    try {

        var match = {}
        if (req.query.id) {
            match._id = req.query.id
        }
        var foundOrders = await ordersModel.find(match).populate({
            path:"items.productId",
            modal:Products,
            select:['title','featuredimage','stock']
        })
        
        foundOrders = foundOrders.map(orders=>{
            var total = 0
            orders.items.map(v=>{
                total = total + v.quantity*v.unitPrice
            })
            orders._doc.total = total
            return orders
        })
        

        res.json({
            success:true,
        message:foundOrders 
        })
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
    break
    case"POST" :
        try {

            var order = await ordersModel.create(req.body)
        
            res.json({
                success:true,
                message:order
            })
        } catch (error) {
            res.json({
                success:false,
                message:error.message
            })
        }
break
case "PUT" : 
try {

    
     await ordersModel.findByIdAndUpdate(req.body._id,{$set:req.body})
    res.json({
        success:true,
    message:"Order updated successfully!" 
    })
} catch (error) {
    res.json({
        success:false,
        message:error.message
    })
}
break
case "DELETE" : 
try {

    
     await ordersModel.findByIdAndDelete(req.query.id)
    res.json({
        success:true,
    message:"Order deleted successfully!" 
    })
} catch (error) {
    res.json({
        success:false,
        message:error.message
    })
}
break
}

   

}