"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { GlobalData } from "@/src/Context/Context";
const page = () => {
  var { cart, addtoCart, decreaseQuantity, removefromCart } =
    useContext(GlobalData);
  // console.log(cart.cartitems)
  return (
    <div className="p-4">
      <div className=" max-w-6xl py-10 mx-auto gap-8 grid grid-cols-6 ">
        {/* product table */}
        <div className=" py-8 col-span-4">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-4">Products</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cart.cartitems.map((v, i) => {
                return (
                  <tr className="border-b ">
                    <td className="  py-4 ">
                      <div className="grid grid-cols-4 items-center">
                        <div className="mr-3 col-span-1">
                          <img
                            className="w-full"
                            src={v.featuredimage.url}
                            alt=""
                          />
                        </div>
                        <div className="col-span-3">
                          <h1 className="font-bold">{v.title}</h1>
                          <p>Rs{v.price}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center justify-center px-4 text-2xl">
                        <button
                          onClick={() => decreaseQuantity(v)}
                          className=""
                        >
                          -
                        </button>
                        <span className=" mx-4">{v.quantity}</span>
                        <button onClick={() => addtoCart(v)} className="">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center px-4">Rs{v.total}</td>
                    <td className="text-center px-8">
                      <i
                        onClick={() => removefromCart(v._id)}
                        className="bx text-3xl cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-full bx-x"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* proceed checkout */}
        <div className="col-span-2">
          <div className="bg-gray-100 p-4">
            <h2 className="font-bold mb-4 text-xl ">Cart Total</h2>

            <div className="flex justify-between items-center py-2">
              <div>Subtotal</div>
              <div className="text-red-600">Rs{cart.cartTotal}</div>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>Tax</div>
              <div className="text-red-600">0</div>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>Shipping Charges</div>
              <div className="text-red-600">0</div>
            </div>

            <div className="flex justify-between items-center py-2">
              <div>Total</div>
              <div className="text-red-600">Rs{cart.cartTotal}</div>
            </div>

            <Link
              href="/checkout"
              className="block bg-black text-white text-center p-2 mt-3"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
