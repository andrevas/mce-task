import { HttpServerListener } from "./http-server-listener";
import { IServerListener } from "./interfaces";

export enum ServerType {
  HTTP,
}

export class ServerListenerFactory {
  static createServerListener = (
    type: ServerType,
    port: number
  ): IServerListener => {
    switch (type) {
      case ServerType.HTTP:
        return new HttpServerListener(port);
    }
  };
}
