import { Options } from "amqplib";
import { ChannelPool } from "../pools/channel-pool";

export interface WorkerConfiguration {
  queue: string;
  options?: Options.Consume;
  channelPool: ChannelPool;
}
