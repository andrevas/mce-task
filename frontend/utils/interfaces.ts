import { DevicesHierarchyData } from "../viewInterfaces/DevicesList";

export interface IServerListener {
  port: number;
  listen(onData: (devices: DevicesHierarchyData[]) => void): Promise<void>;
}
