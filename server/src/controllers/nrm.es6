/**
 * Module for feedback API to retrieve openforest feedback
 * @module controllers/nrm-service
 */
const forestsDb = require('../models/forests.es6');

const nrm = {};

nrm.getSpeciesCode = (region) => {
  let code = '';
  switch (region) {
    case '1':
      code = 'FW';
      break;

    case '2':
      code = 'CSFW';
      break;

    case '8':
      code = 'HDW';
      break;

    case '9':
      code = 'MH';
      break;

    default:
      break;
  }
  return code;
};

// get all permits that have not been processed by NRM yet
nrm.getUnprocessedPermits = async (req, res) => {
  const preparedPermits = [];
  const query = {
    where: {
      processed: false
    },
    include: [{
      model: forestsDb.fsForests
    }]
  };

  try {
    // when we need to accomodate more permit types,
    // we can update this next line to filter for
    // certain types of permits, or default to 'all'
    const unprocessed = await forestsDb.firewoodPermits.findAll(query);
    for (let x = 0; x < unprocessed.length; x += 1) {
      const permit = unprocessed[x];
      // convert permit number to string to generate preparedPermit.issueNumber
      const permitNumberString = permit.permitNumber.toString();
      let issueNumber = `${permitNumberString[permitNumberString.length - 1]}`;
      issueNumber += `${permitNumberString[permitNumberString.length - 2]}`;
      issueNumber += `${permitNumberString[permitNumberString.length - 3]}`;

      // prepare the permit object to be processed by NRM
      // as required by their specifications
      const rawSpuInfo = {
        lineItemNumber: 1,
        speciesCode: nrm.getSpeciesCode(permit.fsForest.region),
        productCode: '07',
        uomCode: '02',
        soldQuantity: '01',
        rate: '$5.00',
        yieldComponentCode: 'CD',
        mbfConvFactor: '02',
        ccfConvFactor: '02'
      };
      const preparedPermit = {
        nrmEntry: permit.permitId,
        permitCn: `OF${permit.permitNumber}`,
        regionName: null,
        regionCode: permit.fsForest.region,
        forestName: permit.fsForest.forestName,
        forestCode: permit.fsForest.id,
        districtCode: null,
        districtName: null,
        planCn: `OF${permit.fsForest.id}${permit.fsForest.region}01`,
        planNo: `10${permit.fsForest.id}${permit.fsForest.region}01`,
        planDescription: 'OF Firewood Permits',
        issueNumber,
        issueDate: permit.createdAt,
        permUseCode: 2,
        percentOfSalvageVolume: 25,
        percentOfCwk2Volume: 25,
        percentOfCflrVolume: 25,
        percentOfNftmVolume: 25,
        stateCode: permit.fsForest.stateFips,
        stateName: permit.fsForest.state,
        numberOfPermits: 1,
        convertibleNonConvertible: 'c',
        spuInfo: JSON.stringify(rawSpuInfo)
      };
      preparedPermits.push(preparedPermit);
    }
    return res.status(200).json(preparedPermits);
  } catch (error) {
    return res.status(400).json(error);
  }
};

nrm.updateUnprocessedPermits = async (req, res) => {
  try {
    // when we need to accomodate more permit types,
    // we can update this next line to pass in a parameter to specify
    // a certain type of permit as a filter
    // i.e. ['firewood', 'huckleberry', 'christmasTree', 'all', ...]
    const permits = await forestsDb.firewoodPermits.update({
      processed: true
    }, {
      where: {
        processed: false
      },
      returning: true
    });
    return res.status(200).json(permits);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = nrm;
