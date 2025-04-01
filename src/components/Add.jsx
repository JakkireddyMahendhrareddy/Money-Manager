import React from "react";

const Add = ({ res }) => {
  return (
    <div className="flex">
      <h1 className="text-sm">{res.id}</h1>

      <div className="flex flex-col justify-center items-center w-60">
        <h1 className="text-sm">{res.name}</h1>
        <h1 className="text-sm">{res.text}</h1>
      </div>
    </div>
  );
};

export default Add;
