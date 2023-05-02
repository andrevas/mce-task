import { Flow } from "@mcesystems/reflow";
import { ViewInterfacesType } from "../viewInterfaces";

export default <Flow<ViewInterfacesType>>(async ({ view, views, flow }) => {
  const devicesListView = view(0, views.DevicesList, {
    title: "Server Devices List",
    devices: [],
  }).on("devicesUpdateEvent", ({ data }) => {
    devicesListView.update(data);
  });

  await new Promise(() => {});
});
