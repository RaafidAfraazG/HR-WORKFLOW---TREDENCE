import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';
import { StartNodeData } from '../../types/workflow';

export const StartNode = ({ data, selected }: { data: StartNodeData, selected?: boolean }) => {
  return (
    <div className={`workflow-node pill-node start-node ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        <Play size={16} />
        <span>{(data as StartNodeData).title}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};