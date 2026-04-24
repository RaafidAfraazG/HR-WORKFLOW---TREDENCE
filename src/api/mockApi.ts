import { WorkflowDefinition } from '../types/workflow';

export interface AutomatedAction {
  id: string;
  label: string;
  params: string[];
}

const mockAutomatedActions: AutomatedAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'update_crm', label: 'Update CRM', params: ['entity', 'field', 'value'] },
  { id: 'slack_notify', label: 'Slack Notification', params: ['channel', 'message'] }
];

export const fetchAutomatedActions = async (): Promise<AutomatedAction[]> => {
  // Simulate network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomatedActions);
    }, 500);
  });
};

export interface SimulationResult {
  success: boolean;
  logs: string[];
  errors: string[];
}

export const simulateWorkflow = async (workflow: WorkflowDefinition): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const logs: string[] = [];
      const errors: string[] = [];
      
      const { nodes, edges } = workflow;
      
      if (nodes.length === 0) {
        errors.push('Workflow is empty.');
        resolve({ success: false, logs, errors });
        return;
      }

      // Check for start node
      const startNodes = nodes.filter(n => n.type === 'startNode');
      if (startNodes.length === 0) {
        errors.push('Workflow must have at least one Start Node.');
      } else if (startNodes.length > 1) {
        errors.push('Workflow should have exactly one Start Node.');
      }

      // Check for end node
      const endNodes = nodes.filter(n => n.type === 'endNode');
      if (endNodes.length === 0) {
        errors.push('Workflow must have at least one End Node.');
      }

      if (errors.length > 0) {
        resolve({ success: false, logs, errors });
        return;
      }

      // Basic linear simulation logic
      let currentNode = startNodes[0];
      const visited = new Set<string>();
      
      logs.push(`Started workflow execution at node: ${currentNode.data.title}`);
      
      while (currentNode) {
        if (visited.has(currentNode.id)) {
          errors.push(`Cycle detected at node: ${currentNode.data.title}`);
          break;
        }
        
        visited.add(currentNode.id);
        
        if (currentNode.type !== 'startNode') {
          logs.push(`Executed ${currentNode.type}: ${currentNode.data.title}`);
        }

        // Simulate logic per node type
        if (currentNode.type === 'approvalNode') {
          logs.push(`Waiting for approval from role: ${(currentNode.data as any).approverRole}`);
        } else if (currentNode.type === 'automatedStepNode') {
          logs.push(`Triggered automated action: ${(currentNode.data as any).actionId}`);
        }

        // Find next node
        const outgoingEdges = edges.filter(e => e.source === currentNode.id);
        
        if (outgoingEdges.length === 0) {
          if (currentNode.type !== 'endNode') {
            errors.push(`Workflow ended abruptly at node: ${currentNode.data.title} without an End Node.`);
          }
          break;
        }
        
        // For simplicity in this mock, just take the first edge
        if (outgoingEdges.length > 1) {
          logs.push(`Node ${currentNode.data.title} has multiple outgoing edges. Taking the first one for simulation.`);
        }
        
        const nextNodeId = outgoingEdges[0].target;
        currentNode = nodes.find(n => n.id === nextNodeId) as any;
      }
      
      resolve({ success: errors.length === 0, logs, errors });
    }, 1000);
  });
};
