export interface IServer {
  port: number;
  start(): void;
  gracefulShutDown(): Promise<void>;
}
