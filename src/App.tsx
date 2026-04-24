
import { WorkflowCanvas } from './components/Canvas/WorkflowCanvas';
import { NodeSidebar } from './components/Sidebar/NodeSidebar';
import { NodeFormPanel } from './components/PropertiesPanel/NodeFormPanel';
import { SandboxPanel } from './components/Sandbox/SandboxPanel';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
      </header>
      <main className="app-main">
        <NodeSidebar />
        <div className="canvas-container">
          <WorkflowCanvas />
        </div>
        <div className="right-panel">
          <NodeFormPanel />
          <SandboxPanel />
        </div>
      </main>
    </div>
  );
}

export default App;
