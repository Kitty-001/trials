// src/components/nodes/StartNode.tsx
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { CustomNode } from './CustomNode';
import './StartNode.css'; // Import a CSS file for styling

const StartNode = ({ data }: { data: CustomNode['data'] }) => {
  return (
    <div className="start-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
      />
      <div className="start-node__title">Start Node</div>
      <div className="start-node__label">{data.label}</div>
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

export default StartNode;