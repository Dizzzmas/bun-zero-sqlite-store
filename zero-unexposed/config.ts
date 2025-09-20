declare const process: {
  env: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NODE_ENV?: string;
  };
};

export const isProd = process.env.NODE_ENV === "production";

export {
  isProd as skipAssertJSONValue,
  isProd as skipBTreeNodeAsserts,
  isProd as skipCommitDataAsserts,
  /**
   * In debug mode we deeply freeze the values we read out of the IDB store and we
   * deeply freeze the values we put into the stores.
   */
  isProd as skipFreeze,
  /**
   * In debug mode we assert that chunks and BTree data is deeply frozen. In
   * release mode we skip these asserts.
   */
  isProd as skipFrozenAsserts,
  isProd as skipGCAsserts,
};
