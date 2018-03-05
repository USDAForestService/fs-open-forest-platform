SRC_DIR='../frontend/src/assets'
DST_DIR='frontend-assets'
CONTENT='/content'
IMG='/img'

if [ -d "$DST_DIR" ]; then rm -Rf $DST_DIR; fi
mkdir -p $DST_DIR
cp -rf $SRC_DIR$CONTENT $DST_DIR$CONTENT
cp -rf $SRC_DIR$IMG $DST_DIR$IMG
