import React, { useState } from 'react';
import SubmitCard from './SubmitCard';
import SaveButton from '../Reuse/SaveButton';
import EditButton from '../Reuse/EditButton';

const Documents = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    // If needed, you can reset to original state here
    setIsEditing((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // You can add actual saving logic here (e.g., upload documents)
    console.log("✅ Documents saved.");
    setIsEditing(false);
  };

  return (
    <form className='min-h-screen md:px-12 w-full max-w-6xl flex flex-col' onSubmit={handleSave}>
      <header className='flex flex-col md:flex-row justify-between items-start md:items-center mb-6'>
        <h2 className="text-xl font-semibold mb-2 md:mb-0">Documents Details</h2>
        <div className='md:mr-10'>
          <EditButton isEditing={isEditing} onClick={handleEditToggle} />
        </div>
      </header>

      <div className='flex flex-col gap-6'>
        <SubmitCard item="Aadhar Card Front Side" disabled={!isEditing} />
        <SubmitCard item="Aadhar Card Back Side" disabled={!isEditing} />
        <SubmitCard item="Your Selfie" disabled={!isEditing} />
      </div>

      {isEditing && (
        <div className='mt-8'>
          <SaveButton onClick={handleSave} />
        </div>
      )}
    </form>
  );
};

export default Documents;
