import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleEdit } from '../Redux/toggleEdit';


function EditButton({id}) {

      const dispatch = useDispatch();
      const isEditing = useSelector((state) => state.edit.editStates[id]) || false;
    
      const handleToggle = () => {
        dispatch(toggleEdit({ id }));
      };


  return (
    <>
    <button style={{color : "#6439ff" , fontSize : "16px" , fontWeight : "500" ,cursor: "pointer",}}
    onClick={handleToggle}>
          {isEditing ? "Cancel" : "Edit"}
    </button>
    </>
  )
}


export default EditButton