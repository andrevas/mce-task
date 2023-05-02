import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";
import DevicesListInterface, {
  DevicesHierarchyData,
} from "../viewInterfaces/DevicesList";

import * as React from "react";
import axios from "axios";

export enum DeviceListMode {
  HIERARCHICAL,
  BY_TYPE,
}

class DevicesList extends ReflowReactComponent<DevicesListInterface> {
  render() {
    const { title, devices, event } = this.props;

    const parseDeviceData = (deviceData: DevicesHierarchyData): string => {
      const { name, data } = deviceData;
      const { vendorId, productId } = data;
      return `${name} | VendorID: ${vendorId} | ProductID: ${productId}`;
    };

    return (
      <>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {
            <ul style={{ listStyleType: "none" }}>
              <li>
                <details open>
                  <summary>Server</summary>
                  {devices.map((device) => (
                    <>
                      {device.children.length > 0 ? (
                        <ul>
                          <li>
                            <details open>
                              <summary>{parseDeviceData(device)}</summary>
                              <ul>
                                {device.children.map((childDevice) => (
                                  <li> {parseDeviceData(childDevice)}</li>
                                ))}
                              </ul>
                            </details>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li> {parseDeviceData(device)}</li>
                        </ul>
                      )}
                    </>
                  ))}
                </details>
              </li>
            </ul>
          }
        </div>

        <button
          onClick={async () => {
            try {
              const res = await axios.get("http://localhost:3000/devices");
              event("devicesUpdateEvent", { data: { devices: res.data } });
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Fetch Devices
        </button>
      </>
    );
  }
}

export default DevicesList;