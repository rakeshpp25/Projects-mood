import React from 'react';

function SaveButton({ onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="flex w-[120px] h-[50px] justify-center items-center rounded-[2px] bg-[#6439FF] text-white text-[20px]"
    >
      SAVE
    </button>
  );
}

export default SaveButton;
