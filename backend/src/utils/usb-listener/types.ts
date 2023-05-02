export type UsbDeviceData = {
  vendorId: number;
  productId: number;
  address: number;
  isHub: boolean;
  deviceDescription: string;
  parentAddress?: number;
  deviceType: number;
};
