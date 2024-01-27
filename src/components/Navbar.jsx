"use client"

import React,{useContext, useState} from 'react'
import { GlobalData } from '@/src/Context/Context'
import Link from 'next/link'
import dynamic from "next/dynamic";

const Navbar = () => {

const {cart} = useContext(GlobalData)   

const [menu,Displaymenu] =useState(false)  
 
  return (
        <div className='  shadow-lg sticky top-0 z-50 bg-white backdrop-blur-md '>
        <nav className='px-4  flex items-center justify-between max-w-6xl mx-auto '>
            <div>
                <img src="https://preview.colorlib.com/theme/malefashion/img/logo.png.webp" alt="" />
            </div>
            <ul>
                <li className='hidden md:block '>
                    <Link className='py-6 px-3 inline-block text-black text-lg font-semibold' href="/">Home</Link>
                    <Link className='py-6 px-3 inline-block text-black text-lg font-semibold' href="/shop">Shop</Link>
                    <Link className='py-6 px-3 inline-block text-black text-lg font-semibold' href="/pages">Pages</Link>
                    <Link className='py-6 px-3 inline-block text-black text-lg font-semibold' href="/contacts">Contacts</Link>
                
                </li>
            </ul>


            <div className='hidden md:block'>
               <i className='bx px-3 py-2  text-xl  cursor-pointer  bx-search '/>
               <i className='bx px-3 py-2 text-xl cursor-pointer  bx-heart '/>
               <Link href="/cart">
               <div className=' inline-block relative'>
               <i className='bx px-3 py-2 text-xl cursor-pointer  bx-cart '/>
               <span  className=' bg-red-600 text-white  absolute top-0 right-1 rounded-full w-4 h-4 flex justify-center text-xs items-center text-center '>{cart.Totalitems}</span>
               </div>
               </Link>
               <br />
               {/* {cart.cartTotal} */}
            </div>

           

        {/* mobile view */}
        <div className={`absolute  ${menu ? "" : "-translate-x-[100%]"} transition-all duration-1000 w-1/2 h-screen block md:hidden border-2 top-0 left-0  bg-white `} >
        
        
        
        <div className='mt-4'>
               <i className='bx px-3 py-2  text-xl  cursor-pointer  bx-search '/>
               <i className='bx px-3 py-2 text-xl cursor-pointer  bx-heart '/>
               <i className='bx px-3 py-2 text-xl cursor-pointer  bx-cart '/>
            </div>
        
        <ul className='p-2'>
                <li>
                    <Link className='p-2  block text-black text-lg  font-semibold' href="/">Home</Link>
                    <Link className='p-2  block text-black text-lg  font-semibold' href="/shop">Shop</Link>
                    <Link className='p-2  block text-black text-lg  font-semibold' href="/pages">Pages</Link>
                    <Link className='p-2  block text-black text-lg  font-semibold' href="/cart">Cart</Link>
                    <Link className='p-2  block text-black text-lg  font-semibold' href="/contacts">Contacts</Link>
                </li>
            </ul> 


            
        </div>

        <div className='block md:hidden'>
                <i onClick={()=>Displaymenu(!menu)} className={`bx cursor-pointer text-3xl p-3 bx-${menu ? "x" :"menu"}`}></i>
            </div>
            </nav>

        </div>
  )
}

export default dynamic (() => Promise.resolve(Navbar), {ssr: false})


