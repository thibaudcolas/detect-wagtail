// Use https://regexper.com/.
// Using an arbitrary limit of 5 digits per image dimension.
// Using a very conservative 3 digits for percentages.
const renditions = {
  conservative: /\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  original_images: /(\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.(jpegquality|webpquality)-\d{1,3})?|\/original_images\/.+)\.(jpg|jpeg|png|gif|webp|avif)/,
  original: /(\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.(jpegquality|webpquality)-\d{1,3})?|\/original_images\/.+|\.original)\.(jpg|jpeg|png|gif|webp|avif)/,
  original_jpegquality: /(\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.(jpegquality|webpquality)-\d{1,3})?|\/original_images\/.+|\.original(\.(jpegquality|webpquality)-\d{1,3})?)\.(jpg|jpeg|png|gif|webp|avif)/,
  experimental_lenient: /(\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3}|original)(\.(jpegquality|webpquality)-\d{1,3})?|\/original_images\/).+\.(jpg|jpeg|png|gif|webp|avif)/,
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
