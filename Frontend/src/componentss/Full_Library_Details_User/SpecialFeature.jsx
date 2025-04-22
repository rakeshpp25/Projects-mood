import React from 'react'
import { LuCircleCheckBig } from "react-icons/lu";

const SpecialFeature = () => {
  return (
    <>
    <h1 className="text-4xl font-bold">Special Feature</h1>
    <div className='flex flex-col text-xl gap-5'>
    <div className='flex gap-5 items-center'>
        <LuCircleCheckBig/>
        <p>Wheelchail Accessibility</p>
    </div>
    <div className='flex gap-5 items-center'>
        <LuCircleCheckBig/>
        <p>Hot and cold Water</p>
    </div>
    <div className='flex gap-5 items-center'>
        <LuCircleCheckBig/>
        <p>Comics and Magzines</p>
    </div>
    <div className='flex gap-5 items-center'>
        <LuCircleCheckBig/>
        <p>Smart Table Lamp</p>
    </div>

    </div>
    
   
    </>
  )
}

export default SpecialFeature