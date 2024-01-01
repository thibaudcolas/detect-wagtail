#!/usr/bin/env bash

while IFS= read -r line
do
  echo "$line"
   curl -sL --max-time 5 --connect-timeout 2 --speed-time 15 --speed-limit 1000 "$line" > "./sites/$line.html"
done < "./$1"

while IFS= read -r line
do
  echo "$line"
  file=$line
  file="${file/http\:\/\//}"
  file="${file/https\:\/\//}"
  file="${file/\//}"
  site="https://$file"
  curl --user-agent "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15" -sL --max-time 15 --connect-timeout 5 --speed-time 15 --speed-limit 1000 "$site" > "$2/$file.html"
done < "./$1"
