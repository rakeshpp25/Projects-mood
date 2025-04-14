import React from 'react'
import LibraryDescImages from '../componentss/Full_Library_Details_User/LibraryDescImages'
import LibraryHeader from '../componentss/Full_Library_Details_User/LibraryHeader'
import Reviews from '../componentss/Full_Library_Details_User/Reviews'
import ShowAmenities from '../componentss/Full_Library_Details_User/ShowAmenities'
import ShowRatings from '../componentss/Full_Library_Details_User/ShowRatings'
import ReviewInputs from '../componentss/Full_Library_Details_User/ReviewInputs'


const FullLibraryDetails = () => {
  return (
    <div>
      <LibraryDescImages/>
      <LibraryHeader/>
      <Reviews/>
      <ReviewInputs/>
      <ShowAmenities/>
      <ShowRatings/>
      
    </div>
  )
}

export default FullLibraryDetails
