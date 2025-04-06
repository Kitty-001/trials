import { Node } from 'react-flow-renderer';

export type CustomNodeData = {
  label: string;
};

export type CustomNode = Node<CustomNodeData>;