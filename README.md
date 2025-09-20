# zero-bun-sqlite-store

Use `bun:sqlite` as the KV store for [zero](https://zero.rocicorp.dev/)

Perfect for CLIs, TUIs, and desktop apps

## Installation

```bash
bun add zero-bun-sqlite-store
```

## Usage Example

```typescript
import { Zero } from "@rocicorp/zero";
import { bunSQLiteStoreProvider } from "zero-bun-sqlite-store";

const zero = new Zero({
  kvStore: bunSQLiteStoreProvider(),
  ...
});
```
