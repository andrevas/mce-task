import { ViewInterface } from "@mcesystems/reflow";
import {
  DevicesByTypeData,
  DevicesHierarchyData,
  DevicesHierarchyType,
} from "../utils/hierarchy-processor/types";

export interface Events {
  switchView: {};
}

export interface Input {
  title: string;
  devices: DevicesHierarchyData[] | DevicesByTypeData[];
  hierarchyType: DevicesHierarchyType;
}

export default interface DevicesList extends ViewInterface<Input, Events> {}
