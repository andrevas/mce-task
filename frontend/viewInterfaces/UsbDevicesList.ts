import { ViewInterface } from "@mcesystems/reflow";
import {
  UsbDevicesByTypeData,
  UsbDevicesHierarchyData,
  UsbDevicesViewType,
} from "../utils/devices-parser/types";

export interface Events {
  switchView: {};
}

export interface Input {
  title: string;
  devices: UsbDevicesHierarchyData[] | UsbDevicesByTypeData[];
  viewType: UsbDevicesViewType;
}

export default interface UsbDevicesList extends ViewInterface<Input, Events> {}
