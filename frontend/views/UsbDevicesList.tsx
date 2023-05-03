import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";
import DevicesListInterface from "../viewInterfaces/UsbDevicesList";

import * as React from "react";
import {
  UsbDevice,
  UsbDevicesByTypeData,
  UsbDevicesHierarchyData,
  UsbDevicesViewType,
} from "../utils/devices-parser/types";

export enum UsbDevicesListMode {
  HIERARCHICAL,
  BY_TYPE,
}

class UsbDevicesList extends ReflowReactComponent<DevicesListInterface> {
  render() {
    const { title, devices, viewType, event, error } = this.props;

    const stringifyHierarchyDeviceData = (
      deviceData: UsbDevicesHierarchyData
    ): string => {
      const { data } = deviceData;
      return stringifyDeviceData(data);
    };

    const stringifyDeviceData = (deviceData: UsbDevice): string => {
      const { deviceDescription, vendorId, productId } = deviceData;
      return `${deviceDescription} | VendorID: ${vendorId} | ProductID: ${productId}`;
    };

    return (
      <>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {viewType === UsbDevicesViewType.HIERARCHY ? (
            <ul style={{ listStyleType: "none" }}>
              <li>
                <details open>
                  <summary>Server</summary>
                  {(devices as UsbDevicesHierarchyData[]).map((device) => (
                    <>
                      {device.children.length > 0 ? (
                        <ul>
                          <li>
                            <details open>
                              <summary>
                                {stringifyHierarchyDeviceData(device)}
                              </summary>
                              <ul>
                                {device.children.map((childDevice) => (
                                  <li>
                                    {stringifyHierarchyDeviceData(childDevice)}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li> {stringifyHierarchyDeviceData(device)}</li>
                        </ul>
                      )}
                    </>
                  ))}
                </details>
              </li>
            </ul>
          ) : (
            <ul style={{ listStyleType: "none" }}>
              <li>
                <details open>
                  <summary>Server</summary>
                  {(devices as UsbDevicesByTypeData[]).map((device) => (
                    <ul>
                      <li>
                        <details open>
                          <summary>{`${device.type} devices`}</summary>
                          <ul>
                            {device.children.map((childDevice) => (
                              <li>{stringifyDeviceData(childDevice)}</li>
                            ))}
                          </ul>
                        </details>
                      </li>
                    </ul>
                  ))}
                </details>
              </li>
            </ul>
          )}
        </div>
        <button onClick={() => event("switchView", {})}>Switch View</button>
        <div style={{ color: "red" }}>{error ? error.message : ""}</div>
      </>
    );
  }
}

export default UsbDevicesList;
