import React from 'react';
import { LuCircleCheckBig } from "react-icons/lu";

const SpecialFeature = ({ overview }) => {
  console.log(overview)
  return (
    <div className='flex flex-col gap-5'>
      <h1 className="text-[26px] font-bold">Special Feature</h1>
      <div className="flex flex-col text-[18px] gap-4">
        {overview?.special_features?.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <LuCircleCheckBig className="text-[20px]" />
            <p className='text-[#303030] text-[18px]'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialFeature;
