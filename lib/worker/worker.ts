import { ConsumeMessage, Channel } from "amqplib";
import { WorkerConfiguration } from "./worker-configuration";

type MessageConsumeCallback = (msg: ConsumeMessage | null) => void;

export class Worker {
  // worker identification
  private consumerTag: string;
  private defaultPrefetch = 1;

  constructor(private readonly configuration: WorkerConfiguration) {}

  async consume(callback: MessageConsumeCallback) {
    const { queue, channelPool, options, prefetch } = this.configuration;

    channelPool.use(async (channel) => {
      channel.prefetch(prefetch ?? this.defaultPrefetch);

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
    callback: MessageConsumeCallback
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
