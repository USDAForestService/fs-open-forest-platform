# Security Scan Summary

The following reports were created by OWASP ZAP 2.6 against local instances of the API and web client.

## API

Results: [ZAP Scanning Report](api.pdf) 

The 3 potential format string errors apper to be false positives, as we are able to visit the URLs and receive a 404 response, as expected.

## Web client

Results: [ZAP Scanning Report](frontend.pdf)

X-Frame-Options and X-XSS-Protection headers will be set by the production web server.
