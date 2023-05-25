import { ConnectionConfiguration } from "../connection/connection-configuration";
import { Topology } from "../topologer";

export interface MessengerConfiguration {
  connection: ConnectionConfiguration;
  topology: Topology;
}
