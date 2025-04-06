// src/components/Workflow.jsx
import React, { useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'react-flow-renderer';
import StartNode from './NodeTypes/StartNode';
import EndNode from './NodeTypes/EndNode';
import AddButton from './AddButton';

const initialNodes = [
  { id: 'start', type: 'start', position: { x: 50, y: 50 }, data: { label: 'Start' } },
  { id: 'end', type: 'end', position: { x: 250, y: 50 }, data: { label: 'END' } },
];

const initialEdges = [{ id: 'e1-2', source: 'start', target: 'end' }];

const nodeTypes = {
  start: StartNode,
  end: EndNode,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleAddNode = () => {
    // Basic logic for Level 1 - just reconnects to end
    setEdges([{ id: 'e1-2', source: 'start', target: 'end' }]);
  };

  return (
    <div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
      />
      <AddButton onClick={handleAddNode} />
    </div>
  );
};

export default Workflow;