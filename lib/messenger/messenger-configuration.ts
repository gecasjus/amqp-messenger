import { Configuration } from "../configuration";
import { Messenger } from "./messenger";

export class MessengerConfiguration {
  static configure(configuration: Configuration): Messenger {
    return new Messenger(configuration);
  }
}
