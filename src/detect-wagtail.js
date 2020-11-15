// Use https://regexper.com/.
// Using an arbitrary limit of 5 digits per image dimension.
// Using a very conservative 3 digits for percentages.
const renditions = {
  v1: /\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  v2: /\/images\/[a-zA-Z0-9._-]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  v3: /(\/images\/[a-zA-Z0-9._-]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+)\.(jpg|jpeg|png|gif|webp|avif)/,
  strict: /(\/images\/[a-zA-Z0-9._-]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+|\/media\/images\/[a-zA-Z0-9._-]+\.original)\.(jpg|jpeg|png|gif|webp|avif)/,
  conservative: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d{1,3})?|(width|height)-\d+|scale-\d{1,3})(\.format-(jpeg|png|webp))?(\.(jpeg|webp)quality-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+|\/media\/images\/[a-zA-Z0-9._-]+\.original)\.(jpg|jpeg|png|gif|webp|avif)/,
  conservative_ish: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d{1,3})?|(width|height)-\d+|scale-\d{1,3})(\.format-(jpeg|png|webp))?(\.(jpeg|webp)quality-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+|\/media(\/[a-zA-Z0-9_-]+)?\/images\/[a-zA-Z0-9._-]+\.original)\.(jpg|jpeg|png|gif|webp|avif)/,
  conservative_ish2: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d{1,3})?|(width|height)-\d+|scale-\d{1,3})(\.format-(jpeg|png|webp))?(\.(jpeg|webp)quality-\d{1,3})?|\/media(\/[a-zA-Z0-9_-]+)?\/original_images\/[a-zA-Z0-9._-]+|\/media(\/[a-zA-Z0-9_-]+)?\/images\/[a-zA-Z0-9._-]+\.original)\.(jpg|jpeg|png|gif|webp|avif)/,
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
