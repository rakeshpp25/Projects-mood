// components/Reuse/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="w-16 h-16 border-8 border-solid rounded-full animate-spin"
        style={{
          borderTopColor: "#3b82f6",  // blue top
          borderRightColor: "white",
          borderBottomColor: "white",
          borderLeftColor: "white",
        }}
      ></div>
    </div>
  );
};

export default Loader;
