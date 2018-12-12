## Christmas tree purchase flow for server
### christmasTree.create
1. check forest is open
2. create permits in db
3. prepare XML to initiate paygov transaction
4. grab token from initiated paygov transaction request
5. update permit with paygov token
    * if pay.gov error will update the permit with an error code
6. return token to user (user window redirected to pay.gov)

### christmasTree.updatePermitApplication
1. find permit
2. verify that permit token is valid (will expire at end of the season)
3. if request to cancel - will cancel
4. If request to complete request, then will completePermitTransaction:
    * prepare XML to completeTransaction
    * sends completion request
    * grabs the paygov tracking ID from the completedTransaction response
    * returnsSavePermit to user
    * generates permit SVG and sends email
5. If permit is errored will return errors.

    