/* eslint-disable no-unused-expressions */
const chai = require('chai');
const sinon = require('sinon');

const permitSvgService = require('../../src/services/christmas-trees-permit-svg-util.es6');
const permitService = require('../../src/services/permit-service.es6');

const christmasTreeForestFactory = require('../data/christmas-trees-forest-factory.es6');
const christmasTreePermitFactory = require('../data/christmas-trees-permit-factory.es6');

const emailSendStub = require('../common.es6');

const { expect } = chai;

describe('unit tests for xmas tree controller', () => {
  it('should send and email and generate rules', (done) => {
    const permitApplication = christmasTreePermitFactory.create({
      firstName: 'Bonny',
      lastName: 'Clyde',
      forestId: 3,
      orgStructureCode: '11-06-06',
      christmasTreesForest: christmasTreeForestFactory.create({
        forestAbbr: 'mthood'
      })
    });
    const buf = Buffer.from('abc');
    const permitStub = sinon.stub(permitSvgService, 'generatePng').resolves(buf);

    permitService.generateRulesAndEmail(permitApplication)
      .then((data) => {
        expect(permitStub.called).to.be.true;
        expect(emailSendStub.called).to.be.true;
        expect(emailSendStub.getCall(0).args[4]).to.have.length(6);
        expect(data).to.equal();
        done();

        permitStub.restore();
      });
  });
});
