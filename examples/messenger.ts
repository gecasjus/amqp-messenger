import { resolve } from "path";
import { Messenger } from "../lib";
import { MessengerConfiguration } from "../lib/messenger/messenger-configuration";
import { readAndParseJSON } from "../lib/parser";

const { connection, topology } = readAndParseJSON(
  resolve(__dirname, "configuration.json")
) as ReturnType<() => MessengerConfiguration>;

export const messenger = new Messenger({
  connection,
  topology,
});
