import React, { useMemo, useState, useCallback } from 'react';
import {
  ReactFlow, 
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import StartNode from './nodes/StartNode';
import EndNode from './nodes/EndNode';
import CustomEdge from './CustomEdge';
import { getEdgeCenter } from '../utils/nodeUtils'; // Import the utility function
import '@xyflow/react/dist/style.css';
import ActionNode from './nodes/ActionNode';
import ActionNodeForm from './forms/ActionNodeForm';


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
    position: { x: 100, y: 400 },
    data: { label: 'END' }, // Initial label
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'customEdge' }, // Initial edge
];

const nodeTypes = {
  start: StartNode,
  end: EndNode,
  action: ActionNode,
};

const Workflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params }, eds)
      ),
    [setEdges],
  );

  // Handle node addition when "+" button is clicked
  const handleAddNode = useCallback((edge: Edge) => {
    const newNodeId = `node-${Date.now()}`;
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);

    if (!sourceNode || !targetNode) {
      console.error('Source or Target node not found');
      return;
    }

    const newNode: CustomNode = {
      id: newNodeId,
      type: 'action',
      position: getEdgeCenter(nodes, edge), // Dynamically position the new node
      data: { label: 'New Node' },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    setEdges((prevEdges) => [
      ...prevEdges.filter((e) => e.id !== edge.id), // Remove the old edge
      { id: `e${edge.source}-${newNodeId}`, source: edge.source, target: newNodeId, type: 'customEdge' },
      { id: `e${newNodeId}-${edge.target}`, source: newNodeId, target: edge.target, type: 'customEdge' },
    ]);
  }, [nodes, edges, setNodes, setEdges]);

  // Handle Action Node click to open the form
  const handleActionClick = (node: CustomNode) => {
    setSelectedNode(node); // Set the selected Action Node for editing
    setModalOpen(true); // Open the form modal
  };

  // Rename the selected Action Node
  const handleRenameNode = (newName: string) => {
    if (!selectedNode) return;

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label: newName } } : node
      )
    );
  };

  // Handle deleting a node and restoring the original edge
  const handleDeleteNode = () => {
    if (!selectedNode) return;

    // Find edges connected to the selected node
    const incomingEdge = edges.find((edge) => edge.target === selectedNode.id);
    const outgoingEdge = edges.find((edge) => edge.source === selectedNode.id);

    if (incomingEdge && outgoingEdge) {
      // Restore the original edge between the source of the incoming edge
      // and the target of the outgoing edge
      const restoredEdge: Edge = {
        id: `e${incomingEdge.source}-${outgoingEdge.target}`,
        source: incomingEdge.source,
        target: outgoingEdge.target,
        type: 'customEdge', // Ensure it uses the customEdge type
      };

      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
        ).concat(restoredEdge) // Add the restored edge
      );
    } else {
      // If no incoming or outgoing edges, just remove the node and edges
      setEdges((prevEdges) =>
        prevEdges.filter(
          (edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id
        )
      );
    }

    // Remove the node itself
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== selectedNode.id));

    // Close the modal
    setModalOpen(false);
  };


  const edgeTypes = useMemo(() => ({
    customEdge: (props: any) => <CustomEdge {...props} onAdd={handleAddNode} />, // Pass handleAddNode as a prop
  }), [handleAddNode]);

  const nodeTypes = useMemo(() => ({
    start: StartNode,
    end: EndNode,
    action: (props: any) => <ActionNode {...props} onActionClick={handleActionClick} />,
  }), [handleActionClick]);

  return (
    // <ReactFlowProvider>
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
      {modalOpen && selectedNode && (
        <ActionNodeForm
          nodeName={selectedNode.data.label}
          onClose={() => setModalOpen(false)}
          onRename={handleRenameNode}
          onDelete={handleDeleteNode}
        />
      )}
    </div>
    // </ReactFlowProvider>
  );
};

export default Workflow;
