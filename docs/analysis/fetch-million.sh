#!/usr/bin/env bash

while IFS= read -r line
do
  echo "$line"
   curl -sL --max-time 5 --connect-timeout 2 --speed-time 15 --speed-limit 1000 "$line" > "./sites/$line.html"
done < "./$1"
