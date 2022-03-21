import PinoPretty from "pino-pretty";
import type { PrettyOptions } from "pino-pretty";

const pinoStream = (opts: PrettyOptions) => PinoPretty(opts);
export = pinoStream;
