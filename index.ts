import { Database, type Statement } from "bun:sqlite";
import { unlinkSync, existsSync } from "node:fs";
import type {
  PreparedStatement,
  SQLiteDatabase,
  SQLiteStoreOptions,
} from "./zero-unexposed/sqlite-store.ts";
import { dropStore, SQLiteStore } from "./zero-unexposed/sqlite-store.ts";
import { type StoreProvider } from "./zero-unexposed/store.ts";

export type BunSQLiteStoreOptions = SQLiteStoreOptions;

export function bunSQLiteStoreProvider(
  opts?: BunSQLiteStoreOptions,
): StoreProvider {
  return {
    create: (name) =>
      new SQLiteStore(name, (name) => new BunSQLiteDatabase(name), opts),
    drop: dropBunSQLiteStore,
  };
}

class BunSQLitePreparedStatement implements PreparedStatement {
  readonly #statement: Statement;

  constructor(statement: Statement) {
    this.#statement = statement;
  }

  async firstValue(params: string[]): Promise<string | undefined> {
    const rows = this.#statement.values(params) as string[][];
    return rows[0]?.[0];
  }

  async exec(params: string[]): Promise<void> {
    this.#statement.run(params);
  }
}

class BunSQLiteDatabase implements SQLiteDatabase {
  readonly #db: Database;
  readonly #filename: string;
  readonly #statements: Set<Statement> = new Set();

  constructor(filename: string) {
    this.#filename = filename;
    this.#db = Database.open(filename);
  }

  close(): void {
    for (const stmt of this.#statements) {
      stmt.finalize();
    }
    this.#db.close();
  }

  destroy(): void {
    if (existsSync(this.#filename)) {
      unlinkSync(this.#filename);
    }
  }

  prepare(sql: string): PreparedStatement {
    const statement = this.#db.prepare(sql);
    this.#statements.add(statement);
    return new BunSQLitePreparedStatement(statement);
  }

  execSync(sql: string): void {
    this.#db.run(sql);
  }
}

function dropBunSQLiteStore(name: string): Promise<void> {
  return dropStore(name, (filename) => new BunSQLiteDatabase(filename));
}
