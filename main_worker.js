import { Worker } from "worker_threads";

for (let i = 0; i < 4; i++) {
  const worker = new Worker("./worker_task.js");
  worker.on("message", (msg) => {
    console.log(`Worker ${i + 1}: ${msg.bentuk} = ${msg.hasil}`);
  });
}
