import { ViewInterface } from "@mcesystems/reflow";
import {
  UsbDevicesByTypeData,
  UsbDevicesHierarchyData,
  UsbDevicesHierarchyType,
} from "../utils/devices-parser/types";

export interface Events {
  switchView: {};
}

export interface Input {
  title: string;
  devices: UsbDevicesHierarchyData[] | UsbDevicesByTypeData[];
  hierarchyType: UsbDevicesHierarchyType;
}

export default interface UsbDevicesList extends ViewInterface<Input, Events> {}
