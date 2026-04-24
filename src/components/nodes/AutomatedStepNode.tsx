import { Handle, Position } from '@xyflow/react';
import { Settings, Zap, ArrowRight, Eye } from 'lucide-react';
import { AutomatedStepNodeData } from '../../types/workflow';

export const AutomatedStepNode = ({ data, selected }: { data: AutomatedStepNodeData, selected?: boolean }) => {
  return (
    <div className={`workflow-node automated-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <div className="node-header">
        <Settings size={16} />
        <span>{(data as AutomatedStepNodeData).title}</span>
      </div>
      <div className="node-content">
        {data.actionId ? (
          <div className="node-badge action">{data.actionId}</div>
        ) : (
          <span className="placeholder" style={{color: '#94a3b8'}}>No action configured</span>
        )}
        <div className="node-metrics">
          <div className="metric-badge purple"><Eye size={12} /> 15</div>
          <div className="metric-badge blue"><ArrowRight size={12} /> 55</div>
          <div className="metric-badge green"><Zap size={12} /> 69</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};