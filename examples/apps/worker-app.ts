import { Worker, WorkerConfiguration } from "../../lib";
import { messenger } from "../messenger";

const { channel: channelPool } = messenger.init();

const config: WorkerConfiguration = {
  queue: "my_queue",
  channelPool,
  options: {
    noAck: false,
  },
};

const worker = new Worker(config);

worker.consume((msg) => console.log(msg?.content.toString()));
