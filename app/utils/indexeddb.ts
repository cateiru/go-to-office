import type { IndexedDBConfig } from "use-indexeddb/src/interfaces";

export const DBConfig: IndexedDBConfig = {
  databaseName: "go-to-office",
  version: 1,
  stores: [
    {
      name: "history",
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "timestamp", keyPath: "timestamp", options: { unique: true } }, // 同じ時刻に2つ以上は存在しないのでunique
        { name: "type", keyPath: "type", options: { unique: false } }, // 出社: `in_office`
        { name: "latitude", keyPath: "latitude", options: { unique: false } }, // 緯度
        { name: "longitude", keyPath: "longitude", options: { unique: false } }, // 軽度
      ],
    },
  ],
};

export interface History {
  timestamp: number;
  type: "in_office";

  latitude: number;
  longitude: number;
}
