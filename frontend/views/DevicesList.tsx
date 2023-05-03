import { ReflowReactComponent } from "@mcesystems/reflow-react-display-layer";
import DevicesListInterface from "../viewInterfaces/DevicesList";

import * as React from "react";
import {
  Device,
  DevicesByTypeData,
  DevicesHierarchyData,
  DevicesHierarchyType,
} from "../utils/hierarchy-processor/types";

export enum DeviceListMode {
  HIERARCHICAL,
  BY_TYPE,
}

class DevicesList extends ReflowReactComponent<DevicesListInterface> {
  render() {
    const { title, devices, hierarchyType, event } = this.props;

    const parseHierarchyDeviceData = (
      deviceData: DevicesHierarchyData
    ): string => {
      const { data } = deviceData;
      return parseDeviceData(data);
    };

    const parseDeviceData = (deviceData: Device): string => {
      const { deviceDescription, vendorId, productId } = deviceData;
      return `${deviceDescription} | VendorID: ${vendorId} | ProductID: ${productId}`;
    };

    return (
      <>
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          {hierarchyType === DevicesHierarchyType.HIERARCHY ? (
            <ul style={{ listStyleType: "none" }}>
              <li>
                <details open>
                  <summary>Server</summary>
                  {(devices as DevicesHierarchyData[]).map((device) => (
                    <>
                      {device.children.length > 0 ? (
                        <ul>
                          <li>
                            <details open>
                              <summary>
                                {parseHierarchyDeviceData(device)}
                              </summary>
                              <ul>
                                {device.children.map((childDevice) => (
                                  <li>
                                    {parseHierarchyDeviceData(childDevice)}
                                  </li>
                                ))}
                              </ul>
                            </details>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          <li> {parseHierarchyDeviceData(device)}</li>
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
                  {(devices as DevicesByTypeData[]).map((device) => (
                    <ul>
                      <li>
                        <details open>
                          <summary>{`${device.type} devices`}</summary>
                          <ul>
                            {device.children.map((childDevice) => (
                              <li>{parseDeviceData(childDevice)}</li>
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
      </>
    );
  }
}

export default DevicesList;
