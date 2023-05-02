import dotenv from "dotenv";
import { IServer } from "./server/interfaces";
import { ServerFactory, ServerType } from "./server/server-factory";
import { initUsbDeviceListener } from "./utils/usb-listener/usb-listener";
dotenv.config();

let server: IServer;
(async () => {
  await initUsbDeviceListener();
  server = ServerFactory.createServer(ServerType.HTTP);
  server.start();
})();

const shutDownGracefully = (): void => {
  server ? server.gracefulShutDown() : process.exit(1);
};

process.on("uncaughtException", (error) => {
  console.log("UNCAUGHT ERROR: " + error.message);
  shutDownGracefully();
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received");
  shutDownGracefully();
  process.exit(0);
});
