export BUCKET=`echo "${AWS_CONFIG}" | jq -r .s3[0].credentials.bucket`
export AWS_ACCESS_KEY_ID=`echo "${AWS_CONFIG}" | jq -r .s3[0].credentials.access_key_id`
export AWS_SECRET_ACCESS_KEY=`echo "${AWS_CONFIG}" | jq -r .s3[0].credentials.secret_access_key`
export AWS_DEFAULT_REGION=`echo "${AWS_CONFIG}" | jq -r .s3[0].credentials.region`
aws s3 rm s3://"${BUCKET}" --recursive
