import mongoose from "mongoose";

function dbConnect(){
    if (mongoose.connection.readyState >= 1) {
      return  
    }
    mongoose.connect("mongodb://127.0.0.1:27017/estore")
}

export default dbConnect