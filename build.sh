#!/bin/bash
PROJECT_NAME=SecretMe
SCHEME_NAME=SecretMe
STARTTIME=$(date +%s);

set -e
set -x

### Install dependencies
echo "--- Install dependencies [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

/usr/local/bin/npm install
/usr/local/bin/bower install

### Restore ionic platforms
### echo "--- Restore ionic platforms [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

### /usr/local/bin/ionic state restore

### Build
### echo "--- Build [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

### /usr/local/bin/gulp sass
### /usr/local/bin/gulp build

### Moving to ios build directory
echo "--- Moving to ios build directory [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

cd platforms/ios

### Cleaning Xcode
echo "--- Cleaning Xcode [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

/usr/bin/xcodebuild clean      \
    -project $PROJECT_NAME.xcodeproj  \
    -configuration Debug       \
    -alltargets

### Archiving
echo "--- Archiving [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

/usr/bin/xcodebuild archive           \
    -project $PROJECT_NAME.xcodeproj  \
    -scheme $SCHEME_NAME              \
    -archivePath $PROJECT_NAME

### Uploading to Hockeyapp
### echo "--- Uploading to Hockeyapp [Time Elapsed $(($(date +%s) - $STARTTIME))s]"

### /usr/local/bin/puck                      \
###    -notes_path=../../RELEASE_NOTES.md   \
###    -notes_type=markdown                 \
###    -submit=auto                         \
###    -download=true                       \
###    -mandatory=true                      \
###    -notify=true                         \
###    -force=true                          \
###    $PROJECT_NAME.xcarchive

### Summary
echo "-- Total time $(($(date +%s) - $STARTTIME))s"
