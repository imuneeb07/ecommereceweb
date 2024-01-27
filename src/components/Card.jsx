import React from "react";
import Link from "next/link";
import Addicon from "./Addicon";
const Card = ({ pro }) => {
  return (
    <div className=" p-4 group ">
      <div className="mb-2 relative  overflow-hidden">
        <Link href={`/product/${pro._id}`}>
          <img className="w-full" src={pro.featuredimage.url} alt="" />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col translate-x-[150%] group-hover:translate-x-0  transition-all duration-500    ">
          <i className="bx bx-heart m-1 p-2 bg-white  text-xl" />
          <Addicon product={pro} />
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold line-clamp-2">{pro.title}</h1>
        <div className="py-1">
          <i className="bx text-orange-600  bxs-star " />
          <i className="bx text-orange-600  bxs-star " />
          <i className="bx text-orange-600  bxs-star  " />
          <i className="bx  bx-star " />
          <i className="bx  bx-star " />
        </div>
        <p className=" text-xl font-bold ">Rs {pro.price}</p>
      </div>
    </div>
  );
};

export default Card;
