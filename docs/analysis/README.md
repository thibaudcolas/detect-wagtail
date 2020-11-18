# Websites’ analysis

## EU public sector websites

Analysis of the EU national public sector websites from the [We4authors](https://www.funka.com/en/projekt/we4authors/) project.

Based on this analysis, 3 national-level public sector websites are built with Wagtail:

```txt
www.danepubliczne.gov.pl
www.nhs.uk
www.nesta.org.uk
```

To try this out,

```sh
cat most_spread_authoring_tools_in_public_sector_in_eu.csv | cut -d ',' -f 2 > eu.csv
# Download all of the sites’ homepages.
../fetch-sites.sh eu.csv sites
# Optionally you can also split this to download multiple homepages in parallel.
split -l 100 eu.csv
# We’ll then use `ag` to see how many sites match our regex,
ag '\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))' sites --stats-only
# And which sites exactly:
ag '\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))' sites -l
```

## US federal websites

Analysis of the US federal websites from the [digital.gov list](https://github.com/GSA/digitalgov.gov/blob/main/content/resources/content-management-systems-used-by-government-agencies.md).

```txt
fec.gov
www.peacecorps.gov
www.consumerfinance.gov
```

To try this out,

```sh
curl https://raw.githubusercontent.com/GSA/digitalgov.gov/main/content/resources/content-management-systems-used-by-government-agencies.md | grep '](' | cut -d '(' -f 2 | cut -d ')' -f 1 | sort | uniq > us.csv
../fetch-sites us.csv sites
ag '\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))' sites -l
```

## Made with Wagtail

[Made with Wagtail](https://madewithwagtail.org/) is a showcase of a lot of Wagtail sites and apps. About two thirds of sites listed are detected with the following regular expressions.

```sh
ag '\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))' mww --stats-only
# 382 files contained matches
ag '\/media\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height|scale)-\d+|original)\.)' mww --stats-only
# 292 files contained matches
```

## Majestic Million

The [Majestic Million](https://majestic.com/reports/majestic-million) is a dataset of 1M domain names ordered by popularity. We can also use the above methodology to assess how many websites are made with Wagtail on this list (about 0.05%).

```sh
ag '\/media\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min)-\d+x\d+(-c\d+)?|(width|height|scale)-\d+|original)\.)' million --stats-only
# 296 files contained matches
ag '\/(original_images\/[\w-]+\.|images\/[\w-.]+\.((fill|max|min|width|height|scale)-\d|original))' ../detect-wagtail-data/million --stats-only
# 528 files contained matches
```
