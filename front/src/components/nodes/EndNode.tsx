// src/components/nodes/EndNode.tsx
import React from 'react';
import { CustomNode } from './CustomNode';
import './EndNode.css'; // Import the new CSS file

const EndNode = ({ data }: { data: CustomNode['data'] }) => {
  return (
    <div className="end-node">
      <div className="end-node__title">END</div>
    </div>
  );
};

export default EndNode;