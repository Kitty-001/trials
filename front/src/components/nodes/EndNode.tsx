// src/components/nodes/EndNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CustomNode } from './CustomNode';
import './EndNode.css'; // Import the new CSS file

const EndNode = ({ data }: { data: CustomNode['data'] }) => {
  return (
    <div className="end-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
      />
      <div className="end-node__title">END</div>
      <Handle
        type="target"
        position={Position.Bottom}
        isConnectable={true}
      />
    </div>
  );
};

export default EndNode;