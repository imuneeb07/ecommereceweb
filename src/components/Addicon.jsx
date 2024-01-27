"use client"
import React from 'react'
import { GlobalData } from '@/src/Context/Context'
import { useContext } from 'react'

const Addicon = ({product}) => {
    const {addtoCart} =useContext(GlobalData)
  return (
    <div>
     <i onClick={()=>addtoCart(product)} className='bx bx-cart  m-1 p-2 bg-white  text-xl'/>

    </div>
  )
}

export default Addicon
