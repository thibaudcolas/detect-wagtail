# Documentation

## Renditions

Wagtail’s [default renditions](https://github.com/wagtail/wagtail/blob/ba6f94def17b8bbc66002cbc7af60ed422658ff1/wagtail/images/wagtail_hooks.py#L110-L124):

```py
('original', image_operations.DoNothingOperation),
('fill', image_operations.FillOperation),
('min', image_operations.MinMaxOperation),
('max', image_operations.MinMaxOperation),
('width', image_operations.WidthHeightOperation),
('height', image_operations.WidthHeightOperation),
('scale', image_operations.ScaleOperation),
('jpegquality', image_operations.JPEGQualityOperation),
('webpquality', image_operations.WebPQualityOperation),
('format', image_operations.FormatOperation),
('bgcolor', image_operations.BackgroundColorOperation),
```

Sample rendition strings, see full [image renditions documentation](https://docs.wagtail.io/en/stable/topics/images.html).

```sh
max-1000x500
min-500x200
width-640
height-480
scale-50
fill-200x200
fill-200x200-c80
original
format-jpeg
format-png
format-gif
format-webp-lossless
bgcolor-000
bgcolor-ffffff
jpegquality-40
webpquality-50
```

## Limitations

Sites which are built with another backend, but use a Wagtail site to serve images.

```txt
chukou1.com.html:1052:<a href="https://www.chukou1.com/HotPlatfroms/HotPlatfroms.aspx?pageName=Teezily" target="_blank"> <img alt="Teezily" src="https://pic.chukou1.com/media/images/LOGO_1.original.original.jpg" style="width: 157px;" /></a></li>
```

Images uploaded to other platforms with their original Wagtail rendition file name

```txt
opencanada.org.html:424:                    src="https://opencanada.org/wp-content/themes/opencanada/assets/opencanada/images/86360915-0de18100-bc41-11ea-8ca5-c8209953bde1.original.png"
```

Images processed with pagespeed (Apache mod pagespeed?)

```txt
computest.nl.html:484:<img data-pagespeed-lazy-src='/media/images/281x158xKlantcase_AFAS_Software_7cRjkEr.original.jpg.pagespeed.ic.bkStlIpzjx.jpg' alt='' title='' src="/pagespeed_static/1.JiBnMqyl6S.gif" onload="pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);" onerror="this.onerror=null;pagespeed.lazyLoadImages.loadIfVisibleAndMaybeBeacon(this);">
```

## Making changes to the regular expression

1. Update the test suite so the known false positives and false negatives are kept in check
2. Try the new regular expressions on the Majestic Million

## Similar Wappalyzer regular exressions

```json
"<[^>]+(?:https?:)?//(?:assets|downloads|images|videos)\\.(?:ct?fassets\\.net|contentful\\.com)",
"(?:powered by <a[^>]+>Django ?([\\d.]+)?<\\/a>|<input[^>]*name=[\"']csrfmiddlewaretoken[\"'][^>]*>)\\;version:\\1",
"(?:<div[^>]+id=\"wrapper_r\"|<(?:link|script)[^>]+(?:feed|components)/com_|<table[^>]+class=\"pill)\\;confidence:50",
"(?:<script [^>]+\\s+<!--\\s+lang\\.no_new_posts|<a[^>]* title=\"Powered By MyBB)",
"<link[^>]* href=[^>]+/web/css/(?:web\\.assets_common/|website\\.assets_frontend/)\\;confidence:25",
"<\\/div>\\s*<!-- outerContainer -->\\s*<div\\s*id=\"printContainer\"><\\/div>",
"(?:<link[^>]*/assets/store/all-[a-z\\d]{32}\\.css[^>]+>|<script>\\s*Spree\\.(?:routes|translations|api_key))",
"(?:<div class=\"sf-toolbar[^>]+?>[^]+<span class=\"sf-toolbar-value\">([\\d.])+|<div id=\"sfwdt[^\"]+\" class=\"[^\"]*sf-toolbar)\\;version:\\1",
```
