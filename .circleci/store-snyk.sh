export DATE_STRING=`date +"%m-%d-%Y-%H"`
export SNYK_REPORT_SERVER=snyk-${CIRCLE_PR_REPONAME}-server-${DATE_STRING}.csv
export SNYK_REPORT_FRONTEND=snyk-${CIRCLE_PR_REPONAME}-frontend-${DATE_STRING}.csv

export STORE_BUCKET=`echo "${LOG_S3}" | jq -r .bucket`
export AWS_ACCESS_KEY_ID=`echo "${LOG_S3}" | jq -r .access_key_id`
export AWS_SECRET_ACCESS_KEY=`echo "${LOG_S3}" | jq -r .secret_access_key`
export AWS_DEFAULT_REGION=`echo "${LOG_S3}" | jq -r .region`
aws s3 cp "snyk/${SNYK_REPORT_SERVER}" s3://"${STORE_BUCKET}"/"${SNYK_REPORT_SERVER}"
aws s3 cp "snyk/${SNYK_REPORT_FRONTEND}" s3://"${STORE_BUCKET}"/"${SNYK_REPORT_FRONTEND}"