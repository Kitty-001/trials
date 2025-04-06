// src/App.jsx
import React from 'react';
import Workflow from './components/Workflow';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: '800px', height: '600px', border: '1px solid #ccc' }}>
        <Workflow />
      </div>
    </div>
  );
}

export default App;
