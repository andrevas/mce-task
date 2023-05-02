import { Device, usb, getDeviceList, WebUSBDevice } from "usb";
import { UsbDeviceData } from "./types";

const HUB_DEVICE_CLASS = 9;
let CONNECTED_DEVICES: UsbDeviceData[] = [];

const initDevicesOnStart = async (): Promise<void> => {
  console.log("Initializing connected devices...");
  const devices = getDeviceList();
  CONNECTED_DEVICES = await Promise.all(
    devices.map(async (d) => await parseDeviceData(d))
  );
  console.log("Devices initialized!");
};

const getDeviceStringDescription = async (device: Device): Promise<string> => {
  try {
    const deviceAsWebUsb = await WebUSBDevice.createInstance(device);
    return `${deviceAsWebUsb.manufacturerName} : ${deviceAsWebUsb.productName}`;
  } catch {
    return "<No description available>";
  }
};

const parseDeviceData = async (device: Device): Promise<UsbDeviceData> => {
  return {
    vendorId: device.deviceDescriptor.idVendor,
    productId: device.deviceDescriptor.idProduct,
    address: device.deviceAddress,
    isHub: device.deviceDescriptor.bDeviceClass === HUB_DEVICE_CLASS,
    deviceDescription: await getDeviceStringDescription(device),
    parentAddress: device.parent ? device.parent.deviceAddress : undefined,
    deviceType: device.deviceDescriptor.bDeviceClass,
  };
};

export const initUsbDeviceListener = async (): Promise<void> => {
  await initDevicesOnStart();
  usb.on("attach", async (device: Device): Promise<void> => {
    console.log("Device attached");
    const usbDeviceData = await parseDeviceData(device);
    CONNECTED_DEVICES.push(usbDeviceData);
  });

  usb.on("detach", (device: Device): void => {
    console.log("Device detached");
    CONNECTED_DEVICES = CONNECTED_DEVICES.filter(
      (d) => device.deviceAddress !== d.address
    );
  });
};

export const getAllConnectedDevices = (): UsbDeviceData[] => {
  return CONNECTED_DEVICES;
};
