"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    var pathname = usePathname()
  return (
    <div>
      <ul className='p-3'>
        <li>
            <Link className={`block rounded-md py-1 ${pathname == "/admin" && " font-semibold bg-white"} my-1  p-2`} href="/admin"><i className='mx-2 bx  bx-home'></i>Home</Link>
        </li>
        <li>
            <Link className={`block rounded-md py-1${pathname == "/admin/orders" && " font-semibold bg-white"} my-1  p-2`} href="/admin/orders"><i className='mx-2 bx  bx-cart'></i>Orders</Link>
        </li>
        <li>
            <Link className={`block rounded-md py-1${pathname == "/admin/products" && " font-semibold bg-white"} my-1  p-2`} href="/admin/products"><i className='mx-2 bx  bx-tag'></i>Products</Link>
        </li>
        <li>
            <Link className={`block rounded-md py-1${pathname == "/admin/analytics" && " font-semibold bg-white"} my-1  p-2`} href="/admin/analytics"><i className='mx-2 bx  bx-chart'></i>Analytics</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
