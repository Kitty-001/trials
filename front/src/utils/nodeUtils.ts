// src/utils/nodeUtils.ts
import { Node } from 'react-flow-renderer';

export const getEdgeCenter = (nodes: Node[], sourceNodeId: string, targetNodeId: string) => {
  const sourceNode = nodes.find((node) => node.id === sourceNodeId);
  const targetNode = nodes.find((node) => node.id === targetNodeId);

  if (sourceNode && targetNode) {
    const x = (sourceNode.position.x + targetNode.position.x) / 2;
    const y = (sourceNode.position.y + targetNode.position.y) / 2;
    return { x, y };
  }

  return { x: 0, y: 0 }; // Default position
};

export const edgeCenter = (
  source: { x: number; y: number },
  target: { x: number; y: number }
): { x: number; y: number } => ({
  x: (source.x + target.x) / 2,
  y: (source.y + target.y) / 2,
});
