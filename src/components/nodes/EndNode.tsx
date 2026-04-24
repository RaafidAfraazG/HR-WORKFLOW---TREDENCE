import { Handle, Position } from '@xyflow/react';
import { Square } from 'lucide-react';
import { EndNodeData } from '../../types/workflow';

export const EndNode = ({ data, selected }: { data: EndNodeData, selected?: boolean }) => {
  return (
    <div className={`workflow-node pill-node end-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <div className="node-header">
        <Square size={16} />
        <span>{(data as EndNodeData).title}</span>
      </div>
    </div>
  );
};