// Use https://regexper.com/ to visualize the regular expressions.
// Notes on implementation:
// - Specifying file extensions doesn’t refine the results meaningfully enough.
// - Creating exact matches for the renditions suffixes isn’t really that useful in real-world usage (for example limiting the length of sequences of digits).
const renditions = {
  // Optimized for real-world relevance, with as few false positives as possible, but still some.
  strict:
    /(\.[a-z]+|\/media)(\/[\w-]+)?\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
  less_strict_but_long:
    /((\.[a-z]+|\/media)(\/[\w-]+)?\/(images\/[\w-.]+\.original|original_images\/[\w-]+\.)|\/images\/[\w-.]+\.(fill|max|min|width|height|scale)-\d)/,
  // Very specific matching. No avoidable false positives.
  strictest:
    /\/media\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height|scale)-\d+|original)\.)/,
  // Lax matching, with widespread false positives.
  lax: /\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
  // Very lax matching based on rendition suffixes or original_images folder only.
  laxest:
    /(\/original_images\/|\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
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
  renditions,
};
