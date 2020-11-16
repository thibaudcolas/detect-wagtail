// Use https://regexper.com/.
// Using an arbitrary limit of 5 digits per image dimension.
// Using a very conservative 3 digits for percentages.
const renditions = {
  v1: /\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  v2: /\/images\/[a-zA-Z0-9._-]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  v3: /(\/images\/[a-zA-Z0-9._-]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+)\.(jpg|jpeg|png|gif|webp|avif)/,
  v4: /(\/images\/[a-zA-Z0-9._-]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+|\/media\/images\/[a-zA-Z0-9._-]+\.original)\.(jpg|jpeg|png|gif|webp|avif|JPG|JPEG|PNG|GIF|WEBP|AVIF)/,
  v5: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d{1,3})?|(width|height)-\d+|scale-\d{1,3})(\.format-(jpeg|png|webp))?(\.(jpeg|webp)quality-\d{1,3})?|\/media\/original_images\/[a-zA-Z0-9._-]+|\/media\/images\/[a-zA-Z0-9._-]+\.original)\./,
  // Optimized for real-world relrevance, with as few false positives as possible, but still some.
  pragmatic: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d|(width|height|scale)-\d)|\/media\/images\/[a-zA-Z0-9._-]+\.original|\/media\/original_images\/)/,
  conserv_ish1: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height)-\d+|scale-\d{1,3})\.|\/media(\/[a-zA-Z0-9_-]+)?\/images\/[a-zA-Z0-9._-]+\.original\.|\/media\/original_images\/)/,
  conserv_ish2: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height)-\d+|scale-\d{1,3})\.|\/media(\/[a-zA-Z0-9_-]+)?\/images\/[a-zA-Z0-9._-]+\.original\.|\/media(\/[a-zA-Z0-9_-]+)?\/original_images\/)/,
  // Very specific matching. No avoidable false positives.
  strict: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height)-\d+|scale-\d{1,3})\.|\/media\/images\/[a-zA-Z0-9._-]+\.original\.|\/media\/original_images\/)/,
  // Lax matching, with widespread false positives.
  lax: /(\/images\/[a-zA-Z0-9._-]+\.((fill|max|min)-\d+x\d|(width|height|scale)-\d|original)|\/original_images\/)/,
};

/**
 * Detects whether a given HTML string contains Wagtail image renditions.
 * @param {string}  html - HTML string to check for Wagtail telltales.
 * @return {boolean} Whether we detected Wagtail-like markup in this HTML.
 */
const detectWagtail = (html) => {
  return renditions.pragmatic.test(html);
};

module.exports = {
  detectWagtail,
};
