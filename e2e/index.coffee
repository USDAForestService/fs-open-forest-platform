describe 'US forest service landing page', ->
  it 'should contain a greeting in the header', ->
    browser.ignoreSynchronization = true
    browser.get 'http://localhost:4200/'
    expect(element(By.css('h1')).getText()).toEqual 'Header Placeholder'
  it 'should open a panel explaining what .gov means when heres how you know link is clicked', ->
    #TODO this is resulting in a element not visibile error
    # element(By.id('header-usa-accordion-button')).click()
    # expect(element(By.css('.usa-accordion-content')).isDisplayed()).toBe true
  it 'should display a search input when search is clicked', ->
    #TODO this is resulting in a element not visibile error
    #element(By.id('header-search-button')).click()
    # expect(element(By.id('search-field-small')).isDisplayed()).toBe true
