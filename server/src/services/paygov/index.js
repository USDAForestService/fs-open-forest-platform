/**
 * Public interface to the pay.gov service
 * @module services/paygov
 */
const util = require('../util.es6');
const paygov = require('./paygov.es6');

/**
 * @function - Start a "Collection" with Pay.gov. This returns a temporary, unique identifier for the collection
 * to be used when redirecting the user to the hosted payment page and completing the collection.
 *
 * @param {Object} forest - an instance of christmasTreesForest
 * @param {Object} permit - an instance of christmasTreesPermit
 * @return {Promise<String>} Resolves to a Pay.gov token or rejects with an error
 */
const startCollection = async (forest, permit) => {
  paygov.log('info', 'startCollection START', { permitId: permit.permitId });
  paygov.log('info', 'BLARG', { forest });
  let paygovToken;
  try {
    const startCollectionXml = paygov.getXmlStartCollection(forest.forestAbbr, forest.possFinancialId, permit);
    const result = await paygov.postPayGov(startCollectionXml);
    const json = await util.parseXml(result);
    paygovToken = paygov.extractToken(json);
  } catch (error) {
    paygov.log('error', 'startCollection FAILURE', {
      permitId: permit.permitId,
      errorMessage: error.toString(),
      errorDetail: error.detail
    });
    paygov.handleError(error);
  }
  paygov.log('info', 'startCollection SUCCESS', { permitId: permit.permitId, paygovToken });
  return paygovToken;
};

/**
 * @function - Complete a "Collection" with Pay.gov. This returns a unique identifier for the collection
 * to be used when fetching the collection in future.
 *
 * @param {String} paygovTrackingId - a Pay.gov tracking id
 * @return {Promise<String>} Resolves to a Pay.gov tracking id or rejects with an error
 */
const completeCollection = async (paygovToken) => {
  paygov.log('info', 'completeCollection START', { paygovToken });
  let trackingId;
  try {
    const completeCollectionXml = paygov.getXmlToCompleteTransaction(paygovToken);
    const result = await paygov.postPayGov(completeCollectionXml);
    const json = await util.parseXml(result);
    trackingId = paygov.extractTrackingId(json);
  } catch (error) {
    paygov.log('error', 'completeCollection FAILURE', {
      paygovToken,
      errorMessage: error.toString(),
      errorDetail: error.detail
    });
    paygov.handleError(error);
  }
  paygov.log('info', 'completeCollection SUCCESS', { paygovToken, trackingId });
  return trackingId;
};

module.exports = {
  completeCollection,
  returnUrl: paygov.returnUrl,
  startCollection
};
