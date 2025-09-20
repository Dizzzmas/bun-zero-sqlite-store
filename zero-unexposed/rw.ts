export declare class Lock {
  private _lockP;
  lock(): Promise<() => void>;
  withLock<R>(f: () => R | Promise<R>): Promise<R>;
}
export declare class RWLock {
  private _lock;
  private _writeP;
  private _readP;
  read(): Promise<() => void>;
  withRead<R>(f: () => R | Promise<R>): Promise<R>;
  write(): Promise<() => void>;
  withWrite<R>(f: () => R | Promise<R>): Promise<R>;
}
