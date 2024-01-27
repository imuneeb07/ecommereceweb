"use client"
import { GlobalData } from '@/src/Context/Context'
import  { useContext, useState } from 'react'

const Quantity = ({product}) => {

const {addtoCart,decreaseQuantity,cart} = useContext(GlobalData)


const [Q,setQ]=useState(0)
var showquantity = cart.cartitems.filter(v=> v._id == product._id)[0]?.quantity || 0 
console.log(showquantity)
  return (
    <div>
        <div className="flex my-4">
         {/* quantity */}
          <div className="flex items-center mr-4">
          <button onClick={()=>decreaseQuantity(product)} disabled={showquantity == 0} className="disabled:cursor-not-allowed border text-xl font-semibold border-gray-400 p-2 bg-gray-200 b">-</button>
         <span className=" mx-2 text-2xl">{ showquantity }</span>
         <button onClick={()=>addtoCart(product)} className="border text-xl font-semibold border-gray-400 p-2 bg-gray-200 b">+</button>
          </div>

         <button onClick={()=>addtoCart(product)} className="text-white py-2 px-4 bg-red-600">Add To Cart</button>
          
         </div>  
    </div>
  )
}

export default Quantity
