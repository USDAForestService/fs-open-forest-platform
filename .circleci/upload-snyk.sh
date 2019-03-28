sudo apt-get install -y awscli
echo "uploading snyk"
export STORE_BUCKET=`echo "${LOG_S3}" | jq -r .bucket`
export AWS_ACCESS_KEY_ID=`echo "${LOG_S3}" | jq -r .access_key_id`
export AWS_SECRET_ACCESS_KEY=`echo "${LOG_S3}" | jq -r .secret_access_key`
export AWS_DEFAULT_REGION=`echo "${LOG_S3}" | jq -r .region`
aws s3 cp "${SNYK_DIR}/${SNYK_REPORT}" "s3://${STORE_BUCKET}/${SNYK_REPORT}"
