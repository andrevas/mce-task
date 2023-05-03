import { Device, DevicesByTypeData, DevicesHierarchyData } from "./types";

const parseDeviceData = (device: Device) => {
  return {
    id: device.address,
    name: device.deviceDescription,
    data: device,
    children: [],
  };
};

export const orderDevicesByHierarchy = (
  devices: Device[]
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

export const orderDevicesByType = (devices: Device[]): DevicesByTypeData[] => {
  let typesMap: { [key: string]: Device[] } = {};

  for (let i = 0; i < devices.length; i++) {
    const deviceTypeName = typeToStringType(devices[i].deviceType);
    if (!typesMap[deviceTypeName]) {
      typesMap[deviceTypeName] = [];
    }
    typesMap[deviceTypeName].push(devices[i]);
  }

  return Object.keys(typesMap).map((t) => ({
    type: t,
    children: typesMap[t],
  }));
};
