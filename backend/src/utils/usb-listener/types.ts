export type UsbDeviceData = {
  vendorId: number;
  productId: number;
  address: number;
  deviceDescription: string;
  parentAddress?: number;
  deviceType: number;
};
