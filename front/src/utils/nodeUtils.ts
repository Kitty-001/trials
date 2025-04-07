// src/utils/nodeUtils.ts
import { Node } from '@xyflow/react';
import { Edge } from 'reactflow';

export const getEdgeCenter = (nodes: Node[], edge: Edge) => {
  const sourceNode = nodes.find((node) => node.id === edge.source);
  const targetNode = nodes.find((node) => node.id === edge.target);

  if (sourceNode && targetNode) {
    const x = (sourceNode.position.x + targetNode.position.x) / 2;
    const y = (sourceNode.position.y + targetNode.position.y) / 2;
    return { x, y };
  }

  return { x: 0, y: 0 }; // Default position
};

