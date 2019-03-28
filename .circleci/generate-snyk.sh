export SNYK_REPORT_SERVER=snyk-${CIRCLE_PROJECT_REPONAME}-server-${DATE_STRING}.csv
export SNYK_REPORT_FRONTEND=snyk-${CIRCLE_PROJECT_REPONAME}-frontend-${DATE_STRING}.csv

mkdir -p a=rw snyk
echo "running frontend snyk"
sudo npm install -g snyk
cd frontend
snyk test --json > ../snyk/snyk-frontend.json
sudo cat ../snyk/snyk-frontend.json  \
| jq -r '["App","Package", "CVE", "CWE", "Severity", "CVSSScore", "Title", "Disclosure Time", "Description", "Library Path Parent", "Library Path Child"], (.vulnerabilities[] | ["frontend", .packageName, .identifiers.CVE[0], .identifiers.CWE[0], .severity, .cvssScore, .title,.disclosureTime, .description, .from[1], .from[2]] )| @csv' >  \
"../${SNYK_DIR}/${SNYK_REPORT_FRONTEND}"
echo "running server snyk"
cd ../server
npm run snyk-protect
snyk test --json > ../snyk/snyk-server.json
sudo cat ../snyk/snyk-server.json  \
| jq -r '(.vulnerabilities[] | ["server", .packageName, .identifiers.CVE[0], .identifiers.CWE[0], .severity, .cvssScore, .title,.disclosureTime, .description, .from[1], .from[2]] )| @csv' >  \
"../${SNYK_DIR}/${SNYK_REPORT_SERVER}"
cd ..

cat "./${SNYK_DIR}/${SNYK_REPORT_FRONTEND}" "./${SNYK_DIR}/${SNYK_REPORT_SERVER}" > "${SNYK_DIR}/${SNYK_REPORT}"
