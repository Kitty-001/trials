import React from 'react';
import { Edge, Node } from 'reactflow';
import { getEdgeCenter } from '../utils/nodeUtils';

interface AddButtonProps {
  edge: Edge;
  // nodes: { id: string; position: { x: number; y: number } }[]; // Nodes array
  nodes: Node<any>[];
  onAdd: (edge: Edge) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ edge, onAdd }) => {
  return (
    <div >
      <button
        onClick={() => onAdd(edge)}
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
    </div>
  );
};

export default AddButton;
