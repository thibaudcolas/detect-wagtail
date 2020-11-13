const { detectWagtail } = require("./detect-wagtail");

describe("detect-wagtail true positives", () => {
  test.each`
    label                      | fragment
    ${"fill-wwwxhhh"}          | ${"https://media.bethebusiness.tools/images/191017_BTB_cornwall__1213-large.2e16d0ba.fill-822x650.jpg"}
    ${"fill-wwxhh"}            | ${"https://www.bigpicnic.net/media/images/eu-logo_skFhAar.2e16d0ba.fill-70x48.png"}
    ${"fill with c100"}        | ${"https://d8qxmyaetw61w.cloudfront.net/media/images/Bryce-fun.2e16d0ba.fill-1046x696-c100.jpg"}
    ${"fill with cdd"}         | ${"https://www.ynanp.gr/media/images/33.2e16d0ba.fill-400x300-c80.jpg"}
    ${"fill with c0"}          | ${"/media/images/UE4LowPolyVehicleTh.2e16d0ba.fill-960x540-c0.jpg"}
    ${"format-jpeg"}           | ${"/media/images/UE4LowPolyVehicleTh.2e16d0ba.fill-960x540-c0.format-jpeg.jpg"}
    ${"width-www"}             | ${"https://www.jazzfestival.nz/media/images/video-fallback-image_1.width-1920.png"}
    ${"height-hh"}             | ${"https://s3.amazonaws.com/files.peacecorps.gov/images/icon--laptop.height-50.png"}
    ${"fill-.jpegquality-100"} | ${"https://buckup-ff-stories.s3.amazonaws.com/images/P1000301.2e16d0ba.fill-1440x900.jpegquality-100.jpg"}
  `("$label", ({ fragment }) => {
    expect(detectWagtail(fragment)).toBe(true);
  });
});

describe("detect-wagtail false negatives", () => {
  test.each`
    label                                     | fragment
    ${"original bucket"}                      | ${"https://unco-assets.s3.amazonaws.com/media/images/events-tasmania.original.png"}
    ${"original local"}                       | ${"/media/images/ic-kyiv-v-33x.original.original.png"}
    ${"original fool"}                        | ${"https://m.foolcdn.com/media/dubs/images/Growth_Chart_RB_no-title_aug17_transparent.original.png"}
    ${"original FEC"}                         | ${"https://www.fec.gov/resources/cms-content/images/headshot--walther.original.png"}
    ${"original MOFO"}                        | ${"https://assets.mofoprod.net/network/images/cta.original.jpg"}
    ${"original cfpb"}                        | ${"https://files.consumerfinance.gov/f/images/cfpb_events.original.png"}
    ${"original directbuy"}                   | ${"/wm/images/shop-icon-db.original.png"}
    ${"original.original"}                    | ${"https://www.netronome.com/m/images/Netronome_Web_Logo_UPE9ULO.original.original.png"}
    ${"original.original.original"}           | ${"/media/images/image_44.original.original.original.png"}
    ${"original.original AWS"}                | ${"https://directory-cms-public.s3.amazonaws.com/images/Lorry.original.original.jpg"}
    ${"original in short media folder"}       | ${"/m/images/default-event-2.original.jpg"}
    ${"original_base64"}                      | ${"https://unco-assets.s3.amazonaws.com/media/images/_brand_assets_images_logos_zapier-logo-reversed.original_5pZXPtu.png"}
    ${"format-jpg"}                           | ${"https://www.fabrique.com/media/original_images/00-brandmr-cover-small.png.580x360_q70_crop_format-jpg.jpg"}
    ${"max-wwwxhhh.custom-rendition"}         | ${"https://www.jazzfestival.nz/media/images/WCC_Black.original.max-400x250.grayscale_inverted.png"}
    ${"original_images"}                      | ${"https://buckup-ff-stories.s3.amazonaws.com/original_images/Lockup_Logo_-_JPEG-1.png"}
    ${"original_images in unusual folder"}    | ${"https://www.rada.ac.uk/media/thumbs/original_images/website_sharing_image_1200x630_pFwpfdUaAU8l.jpg"}
    ${"original_images in unusal folder CDN"} | ${"https://bos-prd.s3.amazonaws.com/media/dd/original_images/46e7d749c2374c0416422da73c83a421.jpg"}
    ${"text after renditions"}                | ${"https://cdn.fertighaus.de/images/finanzierungs-assistent-desktop-1600.fill-480x776.noauto.png"}
  `("$label", ({ fragment }) => {
    expect(detectWagtail(fragment)).toBe(false);
  });
});

describe("detect-wagtail false positives", () => {
  test.each`
    label                    | fragment
    ${"width-ddd webflow"}   | ${"https://global-uploads.webflow.com/5e25051eb2b6451f92115f43/5e38e792e654da74832fe5d0_FY18-partner-favicon-Expr3ss_V2_Lj5gmrm.width-330.png"}
    ${"width-ddd wordpress"} | ${"https://www.coventry-homes.com/wp-content/uploads/2018/05/2_WPhCEQ8.width-1800.jpg"}
  `("$label", ({ fragment }) => {
    expect(detectWagtail(fragment)).toBe(true);
  });
});

describe("detect-wagtail true negatives", () => {
  test.each`
    label                                     | fragment
    ${"static file"}                          | ${"https://www.lacascadeinsolite.com/templates/captain/img/interface/logo.png"}
    ${"Wagtail file name uploaded elsewhere"} | ${"https://www.lacascadeinsolite.com/public/img/big/imageactus80f58601fill1920x700formatjpegjpg_5ed760695e964.jpg"}
    ${"Wagtail file name uploaded elsewhere"} | ${"/public/uploads/enticers/rahf_amandacoldlake16_2e16d0ba_fill800x400/1566488182-800w_400h_rahf_amandacoldlake16_2e16d0ba_fill800x400.jpg"}
    ${"Wagtail file name uploaded elsewhere"} | ${"https://www.museumarnhem.nl/media/pages/activiteiten/thuis-videos-mini-college/6967a06981-1600877821/img-20200416-163827-2e16d0ba-fill-1080x700-c100-4x.jpg"}
    ${"Wagtail file name uploaded elsewhere"} | ${"public/img/big/3130A480x2942e16d0bafill1920x1080formatjpegjpg_5e690103ee197.jpg"}
    ${"original.svg"}                         | ${"https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"}
    ${"original.football"}                    | ${"https://play.google.com/store/apps/details?id=com.original.football"}
    ${"original bigcommerce"}                 | ${"https://cdn11.bigcommerce.com/s-6z2u3uo2sq/images/stencil/1280x1280/a/towel-storage-bathroom-howards-storage-world-australia__22966.original.jpg"}
    ${"original.original bigcommerce"}        | ${"https://cdn11.bigcommerce.com/s-p5jjd/images/stencil/250x100/resized-new-logo_1514911965__08117.original.original.png"}
    ${"original linkedin"}                    | ${"https://content.linkedin.com/content/dam/me/business/en-us/marketing-solutions/cx/2017/images/reference-cards/homepage-inmail-icon-dsk03.png.original.png"}
    ${"original mcdonalds"}                   | ${"//www.mcdonalds.co.jp/media_library/5009/file.original.webp"}
    ${"original deep"}                        | ${"https://assets.kennislink.nl/system/files/000/251/723/medium_card/ZTF_BH_Merger_webready.original.jpg"}
    ${"original deep 2"}                      | ${"/files/styles/3x2_300w/public/2015-02/147131.original.jpg"}
    ${"original wordpress"}                   | ${"https://videos.files.wordpress.com/LC54dy5y/video-5e49d83688_dvd.original.jpg"}
    ${"original wordpress CDN"}               | ${"https://i0.wp.com/publichealthinsider.com/wp-content/uploads/2020/11/10000000_647691535911012_5337380651829973294_n_std.original.jpg?fit=400%2C224&#038;ssl=1&#038;resize=40%2C40"}
    ${"original PHP"}                         | ${"http://s3-eu-west-1.amazonaws.com/cdn.opinionsystem.fr/system/group/188/logo/f6559083019f26decd46fdc63ae0aeae.original.jpg"}
    ${"original jpeg"}                        | ${"/uploads/inspiration/5dc933480b09d98942159a522233dc3b647b501f.original.jpeg"}
    ${"original uploaded to WordPress"}       | ${"https://parrotbreeders.org/wp-content/uploads/2020/05/home-pasta-2x-2.original.png"}
    ${"original_images on PHP site"}          | ${"/Galerie/ulicy_ploschadi/index_files/original_images/p0000002.jpg"}
    ${"original_images on another PHP site"}  | ${"https://images.fivefourclub.com/images.fivefourclub.com/images/original_images/o_category-tiles-shirts-v2-5ea23b242e9a8.jpg"}
    ${"original_images on asiaone"}           | ${"https://media.asiaone.com/sites/default/files/styles/revamptallcard/public/original_images/Nov2020/20201112_celeb_reuters.jpg?h=b69bd7d9&itok=z9ydcrN6"}
    ${"original_images imgix"}                | ${"https://su.imgix.net/original_images/dd0fb02e668c4c63bc46522963a28afa"}
    ${"original_images monde diplo"}          | ${"https://monde-diplomatique.de/images/product_images/original_images/243891_0.jpg"}
    ${"original_images meincupcake.de"}       | ${"https://www.meincupcake.de/shop/images/product_images/original_images/russian_magnolia_tuelle.jpg"}
    ${"original_images Django"}               | ${"https://cdn.lazyone.com/CACHE/images/original_images/PlaidPackOceanPack/bff4e9094025e9c5ed07765ea07146ef.jpg"}
    ${"original_images pixtruder"}            | ${"//s3.amazonaws.com/pixtruder/original_images/bazaar/home.search.bg.jpg"}
    ${"original_images imagekit"}             | ${"https://ik.imagekit.io/theartling/p/original_images/AB_JP_2020_Bulloch_Pryde_Sky_Rocks__Digits_Simon_Lee_Gallery_HK_Installa_9EJ8Q4a.jpg?tr=,w-700,h-376"}
    ${"original_images oc.hu"}                | ${"https://i2.oc.hu/original_images/0x0/auto/bg_hr8joosu.jpg?v=1&hash=6af3b6bed268c677f1e7f57d6d7260b5"}
  `("$label", ({ fragment }) => {
    expect(detectWagtail(fragment)).toBe(false);
  });
});
