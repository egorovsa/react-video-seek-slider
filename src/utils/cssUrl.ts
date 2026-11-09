export const cssUrl = (url: string): string =>
  `url("${url.replace(/["\\\n]/g, encodeURIComponent)}")`;
