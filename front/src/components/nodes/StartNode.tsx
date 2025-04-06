// src/components/nodes/StartNode.tsx
import React from 'react';
import { CustomNode } from './CustomNode';
import './StartNode.css'; // Import a CSS file for styling

const StartNode = ({ data }: { data: CustomNode['data'] }) => {
  return (
    <div className="start-node">
      <div className="start-node__title">Start Node</div>
      <div className="start-node__label">{data.label}</div>
    </div>
  );
};

export default StartNode;