import React, { useState } from 'react';

const SubmitCard = ({ item, disabled }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className='border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white shadow-sm'>
      <img
        className='w-24 h-24 rounded-md object-cover'
        src={preview || '/placeholder.png'}
        alt="Uploaded preview"
      />
      <div className='flex flex-col justify-center gap-2 w-full'>
        <div className="text-sm font-medium text-gray-700">Please Upload {item}</div>
        <input
          type="file"
          className='text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200'
          disabled={disabled}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default SubmitCard;