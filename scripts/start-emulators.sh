#!/bin/bash

# this is in a script file because escaping this stuff in package.json is a pain
firebase --project=test emulators:start --import .emulator-data --export-on-exit --only firestore "$@" 2> >(grep -Ev 'lsof|Output information may be incomplete|assuming "dev=.*" from mount table' >&2)
