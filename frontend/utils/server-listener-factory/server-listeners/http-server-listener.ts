import axios from "axios";
import { UsbDevice } from "../../devices-parser/types";
import { IServerListener } from "../interfaces";

export class HttpServerListener implements IServerListener {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  async listen(
    onData: (devices: UsbDevice[], error?: Error) => void
  ): Promise<void> {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (true) {
      try {
        const dataRes = await axios.get(
          `http://localhost:${this.port}/devices`
        );
        onData(dataRes.data);
      } catch (err) {
        onData([], err as Error);
      } finally {
        await sleep(1000);
      }
    }
  }
}
