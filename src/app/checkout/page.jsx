"use client";

import { GlobalData } from "@/src/Context/Context";
import React, { useContext, useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";


const page = () => {

  var { cart, removefromCart } = useContext(GlobalData);
  
  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const changehandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      var res = await axios.post("/api/orders", {
        items: cart.cartitems.map((v) => {
          var obj = {
            productId: v._id,
            unitPrice: v.price,
            quantity: v.quantity,
          };
          return obj;
        }),
        customerDetails: formData,
      });
      if (res.data.success) {
        alert("Order Placed Successfully");
        setFormdata({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          address: "",
        });
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="px-4 ">
      <form
        onSubmit={placeOrder}
        className=" max-w-6xl grid grid-cols-5  justify-between  mx-auto gap-6 py-10"
      >
        <div className=" grid col-span-5 grid-cols-2 gap-6 lg:col-span-3 ">
          <h2 className="font-semibold col-span-2 text-2xl ">
            Shipping Details
          </h2>
          <div className="">
            <label className="block" htmlFor="firstName">
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full py-1 px-3 rounded-md border"
              type="text"
              required
              onChange={changehandler}
              value={formData.firstName}
              name="firstName"
              placeholder="First Name"
            />
          </div>

          <div className="">
            <label className="block" htmlFor="lastName">
              Last Name
              <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full py-1 px-3 rounded-md border "
              type="text"
              required
              onChange={changehandler}
              value={formData.lastName}
              name="lastName"
              placeholder="Last Name"
            />
          </div>

          <div className="">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              className="w-full py-1 px-3 rounded-md border "
              type="email"
              onChange={changehandler}
              value={formData.email}
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="">
            <label className="block" htmlFor="phone">
              Phone #<span className="text-red-600">*</span>
            </label>
            <InputMask
              mask="03999999999"
              className="w-full py-1 px-3 rounded-md border "
              required
              onChange={changehandler}
              value={formData.phone}
              name="phone"
              placeholder="Phone #"
            />
          </div>

          <div className=" col-span-2">
            <label className="block" htmlFor="city">
              Town / City
              <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full py-1 px-3 rounded-md border "
              type="text"
              required
              onChange={changehandler}
              value={formData.city}
              name="city"
              placeholder="City"
            />
          </div>

          <div className=" col-span-2">
            <label className="block" htmlFor="address">
              Street Address <span className="text-red-600">*</span>
            </label>
            <input
              className="w-full py-1 px-3 rounded-md border "
              type="text"
              required
              onChange={changehandler}
              value={formData.address}
              name="address"
              placeholder="Street"
            />
          </div>
        </div>

        <aside className="border bg-gray-200 rounded-md p-4 col-span-5 lg:col-span-2 flex flex-col ">
          <h2 className="text-2xl font-semibold text-center  ">Your Order</h2>
          <div className="border  bg-white p-4 m-3 flex flex-col flex-1 rounded-md shadow-lg">
            <div className="flex  justify-between items-center  border-b pb-2 py-2 font-bold text-sm">
              <p>PRODUCT</p>
              <p>SUBTOTAL</p>
            </div>
            <div className="flex-1">
              {cart?.cartitems.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center  pb-2 m-3  "
                  >
                    <div className="flex items-center justify-between">
                      <span
                        onClick={() => removefromCart(v._id)}
                        className="hover:bg-slate-400  rounded-full px-2 cursor-pointer"
                      >
                        x
                      </span>
                      <div className="px-2">
                        <img
                          className="w-10"
                          src={v.featuredimage?.url}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-sm line-clamp-1 font-semibold">
                          {v.title}
                        </p>
                        {v.quantity} item x {v.price}
                      </div>
                    </div>
                    <p className="text-sm font-semibold pl-1 whitespace-nowrap">
                      Rs{v.total}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center  border-t pb-2 py-2 font-bold text-lg">
              <p>TOTAL</p>
              <p>RS {cart.cartTotal}</p>
            </div>
          </div>
          <button className="bg-red-600 text-center w-full rounded-md text-white py-1 px-2 ">
            Place Order
          </button>
        </aside>
      </form>
    </div>
  );
};

export default page;
