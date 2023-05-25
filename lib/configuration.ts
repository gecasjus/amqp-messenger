import { ConnectionConfiguration } from "./connection/connection-configuration";
import { Topology } from "./topologer";

export interface Configuration {
  connection: ConnectionConfiguration;
  topology: Topology;
}
