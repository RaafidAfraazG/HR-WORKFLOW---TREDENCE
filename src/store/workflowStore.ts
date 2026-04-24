import { create } from 'zustand';
import { 
  Connection, 
  EdgeChange, 
  NodeChange, 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges,
  XYPosition
} from '@xyflow/react';
import { AppNode, AppEdge, WorkflowNodeData, WorkflowNodeType } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

interface WorkflowState {
  nodes: AppNode[];
  edges: AppEdge[];
  selectedNodeId: string | null;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: WorkflowNodeType, position: XYPosition) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  setSelectedNodeId: (id: string | null) => void;
  deleteNode: (id: string) => void;
}

const initialNodes: AppNode[] = [
  {
    id: 'start-1',
    type: 'startNode',
    position: { x: 250, y: 100 },
    data: { title: 'Start', metadata: {} },
  }
];

const getDefaultDataForType = (type: WorkflowNodeType): WorkflowNodeData => {
  switch (type) {
    case 'startNode':
      return { title: 'Start Workflow', metadata: {} };
    case 'taskNode':
      return { title: 'New Task', description: '', assignee: '', dueDate: '', customFields: {} };
    case 'approvalNode':
      return { title: 'Pending Approval', approverRole: 'Manager', autoApproveThreshold: 0 };
    case 'automatedStepNode':
      return { title: 'Automated Action', actionId: '', actionParams: {} };
    case 'endNode':
      return { title: 'End Workflow', endMessage: 'Process Completed', summaryFlag: true };
    default:
      return { title: 'Unknown' } as any;
  }
};

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: [],
  selectedNodeId: null,
  
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as AppNode[],
    });
  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as AppEdge[],
    });
  },
  
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges) as AppEdge[],
    });
  },
  
  addNode: (type: WorkflowNodeType, position: XYPosition) => {
    const newNode: AppNode = {
      id: `${type}-${uuidv4()}`,
      type,
      position,
      data: getDefaultDataForType(type),
    };
    
    set({
      nodes: [...get().nodes, newNode],
    });
  },
  
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      }),
    });
  },
  
  setSelectedNodeId: (id: string | null) => {
    set({ selectedNodeId: id });
  },

  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId
    });
  }
}));
