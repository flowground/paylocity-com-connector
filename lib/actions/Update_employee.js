/**
 * Auto-generated action file for "Paylocity" API.
 *
 * Generated at: 2019-05-07T14:43:38.374Z
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
 * Operation: 'Update employee'
 * Endpoint Path: '/v2/companies/{companyId}/employees/{employeeId}'
 * Method: 'patch'
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
    "companyId",
    "employeeId"
];

// mappings from connector field names to API field names
const FIELD_MAP = {
    "Authorization": "Authorization",
    "companyId": "companyId",
    "employeeId": "employeeId",
    "additionalDirectDeposit": "additionalDirectDeposit",
    "additionalRate": "additionalRate",
    "benefitClass": "benefitClass",
    "benefitClassEffectiveDate": "benefitClassEffectiveDate",
    "benefitSalary": "benefitSalary",
    "benefitSalaryEffectiveDate": "benefitSalaryEffectiveDate",
    "doNotApplyAdministrativePeriod": "doNotApplyAdministrativePeriod",
    "isMeasureAcaEligibility": "isMeasureAcaEligibility",
    "benefitSetup": "benefitSetup",
    "birthDate": "birthDate",
    "companyName": "companyName",
    "currency": "currency",
    "customBooleanFields": "customBooleanFields",
    "customDateFields": "customDateFields",
    "customDropDownFields": "customDropDownFields",
    "customNumberFields": "customNumberFields",
    "customTextFields": "customTextFields",
    "changeReason": "changeReason",
    "clockBadgeNumber": "clockBadgeNumber",
    "costCenter1": "costCenter1",
    "costCenter2": "costCenter2",
    "costCenter3": "costCenter3",
    "effectiveDate": "effectiveDate",
    "employeeType": "employeeType",
    "equalEmploymentOpportunityClass": "equalEmploymentOpportunityClass",
    "isMinimumWageExempt": "isMinimumWageExempt",
    "isOvertimeExempt": "isOvertimeExempt",
    "isSupervisorReviewer": "isSupervisorReviewer",
    "isUnionDuesCollected": "isUnionDuesCollected",
    "isUnionInitiationCollected": "isUnionInitiationCollected",
    "jobTitle": "jobTitle",
    "payGroup": "payGroup",
    "positionCode": "positionCode",
    "reviewerCompanyNumber": "reviewerCompanyNumber",
    "reviewerEmployeeId": "reviewerEmployeeId",
    "shift": "shift",
    "supervisorCompanyNumber": "supervisorCompanyNumber",
    "supervisorEmployeeId": "supervisorEmployeeId",
    "tipped": "tipped",
    "unionAffiliationDate": "unionAffiliationDate",
    "unionCode": "unionCode",
    "unionPosition": "unionPosition",
    "workersCompensation": "workersCompensation",
    "departmentPosition": "departmentPosition",
    "disabilityDescription": "disabilityDescription",
    "ethnicity": "ethnicity",
    "amount": "amount",
    "exemptions": "exemptions",
    "filingStatus": "filingStatus",
    "percentage": "percentage",
    "taxCalculationCode": "taxCalculationCode",
    "federalTax": "federalTax",
    "firstName": "firstName",
    "gender": "gender",
    "address1": "address1",
    "address2": "address2",
    "city": "city",
    "country": "country",
    "county": "county",
    "emailAddress": "emailAddress",
    "mobilePhone": "mobilePhone",
    "phone": "phone",
    "postalCode": "postalCode",
    "state": "state",
    "homeAddress": "homeAddress",
    "isHighlyCompensated": "isHighlyCompensated",
    "isSmoker": "isSmoker",
    "lastName": "lastName",
    "localTax": "localTax",
    "accountNumber": "accountNumber",
    "accountType": "accountType",
    "blockSpecial": "blockSpecial",
    "isSkipPreNote": "isSkipPreNote",
    "nameOnAccount": "nameOnAccount",
    "preNoteDate": "preNoteDate",
    "routingNumber": "routingNumber",
    "mainDirectDeposit": "mainDirectDeposit",
    "maritalStatus": "maritalStatus",
    "middleName": "middleName",
    "exemptions2": "exemptions2",
    "reciprocityCode": "reciprocityCode",
    "specialCheckCalc": "specialCheckCalc",
    "taxCode": "taxCode",
    "nonPrimaryStateTax": "nonPrimaryStateTax",
    "ownerPercent": "ownerPercent",
    "preferredName": "preferredName",
    "annualSalary": "annualSalary",
    "baseRate": "baseRate",
    "beginCheckDate": "beginCheckDate",
    "defaultHours": "defaultHours",
    "isAutoPay": "isAutoPay",
    "payFrequency": "payFrequency",
    "payGrade": "payGrade",
    "payRateNote": "payRateNote",
    "payType": "payType",
    "ratePer": "ratePer",
    "salary": "salary",
    "primaryPayRate": "primaryPayRate",
    "primaryStateTax": "primaryStateTax",
    "priorLastName": "priorLastName",
    "salutation": "salutation",
    "ssn": "ssn",
    "adjustedSeniorityDate": "adjustedSeniorityDate",
    "employeeStatus": "employeeStatus",
    "hireDate": "hireDate",
    "isEligibleForRehire": "isEligibleForRehire",
    "reHireDate": "reHireDate",
    "status": "status",
    "suffix": "suffix",
    "fitwExemptNotes": "fitwExemptNotes",
    "fitwExemptReason": "fitwExemptReason",
    "futaExemptNotes": "futaExemptNotes",
    "futaExemptReason": "futaExemptReason",
    "isEmployee943": "isEmployee943",
    "isPension": "isPension",
    "isStatutory": "isStatutory",
    "medExemptNotes": "medExemptNotes",
    "medExemptReason": "medExemptReason",
    "sitwExemptNotes": "sitwExemptNotes",
    "sitwExemptReason": "sitwExemptReason",
    "ssExemptNotes": "ssExemptNotes",
    "ssExemptReason": "ssExemptReason",
    "suiExemptNotes": "suiExemptNotes",
    "suiExemptReason": "suiExemptReason",
    "suiState": "suiState",
    "taxDistributionCode1099R": "taxDistributionCode1099R",
    "taxForm": "taxForm",
    "taxSetup": "taxSetup",
    "veteranDescription": "veteranDescription",
    "badgeNumber": "badgeNumber",
    "chargeRate": "chargeRate",
    "isTimeLaborEnabled": "isTimeLaborEnabled",
    "webTime": "webTime",
    "location": "location",
    "mailStop": "mailStop",
    "pager": "pager",
    "phoneExtension": "phoneExtension",
    "workAddress": "workAddress",
    "alienOrAdmissionDocumentNumber": "alienOrAdmissionDocumentNumber",
    "attestedDate": "attestedDate",
    "countryOfIssuance": "countryOfIssuance",
    "foreignPassportNumber": "foreignPassportNumber",
    "i94AdmissionNumber": "i94AdmissionNumber",
    "i9DateVerified": "i9DateVerified",
    "i9Notes": "i9Notes",
    "isI9Verified": "isI9Verified",
    "isSsnVerified": "isSsnVerified",
    "ssnDateVerified": "ssnDateVerified",
    "ssnNotes": "ssnNotes",
    "visaType": "visaType",
    "workAuthorization": "workAuthorization",
    "workUntil": "workUntil",
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
        operationId: 'Update employee',
        pathName: '/v2/companies/{companyId}/employees/{employeeId}',
        method: 'patch',
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