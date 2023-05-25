export interface Envelope {
  exchange: string;
  routingKey: string;
  timestamp: number;
  appId?: string;
  correlationId?: string;
}

export class Letter {
  constructor(
    readonly id: string,
    readonly body: Buffer,
    readonly envelope: Envelope
  ) {}
}
