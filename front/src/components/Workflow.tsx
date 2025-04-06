import React, { useMemo, useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  ConnectionLineType,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { ReactFlowProvider } from '@xyflow/react';
import StartNode from './nodes/StartNode';
import EndNode from './nodes/EndNode';
import AddNodeButton from './AddButton'; // NEW: Custom Add Button
import { getEdgeCenter } from '../utils/nodeUtils'; // Import the utility function
import '@xyflow/react/dist/style.css';



// Define CustomNode types for type safety
type CustomNodeData = {
  label: string; // Add label to data
};

type CustomNode = Node<CustomNodeData>;

const initialNodes: CustomNode[] = [
  {
    id: '1',
    type: 'start',
    position: { x: 100, y: 100 },
    data: { label: 'Start' }, // Initial label
  },
  {
    id: '2',
    type: 'end',
    position: { x: 400, y: 100 },
    data: { label: 'END' }, // Initial label
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' }, // Initial edge
];

const nodeTypes = {
  start: StartNode,
  end: EndNode,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params }, eds)
      ),
    [setEdges],
  );

  const handleAddNode = useCallback(() => {
    // Placeholder for Level 2 functionality
    alert('Add Node Clicked (Level 2 functionality)');
  }, []);

  // Calculate the edge center dynamically using the utility function
  const edgeCenter = useMemo(() => {
    return getEdgeCenter(nodes, 'start', 'end'); // Use the utility function
  }, [nodes]);

  console.log('edgeCenter:', edgeCenter); // Add this line
  // return (
  // <div style={{ width: '100%', height: '100%' }}></div>
  
  return (
    // <ReactFlowProvider>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Background />
          <MiniMap />
          <Controls />
          {/* Uncomment this block to include the AddNodeButton */}
          {/* {edgeCenter && (
            <foreignObject
              x={edgeCenter.x - 15}
              y={edgeCenter.y - 15}
              width="30px"
              height="30px"
            >
              <AddNodeButton onAdd={handleAddNode} />
            </foreignObject>
          )} */}
        </ReactFlow>
      </div>
    // </ReactFlowProvider>
  );
};

export default Workflow;
