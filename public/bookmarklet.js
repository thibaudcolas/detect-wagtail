(() => {
  const renditions = {
    // Optimized for real-world relevance, with as few false positives as possible, but still some.
    strict: /(\.[a-z]+|\/media)(\/[\w-]+)?\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
    // Very specific matching. No avoidable false positives.
    strictest: /\/media\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height|scale)-\d+|original)\.)/,
    // Lax matching, with widespread false positives.
    lax: /\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))/,
  };
  const html = document.documentElement.outerHTML;

  if (renditions.strictest.test(html)) {
    window.alert(
      "Yes, this looks like a Wagtail site! We detected Wagtail with our strictest check.",
    );
    return;
  }

  if (renditions.strict.test(html)) {
    window.alert(
      "Yes, this looks like a Wagtail site! We detected Wagtail with our strict check.",
    );
    return;
  }

  if (renditions.lax.test(html)) {
    window.alert(
      "That’s likely a Wagtail site. Or with another technology which handles images very similarly to Wagtail.",
    );
    return;
  }

  window.alert(
    "It doesn’t seem to be a Wagtail site. We can’t really tell for sure, but we couldn’t detect any user-uploaded images generated with Wagtail on this page.",
  );
})();
