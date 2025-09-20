import { expect, test } from "bun:test";
import { withRead, withWrite } from "./test/with-transactions.ts";
import {
  registerCreatedFile,
  runSQLiteStoreTests,
} from "./test/sqlite-store-test-util.ts";
import { clearAllNamedStoresForTesting } from "./zero-unexposed/sqlite-store.ts";
import { bunSQLiteStoreProvider, type BunSQLiteStoreOptions } from "./index.ts";

const defaultStoreOptions = {
  busyTimeout: 200,
  journalMode: "WAL",
  synchronous: "NORMAL",
  readUncommitted: false,
} as const;

function createStore(name: string, opts?: BunSQLiteStoreOptions) {
  const provider = bunSQLiteStoreProvider(opts);
  name = `bun_${name}`;
  const store = provider.create(name);
  registerCreatedFile(name);
  return store;
}

// Run all shared SQLite store tests
runSQLiteStoreTests<BunSQLiteStoreOptions>({
  storeName: "BunSQLiteStore",
  createStoreProvider: bunSQLiteStoreProvider,
  clearAllNamedStores: clearAllNamedStoresForTesting,
  createStoreWithDefaults: createStore,
  defaultStoreOptions,
});

// BunSQLite-specific tests
test("BunsQLite specific configuration options", async () => {
  // Test ZeroSQLite-specific configuration options
  const storeWithOptions = createStore("bun-sqlite-pragma-test", {
    busyTimeout: 500,
    journalMode: "DELETE",
    synchronous: "FULL",
    readUncommitted: true,
  });

  await withWrite(storeWithOptions, async (wt) => {
    await wt.put("config-test", "configured-value");
  });

  await withRead(storeWithOptions, async (rt) => {
    expect(await rt.get("config-test")).toBe("configured-value");
  });

  await storeWithOptions.close();
});
