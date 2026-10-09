export interface UIGoodiesBuildInfo {
  version: string;
  commit: string;
  builtAt: string;
}

// Replaced with a literal object by rollup.config.cjs at build time.
declare const __UIGOODIES_BUILD_INFO__: UIGoodiesBuildInfo;

export const buildInfo: UIGoodiesBuildInfo = __UIGOODIES_BUILD_INFO__;
