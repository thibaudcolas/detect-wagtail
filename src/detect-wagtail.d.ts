declare const renditions: {
  strict: RegExp;
  less_strict_but_long: RegExp;
  strictest: RegExp;
  lax: RegExp;
  laxest: RegExp;
};
declare function detectWagtail(html: string): boolean;
export { detectWagtail, renditions };
