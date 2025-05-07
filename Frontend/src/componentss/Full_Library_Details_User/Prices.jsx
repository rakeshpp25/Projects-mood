import React from "react";

const Prices = () => {
  const pricingData = [
    {
      title: "Hourly",
      options: [
        { label: "3 hour", price: 200 },
        { label: "6 hour", price: 400 },
        { label: "9 hour", price: 600 },
      ],
    },
    {
      title: "Weekly",
      options: [
        { label: "Half day", price: 200 },
        { label: "Full Day", price: 400 },
        { label: "Full Day (Day+Night)", price: 600 },
      ],
    },
    {
      title: "Monthly",
      options: [
        { label: "Basic", price: 1000 },
        { label: "Standard", price: 2000 },
        { label: "Premium", price: 3000 },
      ],
    },
  ];

  return (
    <>
      <div className="border-4 border-[#E8E8E8] rounded-md">
        {pricingData.map((category, index) => (
          <div key={index} className="rounded-md p-5">
            <div className="w-full rounded-md text-center bg-[rgba(250,188,63,0.15)] font-semibold text-lg py-2">
              {category.title}
            </div>
            <div className="flex flex-col gap-4 p-4">
              {category.options.map((option, idx) => (
                <div key={idx} className="flex justify-between text-lg">
                  <p>{option.label}</p>
                  <p className="font-semibold">&#8377;{option.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-blue-600 my-5 p-2 text-white rounded-md">
        Book now
      </button>
    </>
  );
};

export default Prices;
