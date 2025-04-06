import React from 'react';
import Workflow from './components/Workflow';
import './styles.css';
import { ReactFlowProvider } from '@xyflow/react';

function App() {
  return (
    <div className="App">
      <div style={{ width: '800px', height: '600px', border: '1px solid #ccc' }}>
        <ReactFlowProvider>
          <Workflow />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;
