import { Device } from "../hierarchy-processor/types";

export interface IServerListener {
  port: number;
  listen(onData: (devices: Device[]) => void): Promise<void>;
}
