# React Flow Workflow Editor

A simple workflow editor built using React and the React Flow library. This application allows users to create and manipulate nodes and edges, add new action nodes to edges, change the name of action nodes, and delete action nodes.

## Table of Contents

- [React Flow Workflow Editor](#react-flow-workflow-editor)
  - [Table of Contents](#table-of-contents)
  - [Setup](#setup)
  - [Key Features](#key-features)
  - [Assumptions](#assumptions)
  - [Challenges and Resolutions](#challenges-and-resolutions)

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kitty-001/trials.git
   cd front
   ```

2. **Install dependencies:**   
    Make sure you have Node.js and npm (or yarn) installed on your system. Navigate to the project directory in your terminal and run:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the Application:**     
   ```bash
   npm start
   # or
   yarn start
   ```
   The application should automatically open in your web browser, usually at http://localhost:3000. If it doesn't open automatically, navigate to this URL in your browser.

## Key Features
- Node Creation: Includes three basic node types:
    - Start Node: Represents the beginning of a workflow.
    - End Node: Represents the termination of a workflow.
    - Action Node: Represents a processing step in the workflow, with an editable label.
  - Edge Connection: Allows connecting nodes by dragging from the output handle of one node to the input handle of another, creating custom edges.
  - Add Action Node to Edge: Clicking the "+" button that appears on an existing edge inserts a new Action Node onto that edge, splitting the original connection into two new edges.
  - Change Action Node Name: Double-clicking an Action Node allows for in-place editing of its label. The changes are saved when the input loses focus or when the Enter key is pressed.
  - Delete Action Node: Selecting an Action Node (by single-clicking it) reveals a small "X" button. Clicking this button removes the Action Node and any edges directly connected to it.
  - Node Dragging: Users can click and drag nodes to reposition them on the workflow canvas.
  - Zoom and Pan: The React Flow library provides built-in zoom and pan functionality for navigating the workflow.

## Assumptions
1. React Development Environment: It is assumed that anyone setting up this application has a basic understanding of React and has a working Node.js and npm/yarn development environment configured.
2. Modern Web Browser: The application is designed to run on modern web browsers that support ES6+ JavaScript features and basic web APIs.
3. Simplified Workflow Logic: This editor focuses on the visual manipulation of nodes and edges. It does not implement any specific workflow execution logic or data processing.
4. Front-End Only: This is a purely front-end application. Workflow data is not persisted across sessions unless explicitly implemented (e.g., using local storage or a backend).

## Challenges and Resolutions
During the development of this workflow editor, several challenges were encountered and addressed:

- Implementing the "Add Node to Edge" Functionality:

    - Challenge: Determining the precise position to insert the new node on the edge and correctly splitting the existing edge into two new connections while maintaining the flow.
    - Resolution: The getEdgeCenter utility function was used to calculate the midpoint of the edge. When the "+" button is clicked, a new Action Node is created at this position. The original edge is then removed, and two new edges are created, connecting the original source node to the new node and the new node to the original target node.
  
- Ensuring Dynamic Updates with React Flow State:

    - Challenge: Making sure that changes to nodes (like label edits or deletion) and edges (creation, deletion) were correctly reflected in the React Flow UI and the underlying state managed by useNodesState and useEdgesState.
    - Resolution: Utilizing the setNodes and setEdges state update functions provided by the useNodesState and useEdgesState hooks, ensuring that state updates were performed immutably by creating new arrays or objects based on the previous state. The onNodesChange handler was used for position updates.

- Addressing TypeScript Type Compatibility with Custom Nodes:

    - Challenge: Encountering TypeScript errors related to the nodeTypes prop of the ReactFlow component, specifically with the custom ActionNode component not being fully compatible with the expected NodeTypes interface.
    - Resolution: The ActionNode component's props interface (ActionNodeProps) was explicitly extended from NodeProps from @xyflow/react. This ensured that the custom node component was guaranteed to receive all the standard properties that React Flow provides to its node renderers, resolving the type mismatch.

- Designing the User Interaction for Editing and Deleting Action Nodes:

    - Challenge: Deciding on the most intuitive and efficient way for users to modify and remove Action Nodes.
    - Resolution: A hybrid approach was implemented. Double-clicking was chosen for quick, in-place editing of the node label. Single-clicking selects the node, which then reveals a clearly visible "X" button for deletion. This balances direct editing with a deliberate action for removal.