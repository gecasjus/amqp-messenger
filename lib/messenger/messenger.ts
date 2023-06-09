import { Connection } from "../connection/connection";
import { ChannelPool } from "../pools/channel-pool";
import { Topologer } from "../topologer";
import { Transport } from "../transport/transport";
import { MessengerConfiguration } from "./messenger-configuration";

interface IMessenger {
  channel: ChannelPool;
  transport: Transport;
}

export class Messenger {
  constructor(private configuration: MessengerConfiguration) {}

  // Returns channel pool and transport used for worker and publisher
  init(): ReturnType<() => IMessenger> {
    const { connection, topology } = this.configuration;

    const { channel } = new Connection(connection);
    const transport = new Transport({ channelPool: channel });

    new Topologer(topology).build(channel);

    return {
      channel,
      transport,
    };
  }
}
