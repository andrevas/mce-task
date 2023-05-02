import axios from "axios";
import { DevicesHierarchyData } from "../viewInterfaces/DevicesList";
import { IServerListener } from "./interfaces";

export class HttpServerListener implements IServerListener {
  port: number;

  constructor(port: number) {
    this.port = port;
  }

  async listen(
    onData: (devices: DevicesHierarchyData[]) => void
  ): Promise<void> {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (true) {
      const dataRes = await axios.get(`http://localhost:${this.port}/devices`);
      onData(dataRes.data);
      await sleep(1000);
    }
  }
}
