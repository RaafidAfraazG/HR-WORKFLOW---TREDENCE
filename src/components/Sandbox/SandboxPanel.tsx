import { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { simulateWorkflow, SimulationResult } from '../../api/mockApi';

export const SandboxPanel = () => {
  const { nodes, edges } = useWorkflowStore();
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const simResult = await simulateWorkflow({ nodes, edges });
      setResult(simResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sandbox-panel">
      <div className="panel-header">
        <h3>Workflow Sandbox</h3>
      </div>
      <div className="panel-body">
        <button 
          className="btn-simulate" 
          onClick={handleSimulate}
          disabled={loading}
        >
          {loading ? 'Simulating...' : 'Run Simulation'}
        </button>

        {result && (
          <div className={`simulation-result ${result.success ? 'success' : 'error'}`}>
            <h4>Status: {result.success ? 'Success' : 'Failed'}</h4>
            
            {result.errors.length > 0 && (
              <div className="errors">
                <h5>Errors:</h5>
                <ul>
                  {result.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.logs.length > 0 && (
              <div className="logs">
                <h5>Execution Log:</h5>
                <ul>
                  {result.logs.map((log, i) => (
                    <li key={i}>{log}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
