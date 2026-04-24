import { Handle, Position } from '@xyflow/react';
import { CheckSquare, AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { ApprovalNodeData } from '../../types/workflow';

export const ApprovalNode = ({ data, selected }: { data: ApprovalNodeData, selected?: boolean }) => {
  return (
    <div className={`workflow-node approval-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="node-handle" />
      <div className="node-header">
        <CheckSquare size={16} />
        <span>{(data as ApprovalNodeData).title}</span>
      </div>
      <div className="node-content">
        <div className="node-badge approver">{data.approverRole || 'Unassigned Role'}</div>
        <div className="node-metrics">
          <div className="metric-badge red"><AlertCircle size={12} /> 18</div>
          <div className="metric-badge green"><CheckCircle2 size={12} /> 20</div>
          <div className="metric-badge blue"><Zap size={12} /> 21</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="node-handle" />
    </div>
  );
};