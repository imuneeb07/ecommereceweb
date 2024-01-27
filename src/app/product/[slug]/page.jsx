import React from "react";
import Productimages from "./Productimages";
import Quantity from "./Quantity";
import axios from "axios";


async function findproductbyid(id){
 var res =await axios.get(`http://localhost:3000/api/products?id=${id}`)
 return res.data.message[0]
}


const page = async (props) => {

var product = await findproductbyid(props.params.slug)
 

  return (
    <div className="px-4 ">
      
      <div className="max-w-6xl  py-10 grid grid-cols-1 mx-auto md:grid-cols-2 gap-4">

        <Productimages fImage={product.featuredimage} rImages={product.relatedimages}/>

        <div className=" ">
          <h1 className="text-3xl font-semibold  ">
            {product.title}
          </h1>
          <p className=" text-red-600 font-semibold text-2xl">
          <strike className="text-gray-500 text-xl" >Rs 299.00
</strike>
          <span> Rs {product.price}</span>
          </p>
         <Quantity product={product} />
         
        </div>
      </div>
    </div>
  );
};

export default page;
