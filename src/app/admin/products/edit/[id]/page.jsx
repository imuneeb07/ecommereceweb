"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = ({params}) => {
  var [choosenimg, Setchoosenimg] = useState(null);

  var [Formdata, Setformdata] = useState({
    title: "",
    relatedimages: [],
    desc: "",
    price: 0,
    category: "",
    stock: 0,
  });

  var changehandler = (e) => {
    Setformdata({ ...Formdata, [e.target.name]: e.target.value });
  };

  async function uploadtoCloudinary() {
    try {
      var data = new FormData();
      data.append("file", choosenimg);
      data.append("upload_preset", "z5f2n79m");

      var res = await fetch(
        "https://api.cloudinary.com/v1_1/dehvncyru/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      res = await res.json();
      return res.url;
    } catch (error) {}
  }

  const submitdata = async (e) => {
    e.preventDefault();
    var Curl = choosenimg  ? await uploadtoCloudinary() : Formdata.featuredimage.url;
    var res = await axios.put("/api/products",{
      ...Formdata,
      featuredimage: { url: Curl },
    });
    if (res.data.success) {
      alert(res.data.message)
      Setformdata({
        title: "",
        relatedimages: [],
        desc: "",
        price: 0,
        category: "",
        stock: 0,  
      })
    }
  };

  async function getSingleproduct() {
    var res = await axios.get(`/api/products?id=${params.id}`);
    Setformdata(res.data.message[0]);
  }

  useEffect(() => {
    getSingleproduct();
  },[]);

  return (
    <div>
      <form
        onSubmit={submitdata}
        className="max-w-4xl  mx-auto shadow-lg border  p-4"
      >
        <h1 className="font-semibold text-3xl mb-3">Edit Product</h1>

        {/* Title */}
        <div>
          <label className="block" htmlFor="title">
            Title
          </label>
          <input
            onChange={changehandler}
            className="w-full  border py-1 mb-3 px-2"
            required
            value={Formdata.title}
            type="text"
            placeholder="Product Title"
            name="title"
          />
        </div>

        {/* Featured Image  */}
        {(choosenimg || Formdata.featuredimage) ? (
          <div className=" relative mb-6 ">
            <img
              src={
                choosenimg ? URL.createObjectURL(choosenimg) : Formdata.featuredimage?.url
              }
              alt=""
            />
            <div className="absolute top-3 right-3  ">
              <i
                onClick={() => Setchoosenimg(null)}
                className="bx bx-x bg-red-600 text-white rounded-full text-center"
              ></i>
            </div>
          </div>
        ) : (
          <div>
            <label className="block" htmlFor="featuredimage.url">
              Featured Image
            </label>
            <input
              onChange={(e) => Setchoosenimg(e.target.files[0])}
              className="w-full border py-1 mb-3 px-2"
              required
              type="file"
              placeholder="Featured Image URL"
              name="featuredimage.url"
            />
          </div>
        )}
        {/* Alt Text for Featured Image - You can add similar divs for other properties */}
        {/* <div>
          <label className="block" htmlFor="featuredimage">
            Featured Image Alt
          </label>
          <input
            onChange={changehandler}
            className="w-full border py-1 mb-3 px-2"
            required
            type="text"
            placeholder="Alt Text for Featured Image"
            name="featuredimage"
          />
        </div> */}

        {/* Related Images */}

        {/* <div>
            <label className="block" htmlFor="relatedimage">
              Related Image
            </label>
            <input
              onChange={changehandler}
              className="w-full border py-1 mb-3 px-2"
              type="text"
              placeholder="Related Image"
              name="relatedimage"
            /> */}
        {/* Alt Text for Related Image - You can add similar divs for other properties */}
        {/* <input
              onChange={changehandler}
              className="w-full border py-1 mb-3 px-2"
              type="text"
              placeholder="Alt Text for Related Image"
              name="relatedimageAltTex"
            />
          </div> */}

        {/* Description, Price, Category, and Stock - You can add similar divs for other properties */}
        <div>
          <label className="block" htmlFor="desc">
            Description
          </label>
          <textarea
            onChange={changehandler}
            className="w-full border py-1 mb-3 px-2"
            required
            value={Formdata.desc}
            placeholder="Product Description"
            name="desc"
          />
        </div>
        <div>
          <label className="block" htmlFor="price">
            Price
          </label>
          <input
            onChange={changehandler}
            className="w-full border py-1 mb-3 px-2"
            required
            value={Formdata.price}
            type="number"
            placeholder="Product Price"
            name="price"
          />
        </div>
        <div>
          <label className="block" htmlFor="category">
            Category
          </label>
          <input
            onChange={changehandler}
            className="w-full border py-1 mb-3 px-2"
            required
            value={Formdata.category}
            type="text"
            placeholder="Product Category"
            name="category"
          />
        </div>
        <div>
          <label className="block" htmlFor="stock">
            Stock
          </label>
          <input
            onChange={changehandler}
            className="w-full border py-1 mb-3 px-2"
            required
            value={Formdata.stock}
            type="number"
            placeholder="Product Stock"
            name="stock"
          />
        </div>
        <button className=" bg-blue-900 text-white px-3 py-2">Update</button>
      </form>
    </div>
  );
};

export default Page;
