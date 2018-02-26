aws s3 ls s3://$($S3 | jq '.[bucke_name]')
