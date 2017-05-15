describe 'Permit guidance flow for a regular person with friends and family', ->
  it 'should say apply for a permit in the header', ->
    browser.ignoreSynchronization = true
    browser.get 'http://localhost:4200/permit-guidance-flow-regular-person-friends-and-family.html'
    expect(element(By.css('h1')).getText()).toEqual 'Apply for a Permit'
