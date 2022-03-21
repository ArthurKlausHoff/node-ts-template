// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const IS_TS_NODE: boolean = process[Symbol.for("ts-node.register.instance")] && true;
export const LOG_LEVEL: string = process.env["LOG_LEVEL"] ? process.env["LOG_LEVEL"] : "info";
