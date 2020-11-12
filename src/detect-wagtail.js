// Use https://regexper.com/.
// Using an arbitrary limit of 5 digits per image dimension.
// Using a very conservative 3 digits for percentages.
const renditions = {
  conservative: /\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
};

/**
 * Detects whether a given HTML string contains Wagtail image renditions.
 * @param {string}  html - HTML string to check for Wagtail telltales.
 * @return {boolean} Whether we detected Wagtail-like markup in this HTML.
 */
const detectWagtail = (html) => {
  return renditions.conservative.test(html);
};

module.exports = {
  detectWagtail,
};
