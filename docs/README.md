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

```txt
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

WIP regular expressions:

```js
(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)

'\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})\.(jpg|jpeg|png|gif|webp|avif)'
'\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})\.(jpg|jpeg|png|gif|webp|avif)'
'\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3})(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)'
'\.(fill-\d{1,5}x\d{1,5}(-c\d{1,3})?|(max|min)-\d{1,5}x\d{1,5}|(width|height)-\d{1,5}|scale-\d{1,3}|original)(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)'
'\.(original)(\.(jpegquality|webpquality)-\d{1,3})?\.(jpg|jpeg|png|gif|webp|avif)'
```
