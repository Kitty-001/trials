import React from 'react';
import { BaseEdge, Edge, EdgeLabelRenderer, getStraightPath } from '@xyflow/react';

interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  source: string;
  target: string;
  markerEnd?: string;
  style?: React.CSSProperties;
  onAdd?: (edge: Edge) => void;
}

const CustomEdge: React.FC<CustomEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  style,
  markerEnd,
  onAdd,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const onEdgeClick = () => {
    if (onAdd) {
      const currentEdge: Edge = {
        id: id,
        source: source,
        target: target,
        // You might need to include other properties of your Edge objects
        // such as type, animated, style, data, etc., if your handleAddNode
        // function relies on them.
        type: 'customEdge', // Or whatever the current edge type is
        // data: {}, // Add any relevant edge data if needed
      };
      onAdd(currentEdge);
    }
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
            backgroundColor: 'white',
            border: '2px solid rgb(52, 152, 219)',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5em',
            color: 'rgb(52, 152, 219)',
            cursor: 'pointer',
            outline: 'none',
          }}
          className="nodrag nopan"
          onClick={onEdgeClick}
        >
          +
        </button>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
