import { Channel } from "amqplib";
import { Options } from "generic-pool";
import { Pool } from "../abstract-pool";

interface ChannePoolArgs {
  create: () => Promise<Channel>;
  destroy: (client: Channel) => Promise<void>;
  size: number;
}

export class ChannelPool extends Pool<Channel> {
  protected opts: Options;

  constructor(args: ChannePoolArgs) {
    super();

    const { size, create, destroy } = args;

    this.opts = {
      max: size,
      min: size,
    };

    this.fetch({ create, destroy });
  }

  public async get(): Promise<Channel> {
    return await this.getResource();
  }

  public use(onFulfilled: (resource: Channel) => void) {
    this.useResource(onFulfilled);
  }
}
