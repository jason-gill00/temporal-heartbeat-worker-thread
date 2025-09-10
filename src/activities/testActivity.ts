import { activityInfo } from "@temporalio/activity";
import { Worker } from "worker_threads";
import { AsyncCompletionClient } from "@temporalio/client";

export const testActivity = async () => {
  const taskToken = activityInfo().taskToken;
  const client = new AsyncCompletionClient();

  const worker = new Worker(require.resolve('./heartbeatWorker'));
  
  try {
    worker.postMessage({ taskToken });
    await new Promise((r) => setTimeout(r, 30000));
    // Adding the line below fixes the heartbeat timeout failure
    // await client.complete(taskToken, "done");
    return { result: "done" };
  } finally {
    await worker.terminate();
  }
};
