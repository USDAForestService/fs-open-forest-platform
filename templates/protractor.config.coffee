module.exports =
  config:
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
      '../e2e/noncommercial-group-use-permit.coffee',
      '../e2e/index.coffee',
      '../e2e/permit-application-list.coffee'
      '../e2e/permit-application-view-approved.coffee',
      '../e2e/permit-application-view-returned.coffee',
      '../e2e/permit-guidance-flow-regular-person.coffee',
      '../e2e/permit-guidance-flow-regular-person-friends-and-family.coffee',
      '../e2e/permit-guidance-flow-step-1.coffee',
      '../e2e/permit-guidance-flow-step-2.coffee'
    ]
