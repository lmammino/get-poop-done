#!/usr/bin/env bash
set -e

CURRENT_PATH=`dirname "$(realpath $0)"`

if [ -d "build" ]; then
  rm -rf build
  echo "👍  Cleaned up old build dir"
fi

TO_BUILD=(
    "01-external-dependencies"
    "02-concatenated-vendors"
    "03-advanced-concatenated-vendors"
    "04-webpack"
    "05-es2015-modules-webpack"
    "06-optimize-webpack"
  )

mkdir -p build

for i in "${TO_BUILD[@]}"
do
  cd "${CURRENT_PATH}/src/${i}"
  npm install
  npm run build
  echo "👍  Built ${i}"

	cd "${CURRENT_PATH}"
done

echo ""
echo "👍  Completed!"
