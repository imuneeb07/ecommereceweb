"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = () => {

var [Products,Setproducts] =useState([])

 async function fetchproducts(){
  var res = await axios.get("/api/products")
  Setproducts(res.data.message)
  }

  useEffect(()=>{
    fetchproducts()
  },[])

  async function Deleteproduct (id){

  if (!window.confirm("Are you sure?")) {
    return
  }

  var res = await axios.delete(`/api/products?id=${id}`)
  if (res.data.success) {
    alert(res.data.message)
    fetchproducts()


  }
  }





  return (
    <div>
  
  <div className="flex p-3  items-center justify-between">
    <div>Filter</div>
    <div className="flex items-center" >
      <form  >
        <input className="border rounded-full mr-2 p-2" placeholder="Search" type="text" />
      <Link href="/admin/products/add-product">
      <i className="bx bg-blue-700 text-white rounded-full text-center p-1 text-xl bx-plus"></i>

      </Link>
      </form>
    </div>
  </div>


    <table className="w-full">
      <thead >
        <tr className="border-b bg-gray-100">
          <th className="px-2 py-2 text-left">Product</th>
          <th className="px-2 py-2">Stock</th>
          <th className="px-2 py-2">Price</th>
          <th className="px-2 py-2">Category</th>
          <th className="px-2 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>

        {
          Products.map((v,i)=>{
        return(
          <tr className="border-b">
        <td className="py-1 px-2 flex items-center gap-2">
            <img className="w-16" src={v.featuredimage.url} alt="" />
            {v.title} </td>
        <td className="py-1 px-2 text-center">{v.stock}</td>
        <td className="py-1 px-2 text-center">{v.price}</td>
        <td className="py-1 px-2 text-center"> {v.category}</td>
        <td className="py-1 px-2 text-center text-xl">
          <Link href={`/admin/products/edit/${v._id}`}>
          <i className="bx bx-edit mr-2"></i>
          </Link>
          <i onClick={()=>Deleteproduct(v._id)} className="bx cursor-pointer bx-trash"></i>
          </td>
      </tr>
        )
          })
            
          
        }
      
      </tbody>
    </table>
    </div>
  );
};

export default Page;
