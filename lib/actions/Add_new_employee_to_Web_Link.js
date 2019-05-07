/**
 * Auto-generated action file for "Paylocity" API.
 *
 * Generated at: 2019-05-07T14:43:38.380Z
 * Mass generator version: 1.1.0
 *
 * flowground :- Telekom iPaaS / paylocity-com-connector
 * Copyright © 2019, Deutsche Telekom AG
 * contact: flowground@telekom.de
 *
 * All files of this connector are licensed under the Apache 2.0 License. For details
 * see the file LICENSE on the toplevel directory.
 *
 *
 * Operation: 'Add new employee to Web Link'
 * Endpoint Path: '/v2/weblinkstaging/companies/{companyId}/employees/newemployees'
 * Method: 'post'
 *
 */

const Swagger = require('swagger-client');
const processWrapper = require('../services/process-wrapper');
const spec = require('../spec.json');

// this wrapers offers a simplified emitData(data) function
module.exports.process = processWrapper(processAction);

// parameter names for this call
const PARAMETERS = [
    "Authorization",
    "companyId"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "Authorization": "Authorization",
    "companyId": "companyId",
    "additionalDirectDeposit": "additionalDirectDeposit",
    "benefitSetup": "benefitSetup",
    "birthDate": "birthDate",
    "customBooleanFields": "customBooleanFields",
    "customDateFields": "customDateFields",
    "customDropDownFields": "customDropDownFields",
    "customNumberFields": "customNumberFields",
    "customTextFields": "customTextFields",
    "departmentPosition": "departmentPosition",
    "disabilityDescription": "disabilityDescription",
    "employeeId": "employeeId",
    "ethnicity": "ethnicity",
    "federalTax": "federalTax",
    "firstName": "firstName",
    "fitwExemptReason": "fitwExemptReason",
    "futaExemptReason": "futaExemptReason",
    "gender": "gender",
    "homeAddress": "homeAddress",
    "isEmployee943": "isEmployee943",
    "isSmoker": "isSmoker",
    "lastName": "lastName",
    "localTax": "localTax",
    "mainDirectDeposit": "mainDirectDeposit",
    "maritalStatus": "maritalStatus",
    "medExemptReason": "medExemptReason",
    "middleName": "middleName",
    "nonPrimaryStateTax": "nonPrimaryStateTax",
    "preferredName": "preferredName",
    "primaryPayRate": "primaryPayRate",
    "primaryStateTax": "primaryStateTax",
    "priorLastName": "priorLastName",
    "salutation": "salutation",
    "sitwExemptReason": "sitwExemptReason",
    "ssExemptReason": "ssExemptReason",
    "ssn": "ssn",
    "status": "status",
    "suffix": "suffix",
    "suiExemptReason": "suiExemptReason",
    "suiState": "suiState",
    "taxDistributionCode1099R": "taxDistributionCode1099R",
    "taxForm": "taxForm",
    "veteranDescription": "veteranDescription",
    "badgeNumber": "badgeNumber",
    "chargeRate": "chargeRate",
    "isTimeLaborEnabled": "isTimeLaborEnabled",
    "webTime": "webTime",
    "workAddress": "workAddress",
    "workEligibility": "workEligibility",
    "requestBody": "requestBody"
};

function processAction(msg, cfg) {
    var isVerbose = process.env.debug || cfg.verbose;

    if (isVerbose) {
        console.log(`---MSG: ${JSON.stringify(msg)}`);
        console.log(`---CFG: ${JSON.stringify(cfg)}`);
        console.log(`---ENV: ${JSON.stringify(process.env)}`);
    }

    const contentType = 'application/json';

    const body = msg.body;
    mapFieldNames(body);

    let parameters = {};
    for(let param of PARAMETERS) {
        parameters[param] = body[param];
    }

    // credentials for this operation
    let securities = {};
    securities['paylocity_auth'] = {token: cfg['paylocity_auth']};

    let callParams = {
        spec: spec,
        operationId: 'Add new employee to Web Link',
        pathName: '/v2/weblinkstaging/companies/{companyId}/employees/newemployees',
        method: 'post',
        parameters: parameters,
        requestContentType: contentType,
        requestBody: body.requestBody,
        securities: {authorized: securities},
        server: spec.servers[cfg.server] || cfg.otherServer,
    };

    if (isVerbose) {
        let out = Object.assign({}, callParams);
        out.spec = '[omitted]';
        console.log(`--SWAGGER CALL: ${JSON.stringify(out)}`);
    }

    // Call operation via Swagger client
    return Swagger.execute(callParams).then(data => {
        // emit a single message with data
        this.emitData(data);

        // if the response contains an array of entities, you can emit them one by one:

        // data.obj.someItems.forEach((item) => {
        //     this.emitData(item);
        // }
    });
}

function mapFieldNames(obj) {
    if(Array.isArray(obj)) {
        obj.forEach(mapFieldNames);
    }
    else if(typeof obj === 'object' && obj) {
        Object.keys(obj).forEach(key => {
            mapFieldNames(obj[key]);

            let goodKey = FIELD_MAP[key];
            if(goodKey && goodKey !== key) {
                obj[goodKey] = obj[key];
                delete obj[key];
            }
        });
    }
}