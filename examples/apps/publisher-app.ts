import { Publisher } from "../../lib";
import { messenger } from "../messenger";

const { transport } = messenger.init();

const config = {
  exchange: "my_exchange",
  routingKey: "my_routing.key",
  type: "direct",
  transport,
};

const publisher = new Publisher(config);

publisher.publish("my message");
