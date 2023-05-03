export enum UsbDevicesHierarchyType {
  HIERARCHY,
  TYPE,
}

export interface UsbDevice {
  vendorId: number;
  productId: number;
  address: number;
  isHub: boolean;
  deviceDescription: string;
  parentAddress?: number;
  deviceType: number;
}

export type UsbDevicesHierarchyData = {
  id: number;
  name: string;
  data: UsbDevice;
  children: UsbDevicesHierarchyData[];
};

export type UsbDevicesByTypeData = {
  type: string;
  children: UsbDevice[];
};
