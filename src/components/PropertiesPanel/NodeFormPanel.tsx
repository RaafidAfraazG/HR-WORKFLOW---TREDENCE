import React, { useEffect, useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { fetchAutomatedActions, AutomatedAction } from '../../api/mockApi';
import { StartNodeData, TaskNodeData, ApprovalNodeData, AutomatedStepNodeData, EndNodeData } from '../../types/workflow';

export const NodeFormPanel = () => {
  const { nodes, selectedNodeId, updateNodeData, deleteNode } = useWorkflowStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const [actions, setActions] = useState<AutomatedAction[]>([]);

  useEffect(() => {
    if (selectedNode?.type === 'automatedStepNode') {
      fetchAutomatedActions().then(setActions);
    }
  }, [selectedNode?.type]);

  if (!selectedNode) {
    return (
      <div className="properties-panel empty">
        <p>Select a node to edit its properties</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let finalValue: string | number | boolean = value;
    
    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = parseFloat(value);
    }

    updateNodeData(selectedNode.id, { [name]: finalValue });
  };

  const renderStartNodeForm = () => (
    <>
      <div className="form-group">
        <label>Start Title</label>
        <input 
          type="text" 
          name="title" 
          value={(selectedNode.data as StartNodeData).title || ''} 
          onChange={handleChange} 
        />
      </div>
    </>
  );

  const renderTaskNodeForm = () => (
    <>
      <div className="form-group">
        <label>Title *</label>
        <input 
          type="text" 
          name="title" 
          required
          value={(selectedNode.data as TaskNodeData).title || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea 
          name="description" 
          value={(selectedNode.data as TaskNodeData).description || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>Assignee</label>
        <input 
          type="text" 
          name="assignee" 
          value={(selectedNode.data as TaskNodeData).assignee || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>Due Date</label>
        <input 
          type="date" 
          name="dueDate" 
          value={(selectedNode.data as TaskNodeData).dueDate || ''} 
          onChange={handleChange} 
        />
      </div>
    </>
  );

  const renderApprovalNodeForm = () => (
    <>
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={(selectedNode.data as ApprovalNodeData).title || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>Approver Role</label>
        <select 
          name="approverRole" 
          value={(selectedNode.data as ApprovalNodeData).approverRole || ''} 
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="Manager">Manager</option>
          <option value="HRBP">HRBP</option>
          <option value="Director">Director</option>
        </select>
      </div>
      <div className="form-group">
        <label>Auto-approve Threshold (Days)</label>
        <input 
          type="number" 
          name="autoApproveThreshold" 
          value={(selectedNode.data as ApprovalNodeData).autoApproveThreshold || 0} 
          onChange={handleChange} 
        />
      </div>
    </>
  );

  const renderAutomatedStepNodeForm = () => {
    const selectedAction = actions.find(a => a.id === (selectedNode.data as AutomatedStepNodeData).actionId);
    return (
      <>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            value={(selectedNode.data as AutomatedStepNodeData).title || ''} 
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label>Action</label>
          <select 
            name="actionId" 
            value={(selectedNode.data as AutomatedStepNodeData).actionId || ''} 
            onChange={handleChange}
          >
            <option value="">Select Action</option>
            {actions.map(action => (
              <option key={action.id} value={action.id}>{action.label}</option>
            ))}
          </select>
        </div>
        {selectedAction && selectedAction.params.length > 0 && (
          <div className="form-section">
            <h4>Action Parameters</h4>
            {selectedAction.params.map(param => {
              const currentParams = (selectedNode.data as AutomatedStepNodeData).actionParams || {};
              return (
                <div key={param} className="form-group">
                  <label>{param}</label>
                  <input
                    type="text"
                    value={currentParams[param] || ''}
                    onChange={(e) => {
                      updateNodeData(selectedNode.id, {
                        actionParams: {
                          ...currentParams,
                          [param]: e.target.value
                        }
                      });
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  const renderEndNodeForm = () => (
    <>
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          name="title" 
          value={(selectedNode.data as EndNodeData).title || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <label>End Message</label>
        <textarea 
          name="endMessage" 
          value={(selectedNode.data as EndNodeData).endMessage || ''} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group checkbox">
        <label>
          <input 
            type="checkbox" 
            name="summaryFlag" 
            checked={(selectedNode.data as EndNodeData).summaryFlag || false} 
            onChange={handleChange} 
          />
          Generate Summary
        </label>
      </div>
    </>
  );

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3>Edit Node</h3>
        <span className="node-type-badge">{selectedNode.type}</span>
      </div>
      <div className="panel-body">
        {selectedNode.type === 'startNode' && renderStartNodeForm()}
        {selectedNode.type === 'taskNode' && renderTaskNodeForm()}
        {selectedNode.type === 'approvalNode' && renderApprovalNodeForm()}
        {selectedNode.type === 'automatedStepNode' && renderAutomatedStepNodeForm()}
        {selectedNode.type === 'endNode' && renderEndNodeForm()}
      </div>
      <div className="panel-footer">
        <button className="btn-delete" onClick={() => deleteNode(selectedNode.id)}>
          Delete Node
        </button>
      </div>
    </div>
  );
};