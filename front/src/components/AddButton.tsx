import React from 'react';
import { Edge } from 'reactflow';

interface AddButtonProps {
  edge: Edge;
  onAdd: (sourceId: string, targetId: string) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ edge, onAdd }) => {
  const edgeCenter = (source: { x: number; y: number }, target: { x: number; y: number }) => ({
    x: (source.x + target.x) / 2,
    y: (source.y + target.y) / 2,
  });

  const source = { x: 0, y: 0 }; // Replace with logic to find the source position
  const target = { x: 100, y: 100 }; // Replace with logic to find the target position

  const center = edgeCenter(source, target);

  return (
    <foreignObject x={center.x - 15} y={center.y - 15} width="30px" height="30px">
      <button onClick={() => onAdd(edge.source, edge.target)}>+</button>
    </foreignObject>
  );
};

export default AddButton;
