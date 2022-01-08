#!/usr/bin/env bash

# Fail on first line that fails.
set -e

# TODO Update the range before running!
for i in {1..54}
do
   curl "https://madewithwagtail.org/?page=$i" | grep project__visit >> wagtail-sites.txt
done
