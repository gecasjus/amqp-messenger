import { Letter } from "../letter";
import { TransportConfiguration } from "./transport-configuration";

export class Transport {
  constructor(private readonly configuration: TransportConfiguration) {}

  send(letter: Letter) {
    const { envelope, body } = letter;
    const { channelPool } = this.configuration;

    channelPool.use((channel) =>
      channel.publish(envelope.exchange, envelope.routingKey, body, {
        correlationId: envelope.correlationId,
        appId: envelope.appId,
        timestamp: envelope.timestamp,
      })
    );
  }
}
