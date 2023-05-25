import { resolve } from "path";
import { Messenger } from "../lib";
import { Configuration } from "../lib/configuration";
import { readAndParseJSON } from "../lib/parser";

const { connection, topology } = readAndParseJSON(
  resolve(__dirname, "configuration.json")
) as ReturnType<() => Configuration>;

export const messenger = new Messenger({
  connection,
  topology,
});
