import { parentPort } from "worker_threads";
import { AsyncCompletionClient } from "@temporalio/client";

type Msg = {
  taskToken: Uint8Array;
};

const startHeartbeat = async ({ taskToken }: Msg) => {
  const client = new AsyncCompletionClient();

  const currentInterval = setInterval(async () => {
    try {
      await client.heartbeat(taskToken);
    } catch (err) {
      clearInterval(currentInterval);
    }
  }, 5000);
};

parentPort!.on("message", (msg: Msg) => {
    startHeartbeat(msg)
      .catch((err) => console.log("error starting heartbeat", err));
});
