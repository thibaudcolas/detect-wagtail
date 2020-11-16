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

## Examples in HTML

In a wide variety of elements / attributes:

```txt
b-commerces.fr.html:1011:  <div class="image-container" style="background-image: url('/media/images/beer-machine-alcohol-brewery-15929.2e16d0ba.fill-250x170_GggkweO.jpg')">
www.venturebeyond.ca.html:406:                        src="/media/images/Venture_Beyond_-_Gillian_Thompson-.2e16d0ba.fill-200x200_seoHtyi.jpg"
ruralindiaonline.org.html:2856:                            data-src="/media/images/bazarpar_makardona.2e16d0ba.fill-512x512_svsF7L9.png"
bakerydemo.lanshark.com.html:251:                            src="/media/images/Bean-jam-bunanpankatori-cityj.2e16d0ba.fill-180x140-c100_RJ0hC1S.jpg"
www.theunconformity.com.au.html:1047:                  src="https://unco-assets.s3.amazonaws.com/media/images/_brand_assets_images_logos_zapier-logo-reversed.original_5pZXPtu.png"
www.yourschoolgames.com.html:89:      content="https://www.yourschoolgames.comhttps://media.yourschoolgames.com/images/1.width-320_UznIELO.png"
www.polosafaris.com.html:143:                    <li style="background: url('/media/images/A_Meeting_With_Her_Majesty.focus-none.width-945_2XROqCJ.jpeg') no-repeat center center">
bm.com.html:20: video poster="https://bcwglobal.blob.core.windows.net/prd/images/bcw-moving-people-hero-min.original.max-2000x2000.jpg"
mca.com.au.html:77: <script>var windowApiData = {"src": "/files/images/PipilottiRist_MCA_credit_Ken_L.width-1200.jpegquality-70_RHlv18i.jpg",
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

## Trial

Based on Majestic Million dataset:

- 296 strictest
- 463 strict
- 502 less_strict_but_long
- 515 lax

Compare results:

```sh
/usr/bin/diff <(ag 'first expression' -l | sort) <(ag 'second expression' -l | sort)
```
