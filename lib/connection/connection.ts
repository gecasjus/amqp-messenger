import { Connection as AMQPConnection } from "amqplib";
import { ChannelPool } from "../pools/channel-pool";
import { ConnectionConfiguration } from "./connection-configuration";
import { ConnectionHost } from "./connection-host";

export class Connection {
  connection: Promise<AMQPConnection>;
  channel: ChannelPool;

  constructor(readonly configuration: ConnectionConfiguration) {
    const connectionHost = new ConnectionHost(configuration);

    this.connection = Promise.resolve(connectionHost.connect());

    this.channel = new ChannelPool({
      create: async () => {
        const connection = await this.connection;

        return connection.createChannel();
      },
      destroy: async (channel) => {
        await channel.close();
      },
      size: configuration.channelPoolSize,
    });
  }
}
