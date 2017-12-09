#!/bin/bash
set -eo pipefail

pushd ${SRCROOT}/..
value=$(cat ~/.expo/PATH)
PATH="$PATH:$value" exp prepare-detached-build --platform ios
popd

