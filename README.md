# [Detect Wagtail <img src="https://raw.githubusercontent.com/thibaudcolas/detect-wagtail/main/.github/logo.svg?sanitize=true" width="100" height="100" align="right" alt="">](https://detect-wagtail.netlify.app/)

> Detect whether a site or page is built with [Wagtail](https://github.com/wagtail/wagtail).

## Usage

You can run the detection with:

- The online website, [detect-wagtail.netlify.app](https://detect-wagtail.netlify.app/).
- A bookmarklet, also available from [detect-wagtail.netlify.app](https://detect-wagtail.netlify.app/).
- A CLI, without installing anything: `npx detect-wagtail <url>`
- As an npm package for more custom needs, [detect-wagtail](https://www.npmjs.com/package/detect-wagtail)

## CLI

```sh
npx detect-wagtail https://example.com
```

Options:

- `--json`: output machine-readable JSON.
- `--strictness <level>`: strictness of the detection, one of `strict` (default), `less_strict_but_long`, `strictest`, `lax`, `laxest`.

Exit codes: `0` Wagtail detected on every checked URL, `1` not detected on at least one, `2` error (invalid argument, invalid URL, or fetch failure).

## npm package

```js
const { detectWagtail, renditions } = require("detect-wagtail");

// Example HTML string that may contain Wagtail image renditions
const htmlContent = `<div><img src="/media/images/example.fill-300.jpg"></div>`;

// Use the default strict pattern to check for Wagtail markup
if (detectWagtail(htmlContent)) {
  console.log("Wagtail detected!");
}
```

```js
import { detectWagtail, renditions } from "detect-wagtail";
```

TypeScript type definitions are bundled with the package.

The `renditions` object also directly exposes 5 regular expressions depending on how strict or lax the matching should be:

- `strict`: Optimized for real-world relevance, minimizing false positives.
- `less_strict_but_long`: A bit looser than strict, capturing additional cases.
- `strictest`: Very specific matching with no avoidable false positives.
- `lax`: Looser matching that may yield more false positives.
- `laxest`: The most lenient pattern based solely on rendition suffixes or the original_images folder.

```js
if (renditions.lax.test(htmlContent)) {
  console.log("Detected potential Wagtail markup (using lax matching).");
}
```

## How it works

Full read: [Detecting Wagtail in the wild](https://thib.me/detecting-wagtail-in-the-wild).

This uses regular expressions to check whether images on the page match a predetermined pattern:

[![](https://raw.githubusercontent.com/thibaudcolas/detect-wagtail/main/.github/regexper-diagram.svg?sanitize=true)](https://regexper.com/#%5C%2F%28original_images%5C%2F%5B%5Cw-%5D%2B%5C.%7Cimages%5C%2F%5B%5Cw-.%5D%2B%5C.%28%28fill%7Cmax%7Cmin%7Cwidth%7Cheight%7Cscale%29-%5Cd%7Coriginal%29%29)

We also check whether the rich text content on the page matches how Wagtail stores this data.

There can be [false positives](https://en.wikipedia.org/wiki/Precision_and_recall) with such simple checks, but they have the benefit of working regardless of whether the target site is directly served by Wagtail, or if Wagtail is used as a headless CMS.

## Related links

- [Detecting Wagtail in the wild](https://thib.me/detecting-wagtail-in-the-wild)
- [Wappalyzer](https://www.wappalyzer.com/technologies/cms/wagtail/)
- [WhatCMS.org](https://whatcms.org/c/Wagtail)
- [detect-django-version](https://github.com/caioariede/detect-django-version)
- [Use consistent heuristics to tell if a site is made with Wagtail](https://github.com/springload/madewithwagtail/issues/62)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and development commands.
