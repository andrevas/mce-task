import { Flow } from "@mcesystems/reflow";
import {
  ServerListenerFactory,
  ServerType,
} from "../utils/server-listener.factory";
import { ViewInterfacesType } from "../viewInterfaces";
import { DevicesHierarchyData } from "../viewInterfaces/DevicesList";

export default <Flow<ViewInterfacesType>>(async ({ view, views }) => {
  const devicesListView = view(0, views.DevicesList, {
    title: "Server Devices List",
    devices: [],
  });

  const serverListener = ServerListenerFactory.createServerListener(
    ServerType.HTTP,
    3000
  );

  serverListener.listen((devices: DevicesHierarchyData[]) => {
    devicesListView.update({ devices });
  });

  await new Promise(() => {});
});
