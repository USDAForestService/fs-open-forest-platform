describe 'Apply for a noncommercial group use permit', ->
  it 'should display the permit name in the header', ->
    browser.get 'http://localhost:4200/application-noncommercial-group.html'
    expect(element(By.css('h1')).getText()).toEqual 'Apply for a noncommercial group use permit'
  it 'should default the "Permit holder address same as group address checkbox" to checked', ->
    # TODO: use selenium to check status of the checkbox
  it 'should not display the custon address fields for the permit holder', ->
    # TODO: address should not be present
    # TODO: address 2 should not be present
    # TODO: city should not be present
    # TODO: state should not be present
    # TODO: zip should not be present
  it 'should display new address fields when the "Permit holder address same as group address" checkbox is unchecked', ->
    # TODO: use selenium to uncheck the checkbox
    # TODO: address should be present
    # TODO: address 2 should be present
    # TODO: city should be present
    # TODO: state should be present
    # TODO: zip should be present
  it 'should re-hide the custom address fields for the permit holder when the "Permit holder address same as group address" checkbox is rechecked', ->
    # TODO: use selenium to uncheck the checkbox
    # TODO: address should not be present
    # TODO: address 2 should not be present
    # TODO: city should not be present
    # TODO: state should not be present
    # TODO: zip should not be present
