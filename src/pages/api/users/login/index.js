import Users from "@/src/models/Users";
import dbConnect from "@/src/config/dbConnect";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { serialize } from "cookie";



export default async function handler(req,res){
    dbConnect()
    switch (req.method) {
        case "POST":
try {
   
    // Found User

   var foundUser =  await Users.findOne({username:req.body.username})
   if (!foundUser) {
    res.json({
        success:false,
        message:"Invalid Username or Password!"
    })
    return
   }
   
// Password Check
  var isPasswordValid =await bcrypt.compare(req.body.password,foundUser.password)
  if (!isPasswordValid) {
    res.json({
        success:false,
        message:"Invalid Username or Password!"
    })
    return
  }
 
//  Generate token and save in browser's cookies

var jwttoken = jwt.sign({id:foundUser._id},"dhe239783918",{expiresIn:"60s"})

const cookieValue = serialize('accesstoken', jwttoken, {
    httpOnly: true,
    secure:true,
    maxAge: 60 * 60, // Cookie expires in 1 hour
    path: '/', // Root path
  });

  res.setHeader('Set-Cookie', [cookieValue]);


  res.json({
    success: true,
    message: 'Login Successfully!'
  });







} catch (error) {
    res.json({
        success:false,
        message:"Something Went Wrong!"
    })
}
            
            break;
    
        
    }
}