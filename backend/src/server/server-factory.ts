import { HttpExpressServer } from "./http-server";
import { IServer } from "./interfaces";

export enum ServerType {
  HTTP,
}

export class ServerFactory {
  static createServer = (type: ServerType): IServer => {
    switch (type) {
      case ServerType.HTTP:
        return new HttpExpressServer();
    }
  };
}
