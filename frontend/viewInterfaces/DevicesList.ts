import { ViewInterface } from "@mcesystems/reflow";

export interface DeviceListEvents {
  devicesUpdateEvent: {
    data: {
      devices: DevicesHierarchyData[];
    };
  };
}

export interface Device {
  vendorId: number;
  productId: number;
  address: number;
  isHub: boolean;
  deviceDescription: string;
  parentAddress?: number;
}

export type DevicesHierarchyData = {
  id: number;
  name: string;
  data: Device;
  children: DevicesHierarchyData[];
};

export interface Input {
  title: string;
  devices: DevicesHierarchyData[];
}

export default interface DevicesList
  extends ViewInterface<Input, DeviceListEvents> {}
