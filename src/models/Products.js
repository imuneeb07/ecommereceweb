import mongoose from "mongoose";

var schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    featuredimage:{
        url:String,
        altText:String
    },
    relatedimages:[
        {
        url:String,
        altText:String
    }
     ],
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
},{timestamps:true})


export default mongoose.models.products || mongoose.model("products",schema)