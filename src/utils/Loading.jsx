import React from "react";

const Loading = ({ size }) => {
  return (
    <div className="w-full h-screen">
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className="animate-spin my-auto mx-auto overflow-scroll"
      >
        <div
          className="h-full w-full border-4 border-t-purple-500
       border-b-purple-700 rounded-[50%]"
        ></div>
      </div>
    </div>
  );
};

export default Loading;
