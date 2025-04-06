import React from 'react';

type AddNodeButtonProps = {
  onAdd: () => void;
};

const AddNodeButton = ({ onAdd }: AddNodeButtonProps) => {
  return (
    <button
      onClick={onAdd}
      style={{
        backgroundColor: 'white',
        border: '2px solid #3498db',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5em',
        color: '#3498db',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      +
    </button>
  );
};

export default AddNodeButton;