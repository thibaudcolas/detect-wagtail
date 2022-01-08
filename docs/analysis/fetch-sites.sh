#!/usr/bin/env bash

while IFS= read -r line
do
  echo "$line"
  file=$line
  file="${file/http\:\/\//}"
  file="${file/https\:\/\//}"
  file="${file/\//}"
  curl -sL --max-time 15 --connect-timeout 5 --speed-time 15 --speed-limit 1000 "$line" > "$2/$file.html"
done < "./$1"
