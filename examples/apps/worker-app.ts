import { Worker } from "../../lib";
import { messenger } from "../messenger";

const { channel: channelPool } = messenger.init();

const config = {
  queue: "my_queue",
  channelPool,
};

const worker = new Worker(config);

worker.consume((msg) => console.log(msg));
