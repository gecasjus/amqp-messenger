import { Channel } from "amqplib";
import { ChannelPool } from "./pools/channel-pool";

interface Exchange {
  name: string;
  type: string;
  durable: boolean;
}

interface Queue {
  name: string;
  durable: boolean;
  autoDelete: boolean;
  expires: number;
}

interface Binding {
  source: string;
  destination: string;
  routing_key: string;
}

export interface Topology {
  exchanges: Exchange[];
  queues: Queue[];
  bindings: Binding[];
}

export class Topologer {
  constructor(private readonly topology: Topology) {}

  public build(channel: ChannelPool) {
    const { exchanges, queues, bindings } = this.topology;

    channel.use(async (channel) => {
      await this.assertExchange(channel, exchanges);
      await this.assertQueues(channel, queues);
      await this.bindQueues(channel, bindings);
    });

    return this;
  }

  private async assertExchange(channel: Channel, exchanges: Exchange[]) {
    exchanges.forEach(async (exchange) => {
      channel.assertExchange(exchange.name, exchange.type, {
        durable: exchange.durable,
      });
    });
  }

  private async assertQueues(channel: Channel, queues: Queue[]) {
    queues.forEach(async (queue) => {
      await channel.assertQueue(queue.name, { durable: queue.durable });
    });
  }

  private async bindQueues(channel: Channel, bindings: Binding[]) {
    bindings.forEach(async (binding) => {
      await channel.bindQueue(
        binding.destination,
        binding.source,
        binding.routing_key
      );
    });
  }
}
