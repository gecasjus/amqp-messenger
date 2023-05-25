export interface ConnectionConfiguration {
  URI: string;
  AppId: string;
  connectionID: string;
  sleepOnErrorInterval: number;
  heartbeat: number;
  connectionTimeout: number;
  channelPoolSize: number;
}
