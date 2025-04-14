import React from 'react'
import LibraryDescImages from '../componentss/Full_Library_Details_User/LibraryDescImages'
import LibraryHeader from '../componentss/Full_Library_Details_User/LibraryHeader'
import Reviews from '../componentss/Full_Library_Details_User/Reviews'
import ShowAmenities from '../componentss/Full_Library_Details_User/ShowAmenities'
import ShowRatings from '../componentss/Full_Library_Details_User/ShowRatings'
import ReviewInputs from '../componentss/Full_Library_Details_User/ReviewInputs'
import Navbar from '../componentss/Reuse/Navbar'


const FullLibraryDetails = () => {
  return (
    <div className='flex  flex-col gap-2'>
      <Navbar/>
      <LibraryDescImages/>
      <div className='flex'>
        <div className='flex flex-col w-1/2 m-20 gap-10'>
        <LibraryHeader/>
        <ShowAmenities/>

        <ShowRatings/>
        <ReviewInputs/>
        </div>
        
     
      </div>
     
      {/* <Reviews/>
      
      
      
       */}
      
    </div>
  )
}

export default FullLibraryDetails
