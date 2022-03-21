import fs from "fs";
import {once} from "events";

const pinoStream = async (options: {destination: string}) => {
    const stream = fs.createWriteStream(options.destination);
    await once(stream, "open");
    return stream;
};

export = pinoStream;
