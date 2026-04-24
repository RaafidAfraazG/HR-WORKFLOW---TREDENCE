import { Handle, Position } from '@xyflow/react';
import { User, Eye, Star, CheckCircle2, Zap } from 'lucide-react';
import { TaskNodeData } from '../../types/workflow';

export const TaskNode = ({ data, selected }: { data: TaskNodeData, selected?: boolean }) => {
  return (
    <div className={`workflow-node task-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <div className="node-header">
        <User size={16} />
        <span>{(data as TaskNodeData).title}</span>
      </div>
      <div className="node-content">
        {data.assignee ? <div className="node-badge assignee">{data.assignee}</div> : <span style={{color: '#94a3b8'}}>Unassigned</span>}
        <div className="node-metrics">
          <div className="metric-badge purple"><Eye size={12} /> 11</div>
          <div className="metric-badge red"><Star size={12} /> 27</div>
          <div className="metric-badge green"><CheckCircle2 size={12} /> 41</div>
          <div className="metric-badge blue"><Zap size={12} /> 72</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};