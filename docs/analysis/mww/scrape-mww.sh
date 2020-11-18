#!/usr/bin/env bash

# Fail on first line that fails.
set -e

for i in {1..49}
do
   curl "https://madewithwagtail.org/?page=$i" | grep project__visit >> wagtail-sites.txt
done
