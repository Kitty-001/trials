import React, { useState } from 'react';

interface ActionNodeFormProps {
  nodeName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
}

const ActionNodeForm: React.FC<ActionNodeFormProps> = ({
  nodeName,
  onClose,
  onRename,
  onDelete,
}) => {
  const [newName, setNewName] = useState(nodeName);

  if (!nodeName || !onRename || !onDelete || !onClose) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px 40px', // Equal padding on all sides
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          width: '320px',
        }}
      >
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Edit Action Node</h3>

        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="node-name"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Node Name:
          </label>
          <input
            id="node-name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center', // Center the buttons
            gap: '10px', // Add spacing between buttons
            marginTop: '20px',
          }}
        >
          <button
            onClick={() => {
              onRename(newName);
              onClose();
            }}
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Delete
          </button>
        </div>

        <button
          onClick={onClose}
          style={{
            display: 'block',
            margin: '20px auto 0', // Center the cancel button and align spacing
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%', // Fill the width for a full look
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ActionNodeForm;
