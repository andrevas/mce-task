import { Flow } from "@mcesystems/reflow";
import { parseDevices } from "../utils/devices-parser/devices-parser";
import { UsbDevice, UsbDevicesViewType } from "../utils/devices-parser/types";
import {
  ServerListenerFactory,
  ServerType,
} from "../utils/server-listener-factory/server-listener.factory";
import { ViewInterfacesType } from "../viewInterfaces";

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
  let viewType = UsbDevicesViewType.HIERARCHY;

  const devicesListView = view(0, views.DevicesList, {
    title: "Server Devices List",
    devices: [],
    viewType,
  }).on("switchView", () => {
    viewType =
      viewType === UsbDevicesViewType.HIERARCHY
        ? UsbDevicesViewType.TYPE
        : UsbDevicesViewType.HIERARCHY;
  });

  const serverListener = ServerListenerFactory.createServerListener(
    ServerType.HTTP,
    3000
  );

  serverListener.listen((devices: UsbDevice[]) => {
    devicesListView.update({
      devices: parseDevices(devices, viewType),
      viewType,
    });
  });

  await new Promise(() => {});
});
