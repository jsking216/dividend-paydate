#!/bin/sh

export PATH="$PATH:"/usr/local/bin/
CHROMEVER=$(curl "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$(Google\ Chrome --version | sed -E -n 's/^.* (([0-9]+\.){2}[0-9]+).*$/\1/p')")
cd /Users/jking/personal/dividend-paydate
CHROMEDRIVER_VERSION=$CHROMEVER ./node_modules/.bin/babel-node index.js 
