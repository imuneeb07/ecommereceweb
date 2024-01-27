"use client"

import { useState } from "react"

const Productimages = ({fImage , rImages}) => {

var [selectimg,Setselectimg] = useState(fImage.url)

  return (
    <div>
        <div>
            {/* selected img */}
            <div>
              <img
                className="w-full"
                src={selectimg}
                alt={fImage.altText}
              />
            </div>
            {/* featured img */}
            <div className="grid grid-cols-4 border gap-4 mt-2">
              {rImages.map((v,i)=>{
                return(<div>
                <img
                  className="w-full hover:opacity-50 cursor-pointer"
                  src="https://preview.colorlib.com/theme/malefashion/img/product/product-2.jpg.webp"
                  alt=""
               onClick={()=>Setselectimg("https://preview.colorlib.com/theme/malefashion/img/product/product-2.jpg.webp")}
               />
              </div>)
              })}
              
          
            </div>
          </div>
    </div>
  )
}

export default Productimages
