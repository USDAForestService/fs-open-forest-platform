sudo apt-get install -y awscli
export DATE_STRING=`date +"%m-%d-%Y-%H"`
export SNYK_REPORT_SERVER=snyk-${CIRCLE_PROJECT_REPONAME}-server-${DATE_STRING}.csv
export SNYK_REPORT_FRONTEND=snyk-${CIRCLE_PROJECT_REPONAME}-frontend-${DATE_STRING}.csv
export SNYK_REPORT=snyk-${CIRCLE_PROJECT_REPONAME}-${DATE_STRING}.csv

mkdir -p a=rw snyk
echo "running frontend snyk"
sudo npm install -g snyk
cd frontend
snyk test --json > ../snyk/snyk-frontend.json
sudo cat ../snyk/snyk-frontend.json  \
| jq -r '["App","Package", "CVE", "CWE", "Severity", "CVSSScore", "Title", "Disclosure Time", "Description", "Library Path Parent", "Library Path Child"], (.vulnerabilities[] | ["frontend", .packageName, .identifiers.CVE[0], .identifiers.CWE[0], .severity, .cvssScore, .title,.disclosureTime, .description, .from[1], .from[2]] )| @csv' >  \
"../snyk/${SNYK_REPORT_FRONTEND}"
echo "running server snyk"
cd ../server
yarn run snyk-protect
snyk test --json > ../snyk/snyk-server.json
sudo cat ../snyk/snyk-server.json  \
| jq -r '(.vulnerabilities[] | ["server", .packageName, .identifiers.CVE[0], .identifiers.CWE[0], .severity, .cvssScore, .title,.disclosureTime, .description, .from[1], .from[2]] )| @csv' >  \
"../snyk/${SNYK_REPORT_SERVER}"
cd ..

cat "./snyk/${SNYK_REPORT_FRONTEND}" "./snyk/${SNYK_REPORT_SERVER}" > snyk/"${SNYK_REPORT}"
echo "uploading snyk"

export STORE_BUCKET=`echo "${LOG_S3}" | jq -r .bucket`
export AWS_ACCESS_KEY_ID=`echo "${LOG_S3}" | jq -r .access_key_id`
export AWS_SECRET_ACCESS_KEY=`echo "${LOG_S3}" | jq -r .secret_access_key`
export AWS_DEFAULT_REGION=`echo "${LOG_S3}" | jq -r .region`
aws s3 cp "snyk/${SNYK_REPORT}" s3://"${STORE_BUCKET}"/"${SNYK_REPORT}"
