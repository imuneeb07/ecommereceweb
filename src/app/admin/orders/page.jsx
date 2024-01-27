"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Page = ({params}) => {
  var [Orders, setOrders] = useState([]);

  async function fetchOrders() {
    var res = await axios.get("/api/orders");
    setOrders(res.data.message);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function DeleteOrder(id) {
    if (!window.confirm("Are you sure?")) {
      return;
    }

    var res = await axios.delete(`/api/orders?id=${id}`);
    if (res.data.success) {
      alert(res.data.message);
      fetchOrders();
    }
  }

  return (
    <div>
      <div className="flex p-3  items-center justify-between">
        <div>Filter</div>
        <div className="flex items-center">
          <form>
            <input
              className="border rounded-full mr-2 p-2"
              placeholder="Search"
              type="text"
            />
            <Link href="/admin/products/add-product">
              <i className="bx bg-blue-700 text-white rounded-full text-center p-1 text-xl bx-plus"></i>
            </Link>
          </form>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-2 py-2 text-left">Date</th>
            <th className="px-2 py-2 text-left">Customer</th>
            <th className="px-2 py-2">Phone</th>
            <th className="px-2 py-2">Order</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-2 py-2">Payment</th>
            <th className="px-2 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Orders.map((v, i) => {
            return (
              <tr className="border-b">
                <td className="py-1 px-2 text-left">
                  {new Date(v.createdAt).toDateString()}
                </td>

                <td className="py-1 px-2 text-left">
                  {v.customerDetails?.firstName}
                </td>
                <td className="py-1 px-2 text-center">
                  {v.customerDetails?.phone}
                </td>
                <td className="py-1 px-2 text-center">{v.total}</td>
                <td className="py-1 px-2 text-center">{v.staus}</td>
                <td className="py-1 px-2 text-center">
                  {v.paymentStatus || "-"}
                </td>
                <td className="py-1 px-2 text-center text-xl">
                  <Link href={`/admin/orders/${v._id}`}>
                  <i className="bx bx-detail mr-2"></i>
                   </Link>

                  <i
                    onClick={() => DeleteOrder(v._id)}
                    className="bx cursor-pointer bx-trash"
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
