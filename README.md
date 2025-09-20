![Tests](https://github.com/Dizzzmas/bun-zero-sqlite-store/actions/workflows/test.yml/badge.svg)

# zero-bun-sqlite-store

Use `bun:sqlite` as the KV store for [zero](https://zero.rocicorp.dev/)

Perfect for CLIs, TUIs, and desktop apps

## Installation

```bash
bun add zero-bun-sqlite-store
```

## Example Usage

```typescript
import { Zero } from "@rocicorp/zero";
import { bunSQLiteStoreProvider } from "zero-bun-sqlite-store";

const zero = new Zero({
  kvStore: bunSQLiteStoreProvider(),
  ...
});
```

## P.S.

Ideally this becomes part of `@rocicorp/zero`, working on a contribution.

This was tested with standard zero sqlite store test suite.

Running tests

```bash
bun install

bun test
```
