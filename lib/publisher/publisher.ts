import { Letter } from "../letter";
import { PublisherConfiguration } from "./publisher-configuration";
const crypto = require("crypto");  //eslint-disable-line

export class Publisher {
  private id: string;

  constructor(private readonly configuration: PublisherConfiguration) {
    this.id = crypto.randomUUID();
  }

  publish(body: string) {
    const { exchange, routingKey, transport } = this.configuration;

    const convertedBody = Buffer.from(body);

    transport.send(
      new Letter(this.id, convertedBody, {
        exchange,
        routingKey,
        timestamp: new Date().getTime(),
      })
    );
  }
}
