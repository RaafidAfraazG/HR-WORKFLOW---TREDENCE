import type { WorkflowNodeType } from '../../types/workflow';
import { LayoutDashboard, CheckCircle, Calendar, BarChart2, Zap, GitBranch, Network, Play, User, CheckSquare, Settings, Square } from 'lucide-react';

export const NodeSidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: WorkflowNodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>General</h3>
        <ul className="sidebar-nav">
          <li className="active"><LayoutDashboard size={16} /> Dashboard</li>
          <li><CheckCircle size={16} /> Compliance</li>
          <li><Calendar size={16} /> Scheduler <span className="nav-badge">11</span></li>
          <li><BarChart2 size={16} /> Analytics</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Automation</h3>
        <ul className="sidebar-nav">
          <li><Zap size={16} /> Integrations</li>
          <li><GitBranch size={16} /> Repository <span className="nav-badge">7</span></li>
          <li className="active-sub"><Network size={16} /> Workflows</li>
        </ul>
      </div>
      
      <div className="sidebar-section nodes-section">
        <h3>Drag Nodes</h3>
        <div className="nodes-list">
          <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'startNode')} draggable>
            <Play size={14} className="node-icon" style={{color: 'var(--node-start)'}} /> Start Node
          </div>
          <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'taskNode')} draggable>
            <User size={14} className="node-icon" style={{color: 'var(--node-task)'}} /> Task Node
          </div>
          <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'approvalNode')} draggable>
            <CheckSquare size={14} className="node-icon" style={{color: 'var(--node-approval)'}} /> Approval Node
          </div>
          <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'automatedStepNode')} draggable>
            <Settings size={14} className="node-icon" style={{color: 'var(--node-automated)'}} /> Automated Step
          </div>
          <div className="dnd-node" onDragStart={(event) => onDragStart(event, 'endNode')} draggable>
            <Square size={14} className="node-icon" style={{color: 'var(--node-end)'}} /> End Node
          </div>
        </div>
      </div>
    </aside>
  );
};