import { Connection, WorkflowClient } from "@temporalio/client";
import { testWorkflow } from "./workflows/testWorkflow";

async function run() {
  // Connect to local Temporal server
  const connection = await Connection.connect({ address: "localhost:7233" });
  const client = new WorkflowClient({ connection });

  // Start workflow
  const handle = await client.start(testWorkflow, {
    taskQueue: "heartbeat-test",
    workflowId: `test-workflow-${Date.now()}`
  });

  console.log(`Started workflow ${handle.workflowId}`);

  // Wait for workflow to complete
  const result = await handle.result();
  console.log("Workflow result:", result);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
