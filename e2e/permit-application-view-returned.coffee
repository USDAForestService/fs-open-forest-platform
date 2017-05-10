describe 'Special admin application view returned path', ->
  it 'should say Received Application in the header', ->
    browser.ignoreSynchronization = true
    browser.get 'http://localhost:4200/permit-application-view.html'
    expect(element(By.css('h1')).getText()).toEqual 'Received Application'
  it 'should not display message requiring explaination for your denial error message by default', ->
    expect(element(By.id('deny-error-message')).isDisplayed()).toBe false
  it 'should display explaination for your denial error message return application button is clicked without providing a reason', ->
    element(By.id('return-application-btn')).click()
    expect(element(By.id('deny-error-message')).isDisplayed()).toBe true
  it 'should indicate application is returned when returned button is clicked if a reason for return is given', ->
    element(By.id('returned-reason')).sendKeys('Reason text')
    element(By.id('return-application-btn')).click()
    expect(element(By.id('permit-status')).getText()).toEqual 'Returned'
    expect(element(By.id('application-review')).isDisplayed()).toBe false
