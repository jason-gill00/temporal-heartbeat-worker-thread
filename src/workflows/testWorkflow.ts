import { proxyActivities } from "@temporalio/workflow";
import type * as activities from "../activities/testActivity";

const { testActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: "10m",
  heartbeatTimeout: "20s",
  retry: {
    maximumAttempts: 1,
  }
});

export async function testWorkflow() {
  const result= await testActivity();
  console.log("Activity result:", result);
}
