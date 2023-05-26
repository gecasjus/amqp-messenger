// worker retry mechanism https://support.huaweicloud.com/intl/en-us/bestpractice-rabbitmq/rabbitmq-bestpractice.pdf

import { ConsumeMessage, Channel } from "amqplib";
import { WorkerConfiguration } from "./worker-configuration";

type MessageConsumedCallback = (msg: ConsumeMessage | null) => void;

export class Worker {
  // worker identification
  private consumerTag: string;

  constructor(private readonly configuration: WorkerConfiguration) {}

  async consume(callback: MessageConsumedCallback) {
    const { queue, channelPool, options } = this.configuration;

    channelPool.use(async (channel) => {
      const { consumerTag } = await channel.consume(
        queue,
        (msg) => {
          this.onMessage(msg, channel, callback);
        },
        options
      );

      this.consumerTag = consumerTag;
    });
  }

  close() {
    const { channelPool } = this.configuration;

    channelPool.use((channel) => channel.cancel(this.consumerTag));
  }

  private onMessage(
    msg: ConsumeMessage | null,
    channel: Channel,
    callback: MessageConsumedCallback
  ) {
    try {
      if (msg) {
        // TODO: Serialize msg
        callback(msg);
        channel.ack(msg);
      }
    } catch (error: unknown) {
      console.log(error);
      msg && channel.nack(msg);
    }
  }
}
