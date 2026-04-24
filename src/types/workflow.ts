import { Node, Edge } from '@xyflow/react';

export type WorkflowNodeType =
  | 'startNode'
  | 'taskNode'
  | 'approvalNode'
  | 'automatedStepNode'
  | 'endNode';

export interface StartNodeData extends Record<string, any> {
  title: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends Record<string, any> {
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends Record<string, any> {
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomatedStepNodeData extends Record<string, any> {
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

export interface EndNodeData extends Record<string, any> {
  endMessage: string;
  summaryFlag: boolean;
}

export type WorkflowNodeData = 
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

export type AppNode = Node<WorkflowNodeData, WorkflowNodeType>;
export type AppEdge = Edge;

export interface WorkflowDefinition {
  nodes: AppNode[];
  edges: AppEdge[];
}
