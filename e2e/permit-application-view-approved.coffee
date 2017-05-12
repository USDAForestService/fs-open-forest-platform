describe 'Special admin application view approved path', ->
  it 'should say Received Application in the header', ->
    browser.ignoreSynchronization = true
    browser.get 'http://localhost:4200/permit-application-view.html'
    expect(element(By.css('h1')).getText()).toEqual 'Received Application'
  it 'should not show a permit status', ->
    expect(element(By.id('permit-status')).getText()).toEqual ''
  it 'should display application action froms', ->
    expect(element(By.id('application-review')).isDisplayed()).toBe true
  it 'should indicate application is approved when approved button is clicked', ->
    element(By.id('approve-application-btn')).click()
    expect(element(By.id('permit-status')).getText()).toEqual 'Approved'
    expect(element(By.id('application-review')).isDisplayed()).toBe false
