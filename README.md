# Detect Wagtail <img src="https://raw.githubusercontent.com/thibaudcolas/detect-wagtail/main/.github/logo.svg?sanitize=true" width="100" height="100" align="right" alt="">

[![detect-wagtail on npm](https://img.shields.io/npm/v/detect-wagtail.svg)](https://www.npmjs.com/package/detect-wagtail) [![Build status](https://github.com/thibaudcolas/detect-wagtail/workflows/CI/badge.svg)](https://github.com/thibaudcolas/detect-wagtail/actions) [![Netlify Status](https://api.netlify.com/api/v1/badges/2c9ab0a7-0f9f-4e67-83a5-4304bc4ddbd0/deploy-status)](https://app.netlify.com/sites/detect-wagtail/deploys)

> Detect whether a site or page is built with [Wagtail](https://github.com/wagtail/wagtail).

## Usage

You can run the detection with:

- The online website, [detect-wagtail.netlify.app](https://detect-wagtail.netlify.app/).
- A bookmarket, also available from [detect-wagtail.netlify.app](https://detect-wagtail.netlify.app/).
- A browser extension thanks to [Wappalyzer](https://github.com/AliasIO/wappalyzer).
- A Node CLI, also thanks to [Wappalyzer](https://github.com/AliasIO/wappalyzer).
- As an npm package for more custom needs, [detect-wagtail](https://www.npmjs.com/package/detect-wagtail)

## How it works

Full read: [Detecting Wagtail in the wild](https://thib.me/detecting-wagtail-in-the-wild).

This uses regular expressions to check whether images on the page match a predetermined pattern:

[![](https://raw.githubusercontent.com/thibaudcolas/detect-wagtail/main/.github/regexper-diagram.svg?sanitize=true)](https://regexper.com/#%5C%2F%28original_images%5C%2F%5B%5Cw-%5D%2B%5C.%7Cimages%5C%2F%5B%5Cw-.%5D%2B%5C.%28%28fill%7Cmax%7Cmin%7Cwidth%7Cheight%7Cscale%29-%5Cd%7Coriginal%29%29)

There can be [false positives](https://en.wikipedia.org/wiki/Precision_and_recall) with such a simple check, but it has the benefit of working regardless of whether the target site is directly served by Wagtail, or if Wagtail is used as a headless CMS.

## Related links

- [Wappalyzer](https://github.com/AliasIO/wappalyzer)
- [WhatCMS.org](https://whatcms.org/c/Wagtail)
- [detect-django-version](https://github.com/caioariede/detect-django-version)
