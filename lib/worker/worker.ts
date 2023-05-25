// worker retry mechanism https://support.huaweicloud.com/intl/en-us/bestpractice-rabbitmq/rabbitmq-bestpractice.pdf

import { ConsumeMessage } from "amqplib";
import { WorkerConfiguration } from "./worker-configuration";
const crypto = require("crypto");  //eslint-disable-line

export class Worker {
  private readonly id: string;

  constructor(private readonly configuration: WorkerConfiguration) {
    this.id = crypto.randomUUID();
  }

  async consume(onMessage: (msg: ConsumeMessage | null) => void) {
    const { queue, channelPool, options } = this.configuration;

    channelPool.use(
      async (channel) => await channel.consume(queue, onMessage, options)
    );
  }
}
