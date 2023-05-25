import { Options } from "amqplib";
import { Transport } from "../transport/transport";

export interface PublisherConfiguration {
  exchange: string;
  routingKey: string;
  type: string;
  options?: Options.AssertExchange;
  transport: Transport;
}
