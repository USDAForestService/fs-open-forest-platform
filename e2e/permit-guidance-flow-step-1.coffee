describe 'Permit guidance flow step 1', ->
  it 'should say apply for a permit in the header', ->
    browser.ignoreSynchronization = true
    browser.get 'http://localhost:4200/permit-guidance-flow-step-1.html'
    expect(element(By.css('h1')).getText()).toEqual 'Apply for a Permit'
