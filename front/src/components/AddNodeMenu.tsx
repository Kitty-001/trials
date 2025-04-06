// src/components/AddNodeMenu.tsx
import React from 'react';

type AddNodeMenuProps = {
  onAdd: () => void;
};

const AddNodeMenu = ({ onAdd }: AddNodeMenuProps) => {
  return <button onClick={onAdd}>Add</button>;
};

export default AddNodeMenu;