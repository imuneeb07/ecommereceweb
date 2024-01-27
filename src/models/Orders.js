import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        },
        quantity:{
            type:Number,
        },
        unitPrice:{
         type:Number,
        },
        totalprice:{
            type:Number
        },
    }  
    ],
    customerDetails:{
     firstName:String,
     lastName:String,
     email:String,
     phone:String,
     city:String,
     address:String,
    },
    status:{
        type:String,
        default:"Pending",
        required:true,
        enum:[
            "Pending",
            "Shipped",
            "Confirmed",
            "Delivered",
            "Cancelled",
        ]
    },
    paymentStatus:{
        type:String,
        default:"Pending",
        required:true,
        enum:[
            "Pending",
            "Confirmed",
        ]
    },
    remarks:String
},
{timestamps:true}
)

export default mongoose.models?.orders || mongoose.model("orders",orderSchema)