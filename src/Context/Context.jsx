"use client"
import axios from 'axios'
import {createContext,useEffect,useState} from 'react'


export const GlobalData = createContext() 

const Context = ({children}) => {


  var [user,setUser] =useState(null)

var [cart,Setcart] = useState({
    cartitems:[],
    cartTotal:0,
    Totalitems:0
})



const addtoCart = (item) =>{

var cartCopy = cart.cartitems

var existeditem =  cartCopy.filter(v=> v._id == item._id)

if (existeditem.length) {

  cartCopy = cartCopy.map(v=>{

    if (v._id == item._id) {

      v.quantity = v.quantity+1
      v.total = Math.round(v.quantity * v.price)
    }
    return v
   }) 
}
else{
    cartCopy.push({...item,quantity:1,total:Math.round(item.price)})
}
var total = 0
cartCopy.forEach((v)=>{
  total = total + v.total
})

var Totalitems = 0
cartCopy.forEach((v)=>{
  Totalitems = Totalitems + v.quantity
})


Setcart({cartitems:cartCopy,cartTotal:Math.round(total),Totalitems})

window.localStorage.setItem("cart",JSON.stringify({cartitems:cartCopy,cartTotal:total.toFixed(2),Totalitems}))

}

const decreaseQuantity = (item) =>{

  var cartCopy = cart.cartitems
  
  var existeditem =  cartCopy.filter(v=> v._id == item._id)
  
  if (existeditem[0].quantity != 1) {
  
    cartCopy = cartCopy.map(v=>{
  
      if (v._id == item._id) {
  
        v.quantity = v.quantity-1
        v.total = Math.round(v.quantity * v.price)
      }
      return v
     }) 
  }
  else{
    cartCopy = cartCopy.filter(v=> v._id != item._id)
  }
  var total = 0
  cartCopy.forEach((v)=>{
    total = total + v.total
  })
  
  var Totalitems = 0
  cartCopy.forEach((v)=>{
    Totalitems = Totalitems + v.quantity
  })
  
  
  Setcart({cartitems:cartCopy,cartTotal:Math.round(total),Totalitems})
  
  window.localStorage.setItem("cart",JSON.stringify({cartitems:cartCopy,cartTotal:total.toFixed(2),Totalitems}))
  
  }

const removefromCart = (id)=>{
 var  cartCopy = cart.cartitems
 cartCopy = cartCopy.filter(v=> v._id != id)

  var total = 0
cartCopy.forEach((v)=>{
  total = total + v.total
})

var Totalitems = 0
cartCopy.forEach((v)=>{
  Totalitems = Totalitems + v.quantity
})


Setcart({cartitems:cartCopy,cartTotal:Math.round(total),Totalitems})

window.localStorage.setItem("cart",JSON.stringify({cartitems:cartCopy,cartTotal:total.toFixed(2),Totalitems}))

}

const fetchUser = async()=>{
var res =await axios.get("http://localhost:3000/api/users/profile")
if (res.data.success) {
  setUser(res.data.message)
}else{
  setUser(null)

}
}

useEffect(()=>{
  fetchUser()
},[])

useEffect(()=>{
  if (window.localStorage.cart) {
    Setcart(JSON.parse(window.localStorage.cart))
  }
},[])


  return (
    <GlobalData.Provider value={{cart,Setcart,addtoCart,decreaseQuantity,removefromCart}}>
      {children}
      </GlobalData.Provider>
  )
}

export default Context
