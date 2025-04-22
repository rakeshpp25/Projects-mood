import React from "react";

const Prices = () => {
  return (
    <>
    <div className= "border-4 border-gray-200 rounded-md">
    <div className=" rounded-md p-5 ">
        <div className="w-full rounded-md text-center  bg-[rgba(250,188,63,0.15)] ">
          Hourly
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between text-lg">
            <p>3 hour</p>
            <p className="font-semibold">&#8377;200</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>6 hour</p>
            <p className="font-semibold">&#8377;400</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>9 hour</p>
            <p className="font-semibold">&#8377;600</p>
          </div>
        </div>
      </div>


      <div className="rounded-md p-5 ">
        <div className="w-full rounded-md text-center  bg-[rgba(250,188,63,0.15)] ">
          Weekly
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between text-lg">
            <p>Half day</p>
            <p className="font-semibold">&#8377;200</p>
          </div>
          <div className="flex justify-between text-lg ">
            <p>Full Day</p>
            <p className="font-semibold">&#8377;400</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>Full Day(Day+Night)</p>
            <p className="font-semibold">&#8377;600</p>
          </div>
        </div>
      </div>


      <div className="rounded-md p-5 ">
        <div className="w-full rounded-md text-center  bg-[rgba(250,188,63,0.15)] ">
          Weekly
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex justify-between text-lg">
            <p>Half day</p>
            <p className="font-semibold">&#8377;200</p>
          </div>
          <div className="flex justify-between text-lg ">
            <p>Full Day</p>
            <p className="font-semibold">&#8377;400</p>
          </div>
          <div className="flex justify-between text-lg">
            <p>Full Day(Day+Night)</p>
            <p className="font-semibold">&#8377;600</p>
          </div>
        </div>
      </div>
    </div>
    <button className="w-full bg-blue-600 my-5 p-2 text-white rounded-md">Book now</button>
     
    </>
  );
};

export default Prices;