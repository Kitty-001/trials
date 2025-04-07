// src/components/nodes/ActionNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CustomNode } from './CustomNode';
import './ActionNode.css'; // Import a CSS file for styling

const ActionNode = ({ data }: { data: CustomNode['data'] }) => {
  return (
    <div className="action-node">
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
        // style={handleStyle}
        isConnectable={true}
      />
    </div>
  );
};

export default ActionNode;