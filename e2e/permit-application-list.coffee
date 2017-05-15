describe 'Special admin applications list', ->
  it 'should say Applications in the header', ->
    browser.ignoreSynchronization = true
    browser.get 'http://localhost:4200/permit-application-list.html'
    expect(element(By.css('h1')).getText()).toEqual 'Applications'
