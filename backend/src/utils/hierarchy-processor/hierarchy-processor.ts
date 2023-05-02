import { UsbDeviceData } from "../usb-listener/types";
import { DevicesHierarchyData } from "./types";

const parseDeviceData = (device: UsbDeviceData) => {
  return {
    id: device.address,
    name: device.deviceDescription,
    data: device,
  };
};

export const orderDevicesByHierarchy = (
  devices: UsbDeviceData[]
): DevicesHierarchyData[] => {
  let childrenMap: { [key: number]: DevicesHierarchyData[] } = {};
  let parentsList: DevicesHierarchyData[] = [];

  for (let i = 0; i < devices.length; i++) {
    childrenMap[devices[i].address] = [];
  }

  for (const device of devices) {
    const deviceData = parseDeviceData(device);

    device.parentAddress
      ? childrenMap[device.parentAddress].push(deviceData)
      : parentsList.push(deviceData);
  }
  for (const parent of parentsList) {
    parent.children = childrenMap[parent.id];
  }

  return parentsList;
};
