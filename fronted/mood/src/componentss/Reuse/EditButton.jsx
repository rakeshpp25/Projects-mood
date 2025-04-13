import React from 'react';

function EditButton({ isEditing, onClick }) {
  return (
    <button
      type="button"
      style={{
        color: "#6439ff",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        background: "transparent",
        border: "none",
      }}
      onClick={onClick}
    >
      {isEditing ? "Cancel" : "Edit"}
    </button>
  );
}

export default EditButton;
