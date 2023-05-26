export interface ConnectionConfiguration {
  URI: string;
  appId: string;
  connectionID: string;
  sleepOnErrorInterval: number;
  heartbeat: number;
  connectionTimeout: number;
  channelPoolSize: number;
}
