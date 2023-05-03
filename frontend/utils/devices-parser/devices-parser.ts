import {
  UsbDevice,
  UsbDevicesByTypeData,
  UsbDevicesHierarchyData,
} from "./types";

const typeToStringType = (typeNumber: number) => {
  switch (typeNumber) {
    case 1:
      return "Audio";
    case 2:
      return "Communications and CDC Control";
    case 4:
      return "HID device";
    case 5:
      return "Physical";
    case 6:
      return "Image";
    case 7:
      return "Printer";
    case 8:
      return "Mass Storage";
    case 9:
      return "Hub";
    default:
      return "Other";
  }
};

const parseDeviceData = (device: UsbDevice) => {
  return {
    id: device.address,
    name: device.deviceDescription,
    data: device,
    children: [],
  };
};

export const orderDevicesByHierarchy = (
  devices: UsbDevice[]
): UsbDevicesHierarchyData[] => {
  let childrenMap: { [key: number]: UsbDevicesHierarchyData[] } = {};
  let parentsList: UsbDevicesHierarchyData[] = [];

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

export const orderDevicesByType = (
  devices: UsbDevice[]
): UsbDevicesByTypeData[] => {
  let devicesMap: { [key: string]: UsbDevice[] } = {};

  for (const device of devices) {
    const deviceTypeName = typeToStringType(device.deviceType);
    if (!devicesMap[deviceTypeName]) {
      devicesMap[deviceTypeName] = [];
    }
    devicesMap[deviceTypeName].push(device);
  }

  return Object.keys(devicesMap).map((type) => ({
    type,
    children: devicesMap[type],
  }));
};
