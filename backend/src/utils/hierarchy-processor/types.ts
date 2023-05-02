import { UsbDeviceData } from "../usb-listener/types";

export type DevicesHierarchyData = {
  id: number;
  name: string;
  data: UsbDeviceData;
  children?: DevicesHierarchyData[];
};
