#!/usr/bin/env bash
set -e

deps=(
    "zepto@1.2.0/dist/zepto.min.js"
    "uuidjs@4.0.3/dist/uuid.core.js"
    "store2@2.7.0/dist/store2.min.js"
    "tippy.js@2.2.3/dist/tippy.all.min.js"
    "confetti-js@0.0.11/dist/index.min.js"
    "dom-confetti@0.0.10/lib/main.js"
    "favico.js@0.3.10/favico-0.3.10.min.js"
  )

for i in "${deps[@]}"
do
	curl "https://unpkg.com/${i}"
  echo ";" # extra separator for safety
done
