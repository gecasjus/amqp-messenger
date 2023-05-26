import { connect, Connection as AMQPConnection, Options } from "amqplib";
import { ConnectionConfiguration } from "./connection-configuration";

//
// Internal representation of amqlib.Connection
//
export class ConnectionHost {
  connection: AMQPConnection;
  error: unknown = null;

  private readonly URI: string;
  // TODO: unused
  private readonly connectionID: string;
  private readonly heartbeat: number;
  private readonly connectionTimeout: number;
  // TODO: implement TLS
  private readonly TLS: any;

  constructor(readonly configuration: ConnectionConfiguration) {
    this.URI = configuration.URI;
    this.connectionID = configuration.connectionID;
    this.heartbeat = configuration.heartbeat;
    this.connectionTimeout = configuration.connectionTimeout;
  }

  //   TODO: include TLS configuration
  private get connectionOptions(): Options.Connect {
    return {
      heartbeat: this.heartbeat,
    };
  }

  // TODO: implement error handler
  async connect() {
    try {
      this.connection = await connect(this.URI, this.connectionOptions);
    } catch (err: unknown) {
      this.error = err;
      console.error("AMQP connection error", err);
      setTimeout(this.connect, this.connectionTimeout);
    } finally {
      return this.connection;
    }
  }
}
