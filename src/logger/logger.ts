import pino from "pino";
import path from "path";
import { IS_TS_NODE, LOG_LEVEL } from "../constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let transports: any[];
if (IS_TS_NODE) {
    transports = [{ level: LOG_LEVEL, stream: pino.transport({ target: "pino-pretty" }) }];
} else {
    transports = [
        {
            level: LOG_LEVEL, stream: pino.transport({
                target: path.join(__dirname, "fileTransport.js"),
                options: { destination: path.join(__dirname, "..", "app.log") }
            })
        },
        { level: LOG_LEVEL, stream: pino.transport({ target: path.join(__dirname, "consoleTransport.js") }) }
    ];
}

const pinoLogger = pino({ name: "main" }, pino.multistream(transports));
export default pinoLogger;
