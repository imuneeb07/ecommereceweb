import Products from "@/src/models/Products";
import dbConnect from "@/src/config/dbConnect";

export default async function handler(req,res){
   
    dbConnect()

 switch(req.method){
    case "GET" : 
    try {

        var match = {}
        if (req.query.id) {
            match._id = req.query.id
        }
        var reqItem = await Products.find(match)
        res.json({
            success:true,
        message:reqItem 
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

            var product = await Products.create(req.body)
        
            res.json({
                success:true,
                message:product
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

    
     await Products.findByIdAndUpdate(req.body._id,{$set:req.body})
    res.json({
        success:true,
    message:"Product updated successfully!" 
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

    
     await Products.findByIdAndDelete(req.query.id)
    res.json({
        success:true,
    message:"Product deleted successfully!" 
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