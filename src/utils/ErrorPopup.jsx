import React from "react";

const ErrorPopup = ({ message }) => {
  return (
    <div
      className={`absolute top-0 right-0 text-red-500`}
    >
      {message}
    </div>
  );
};

export default ErrorPopup;