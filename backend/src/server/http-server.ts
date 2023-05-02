import { IServer } from "./interfaces";
import express, { Express, Request, Response } from "express";
import { getAllConnectedDevices } from "../utils/usb-listener/usb-listener";
import { Server } from "http";
import cors from "cors";
import { orderDevicesByHierarchy } from "../utils/hierarchy-processor/hierarchy-processor";

export class HttpExpressServer implements IServer {
  app: Express;
  port: number;
  server: Server | undefined;

  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
  }

  start = (): void => {
    this.app.get("/devices", (req: Request, res: Response) => {
      const allDevices = getAllConnectedDevices();
      const devicesByHierarchy = orderDevicesByHierarchy(allDevices);
      res.json(devicesByHierarchy);
    });

    this.server = this.app.listen(this.port, async () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}`
      );
    });
  };

  gracefulShutDown = async (): Promise<void> => {
    console.log("Shutting http express server gracefully...");
    this.server?.close(() => {});
    console.log("Server gracefully closed");
  };
}
