// Use https://regexper.com/.
// Using an arbitrary limit of 5 digits per image dimension.
// Using a very conservative 3 digits for percentages.
const renditions = {
  v1: /\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  v2: /\/images\/[\w-.]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)/,
  v3: /(\/images\/[\w-.]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?|\/media\/original_images\/[\w-.]+)\.(jpg|jpeg|png|gif|webp|avif)/,
  v4: /(\/images\/[\w-.]+\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.format-(jpeg|png|gif|webp))?(\.(jpegquality|webpquality)-\d{1,3})?|\/media\/original_images\/[\w-.]+|\/media\/images\/[\w-.]+\.original)\.(jpg|jpeg|png|gif|webp|avif|JPG|JPEG|PNG|GIF|WEBP|AVIF)/,
  v5: /(\/images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d{1,3})?|(width|height)-\d+|scale-\d{1,3})(\.format-(jpeg|png|webp))?(\.(jpeg|webp)quality-\d{1,3})?|\/media\/original_images\/[\w-.]+|\/media\/images\/[\w-.]+\.original)\./,
  v6: /(\/images\/[\w-.]+\.((fill|max|min)-\d+x\d|(width|height|scale)-\d)|\/media\/images\/[\w-.]+\.original|\/media\/original_images\/)/,
  v7: /(\.[a-z]+|\/media)(\/[\w-]+)?\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d|(width|height|scale)-\d|original))/,
  // Optimized for real-world relevance, with as few false positives as possible, but still some.
  strict: /(\.[a-z]+|\/media)(\/[\w-]+)?\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
  less_strict_but_long: /((\.[a-z]+|\/media)(\/[\w-]+)?\/(images\/[\w-.]+\.original|original_images\/[\w-]+\.)|\/images\/[\w-.]+\.(fill|max|min|width|height|scale)-\d)/,
  // Very specific matching. No avoidable false positives.
  strictest: /\/media\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height|scale)-\d+|original)\.)/,
  // Lax matching, with widespread false positives.
  lax: /\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
};

/**
 * Detects whether a given HTML string contains Wagtail image renditions.
 * @param {string}  html - HTML string to check for Wagtail telltales.
 * @return {boolean} Whether we detected Wagtail-like markup in this HTML.
 */
const detectWagtail = (html) => {
  return renditions.strict.test(html);
};

module.exports = {
  detectWagtail,
};
