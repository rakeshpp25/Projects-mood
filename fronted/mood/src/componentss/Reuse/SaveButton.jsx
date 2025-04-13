import React from 'react'

function SaveButton() {


  
  return (
    <>
     <button type='submit' class="flex w-[120px] h-[50px] justify-center items-center rounded-[2px] bg-[#6439FF] text-white text-[20px] "
     onClick={HandleDataSave}>
 SAVE
</button>
    </>
  )
}

export default SaveButton
