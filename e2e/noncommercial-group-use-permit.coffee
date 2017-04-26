checkFirstPermitHolderAddress = (state) ->
  expect(element(By.id('first-permit-holder-same-address')).isSelected()).toBe(state)
  expect(element(By.id('first-permit-holder-address')).isPresent()).toBe state
  expect(element(By.id('first-permit-holder-address-line-2')).isPresent()).toBe state
  expect(element(By.id('first-permit-holder-city')).isPresent()).toBe state
  expect(element(By.id('first-permit-holder-state')).isPresent()).toBe state
  expect(element(By.id('first-permit-holder-zip')).isPresent()).toBe state

checkForSecondPermitHolder = (state) ->
  expect(element(By.id('second-permit-holder-name')).isPresent()).toBe state
  expect(element(By.id('second-permit-holder-address')).isPresent()).toBe state
  expect(element(By.id('second-permit-holder-address-line-2')).isPresent()).toBe state
  expect(element(By.id('second-permit-holder-city')).isPresent()).toBe state
  expect(element(By.id('second-permit-holder-state')).isPresent()).toBe state
  expect(element(By.id('second-permit-holder-zip')).isPresent()).toBe state

describe 'Apply for a noncommercial group use permit', ->
  it 'should display the permit name in the header', ->
    browser.get 'http://localhost:4200/application-noncommercial-group.html'
    expect(element(By.css('h1')).getText()).toEqual 'Apply for a noncommercial group use permit'
  it 'should default the "Permit holder address same as group address checkbox" to checked', ->
    expect(element(By.id('first-permit-holder-same-address')).isSelected()).toBe(true)
  it 'should not display the custom address fields for the permit holder', ->
    checkFirstPermitHolderAddress false
  it 'should display new address fields when the "Permit holder address same as group address" checkbox is unchecked', ->
    element(By.id('first-permit-holder-same-address')).click()
    checkFirstPermitHolderAddress true
  it 'should re-hide the custom address fields for the permit holder when the "Permit holder address same as group address" checkbox is rechecked', ->
    element(By.id('first-permit-holder-same-address')).click()
    checkFirstPermitHolderAddress false
  it 'should display a new permit holder name when the Add new permit holder button is clicked', ->
    element(By.id('add-permit-holder')).click()
    expect(element(By.id('second-permit-holder-name')).isPresent()).toBe true
    checkForSecondPermitHolder true
  it 'should display new address fields when the "Permit holder address same as group address" checkbox is unchecked for new permit holder', ->
    element(By.id('second-permit-holder-same-address')).click()
    expect(element(By.id('second-permit-holder-same-address')).isSelected()).toBe(false)
    checkForSecondPermitHolder false
  it 'should hide new address fields when the "Permit holder address same as group address" checkbox is unchecked for new permit holder', ->
    element(By.id('second-permit-holder-same-address')).click()
    checkForSecondPermitHolder true
  it 'should hide second permit holder if second permit holder remove button is clicked', ->
    element(By.id('hide-secondary-permit-holder')).click()
    checkForSecondPermitHolder false

    # TODO: test validation once implemented on angular
