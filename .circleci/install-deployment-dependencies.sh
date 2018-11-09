#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

cd frontend
npm install

cd ../server
npm install
npm install snyk
