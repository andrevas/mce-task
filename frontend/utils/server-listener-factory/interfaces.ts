import { UsbDevice } from "../devices-parser/types";

export interface IServerListener {
  port: number;
  listen(onData: (devices: UsbDevice[], error?: Error) => void): Promise<void>;
}
