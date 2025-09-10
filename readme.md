# Temporal Worker Thread Heartbeat Test

This project demonstrates using the Temporal **AsyncCompletionClient** to send heartbeats from a **separate worker thread** within a Temporal activity.

While exploring this approach, an issue was encountered: the activity would fail with a **heartbeat timeout**, even after returning successfully.

The discussion of this issue can be found here: [Temporal Slack Thread](https://temporalio.slack.com/archives/C01DKSMU94L/p1757355660656899)

## Getting Started

1. Install dependencies:  
   ```bash
   npm install
   ```
2. Start the Temporal server:
   ```bash
   temporal server start-dev
   ``` 
3. Run the worker:
   ```bash
   npm run dev
   ``` 
4. Start a workflow:
   ```bash
   ts-node src/client.ts
   ``` 

## Resoution 
The heartbeat timeout issue was resolved by instantiating the AsyncCompletionClient inside the activity and using it to mark the activity as complete:
   ```
   await client.complete(taskToken, {});
   ``` 
