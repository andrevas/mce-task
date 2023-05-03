export enum DevicesHierarchyType {
  HIERARCHY,
  TYPE,
}

export interface Device {
  vendorId: number;
  productId: number;
  address: number;
  isHub: boolean;
  deviceDescription: string;
  parentAddress?: number;
  deviceType: number;
}

export type DevicesHierarchyData = {
  id: number;
  name: string;
  data: Device;
  children: DevicesHierarchyData[];
};

export type DevicesByTypeData = {
  type: string;
  children: Device[];
};
