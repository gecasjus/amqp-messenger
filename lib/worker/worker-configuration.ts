import { Options } from "amqplib";
import { ChannelPool } from "../pools/channel-pool";

export interface WorkerConfiguration {
  queue: string;
  channelPool: ChannelPool;
  prefetch?: number;
  options?: Options.Consume;
}
