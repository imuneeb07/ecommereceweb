"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = ({ params }) => {
  var [order, setOrder] = useState({});

  const fetchOrders = async () => {
    var { data } = await axios.get(`/api/orders?id=${params.id}`);
    setOrder(data.message[0]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="px-4 ">
      <div className=" max-w-6xl grid grid-cols-5  justify-between  mx-auto gap-6 py-10">
      
      <div className="col-span-5 lg:col-span-3">
      <div className=" grid  grid-cols-2 gap-6  ">
          <h2 className="font-semibold col-span-2 text-2xl ">
            Customer Details
          </h2>
          <div className="">
            <label className="block" htmlFor="firstName">
              First Name <span className="text-red-600">*</span>
            </label>
            <div className="text-xl font-bold">
              {order?.customerDetails?.firstName}
            </div>
          </div>

          <div className="">
            <label className="block" htmlFor="lastName">
              Last Name
              <span className="text-red-600">*</span>
            </label>
            <div className="text-xl font-bold">
              {order?.customerDetails?.lastName}
            </div>
          </div>

          <div className="">
            <label className="block" htmlFor="email">
              Email
            </label>
            <div className="text-xl font-bold">
              {order?.customerDetails?.email}
            </div>
          </div>

          <div className="">
            <label className="block" htmlFor="phone">
              Phone #<span className="text-red-600">*</span>
            </label>
            <div className="text-xl font-bold">
              {order?.customerDetails?.phone}
            </div>
          </div>

          <div className=" col-span-2">
            <label className="block" htmlFor="city">
              Town / City
              <span className="text-red-600">*</span>
            </label>
            <div className="text-xl font-bold">
              {order?.customerDetails?.city}
            </div>
          </div>

          <div className=" col-span-2">
            <label className="block" htmlFor="address">
              Street Address <span className="text-red-600">*</span>
            </label>
            <div className="text-xl font-bold">
              {order?.customerDetails?.address}
            </div>
          </div>
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
              {order?.items?.map((v, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-between items-center  pb-2 m-3  "
                  >
                    <div className="flex items-center justify-between">
                      <div className="px-2">
                        <img
                          className="w-10"
                          src={v.productId.featuredimage?.url}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-sm line-clamp-1 font-semibold">
                          {v.productId.title}
                        </p>
                        {v.quantity} item x {v.unitPrice}
                      </div>
                    </div>
                    <p className="text-sm font-semibold pl-1 whitespace-nowrap">
                      Rs{v.quantity * v.unitPrice}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center  border-t pb-2 py-2 font-bold text-lg">
              <p>TOTAL</p>
              <p>RS {order.total}</p>
            </div>
          </div>
         <div className="flex items-center gap-1">
         <button className=" bg-green-600  flex-1 text-center w-full rounded-md text-white py-3 px-3 ">
            Confirmed Order
          </button>
         <div className="flex justify-center items-center h-full ">
            <i className="bx text-xl p-2 bx-edit border  cursor-pointer  "></i>
         </div>
         </div>
        </aside>
      </div>
    </div>
  );
};

export default Page;
