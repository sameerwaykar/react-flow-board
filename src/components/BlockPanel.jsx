import React from 'react';
import { BLOCKS } from '../data/blocks';

const BlockPanel = () => {
  return (
    <div className="block-panel">
      <h4>Available Blocks</h4>
      {BLOCKS.map((block) => (
        <div
          key={block.id}
          className="block-item"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('block-type', JSON.stringify(block));
          }}
        >
          {block.label}
        </div>
      ))}
    </div>
  );
};

export default BlockPanel;
