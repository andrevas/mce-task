import { Flow } from "@mcesystems/reflow";
import {
  orderDevicesByHierarchy,
  orderDevicesByType,
} from "../utils/devices-parser/devices-parser";
import {
  UsbDevice,
  UsbDevicesHierarchyType,
} from "../utils/devices-parser/types";
import {
  ServerListenerFactory,
  ServerType,
} from "../utils/server-listener-factory/server-listener.factory";
import { ViewInterfacesType } from "../viewInterfaces";

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
  let hierarchyType = UsbDevicesHierarchyType.HIERARCHY;

  const devicesListView = view(0, views.DevicesList, {
    title: "Server Devices List",
    devices: [],
    hierarchyType,
  }).on("switchView", () => {
    hierarchyType =
      hierarchyType === UsbDevicesHierarchyType.HIERARCHY
        ? UsbDevicesHierarchyType.TYPE
        : UsbDevicesHierarchyType.HIERARCHY;
  });

  const serverListener = ServerListenerFactory.createServerListener(
    ServerType.HTTP,
    3000
  );

  serverListener.listen((devices: UsbDevice[]) => {
    const parsedDevices =
      hierarchyType === UsbDevicesHierarchyType.HIERARCHY
        ? orderDevicesByHierarchy(devices)
        : orderDevicesByType(devices);
    devicesListView.update({ devices: parsedDevices, hierarchyType });
  });

  await new Promise(() => {});
});
