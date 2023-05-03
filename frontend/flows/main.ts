import { Flow } from "@mcesystems/reflow";
import {
  orderDevicesByHierarchy,
  orderDevicesByType,
} from "../utils/hierarchy-processor/hierarchy-processor";
import {
  Device,
  DevicesHierarchyType,
} from "../utils/hierarchy-processor/types";
import {
  ServerListenerFactory,
  ServerType,
} from "../utils/server-factory/server-listener.factory";
import { ViewInterfacesType } from "../viewInterfaces";

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
  let hierarchyType = DevicesHierarchyType.HIERARCHY;

  const devicesListView = view(0, views.DevicesList, {
    title: "Server Devices List",
    devices: [],
    hierarchyType,
  }).on("switchView", () => {
    hierarchyType =
      hierarchyType === DevicesHierarchyType.HIERARCHY
        ? DevicesHierarchyType.TYPE
        : DevicesHierarchyType.HIERARCHY;
  });

  const serverListener = ServerListenerFactory.createServerListener(
    ServerType.HTTP,
    3000
  );

  serverListener.listen((devices: Device[]) => {
    const parsedDevices =
      hierarchyType === DevicesHierarchyType.HIERARCHY
        ? orderDevicesByHierarchy(devices)
        : orderDevicesByType(devices);
    devicesListView.update({ devices: parsedDevices, hierarchyType });
  });

  await new Promise(() => {});
});
