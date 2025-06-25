import React from 'react';
import BlockPanel from './components/BlockPanel';
import CanvasArea from './components/CanvasArea';
import './App.css';
import 'react-flow-renderer/dist/style.css'

const App = () => {
  return (
    <div className="app">
      <CanvasArea />
      <BlockPanel />
    </div>
  );
};

export default App;
