"use client"
import React from "react";

const Dnavbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 ">
      <img
        className="w-24"
        src="https://www.payoneer.com/wp-content/uploads/shopify-header-logo.png.webp"
        alt=""
      />
      <div>
        <div className="flex gap-2 items-center">
          <img
          className="w-8 h-8 rounded-full overflow-hidden"
            src="data:image/png;base64,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"
            alt=""
          />
          <h2>Username</h2>
        </div>
      </div>
    </div>
  );
};

export default Dnavbar;
