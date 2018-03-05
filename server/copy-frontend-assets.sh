SRC_DIR='../frontend/src/assets'
DST_DIR='frontend-assets'
CONTENT='/content'
IMG='/img'

rm -r $DST_DIR
mkdir -p $DST_DIR
cp -r $SRC_DIR$CONTENT $DST_DIR$CONTENT
cp -r $SRC_DIR$IMG $DST_DIR$IMG
