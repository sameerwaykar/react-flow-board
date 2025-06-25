// src/components/CanvasArea.jsx
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Background
} from 'react-flow-renderer';

const CanvasArea = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const onConnect = useCallback((connection) => {
    const source = nodes.find(n => n.id === connection.source);
    const target = nodes.find(n => n.id === connection.target);

    if (source?.data?.type === 'blockA' && target?.data?.type === 'blockB') {
      setEdges((eds) => addEdge(connection, eds));
    } else {
      alert('Only Block A ➝ Block B connections allowed!');
    }
  }, [nodes]);

  const onDrop = (e) => {
    e.preventDefault();
    const bounds = e.target.getBoundingClientRect();
    const block = JSON.parse(e.dataTransfer.getData('block-type'));

    const newNode = {
      id: `${+new Date()}`,
      position: {
        x: e.clientX - bounds.left,
        y: e.clientY - bounds.top
      },
      data: {
        label: block.label,
        type: block.type
      },
      type: 'default'
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <div
      className="canvas-area"
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={closeContextMenu} // click anywhere to close context menu
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeContextMenu={onNodeContextMenu}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{
            position: 'absolute',
            top: contextMenu.y,
            left: contextMenu.x,
            background: '#fff',
            padding: '8px 12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}
        >
          Hello World
        </div>
      )}
    </div>
  );
};

export default CanvasArea;
