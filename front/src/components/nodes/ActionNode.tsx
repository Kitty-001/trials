import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CustomNode } from './CustomNode';
import './ActionNode.css'; // Import a CSS file for styling

interface ActionNodeProps {
  data: CustomNode['data'];
  id: string;
  onActionClick: (node: { id: string; data: CustomNode['data'] }) => void; // Pass this handler
}

const ActionNode: React.FC<ActionNodeProps> = ({ data, id, onActionClick }) => {
  return (
    <div
      className="action-node"
      onClick={() => onActionClick({ id, data })} // Trigger the modal
      style={{
        cursor: 'pointer', // Ensure the node appears clickable
        userSelect: 'none', // Prevent text selection when clicked
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
      />
      <div className="action-node__title">Action Node</div>
      <div className="action-node__label">{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={true}
      />
    </div>
  );
};

export default ActionNode;
