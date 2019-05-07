# ![LOGO](logo.png) Paylocity **flow**ground Connector

## Description

A generated **flow**ground connector for the Paylocity API (version 2).

Generated from: https://api.apis.guru/v2/specs/paylocity.com/2/swagger.json<br/>
Generated at: 2019-05-07T17:43:38+03:00

## API Description

For general questions and support of the API, contact: webservices@paylocity.com
# Overview

Paylocity Web Services API is an externally facing RESTful Internet protocol. The Paylocity API uses HTTP verbs and a RESTful endpoint structure. OAuth 2.0 is used as the API Authorization framework. Request and response payloads are formatted as JSON.
Paylocity supports v1 and v2 versions of its API endpoints. v1, while supported, won't be enhanced with additional functionality. For direct link to v1 documentation, please click [here](https://docs.paylocity.com/weblink/guides/Paylocity_Web_Services_API/v1/Paylocity_Web_Services_API.htm). For additional resources regarding v1/v2 differences and conversion path, please contact webservices@paylocity.com.

##### Setup

Paylocity will provide the secure client credentials and set up the scope (type of requests and allowed company numbers). You will receive the unique client id, secret, and Paylocity public key for the data encryption. The secret will expire in 365 days. 
* Paylocity will send you an e-mail 10 days prior to the expiration date for the current secret. If not renewed, the second e-mail notification will be sent 5 days prior to secret's expiration. Each email will contain the code necessary to renew the client secret. 
* You can obtain the new secret by calling API endpoint using your current not yet expired credentials and the code that was sent with the notification email. For details on API endpoint, please see Client Credentials section. 
* Both the current secret value and the new secret value will be recognized during the transition period. After the current secret expires, you must use the new secret. 
* If you were unable to renew the secret via API endpoint, you can still contact Service and they will email you new secret via secure email.


When validating the request, Paylocity API will honor the defaults and required fields set up for the company default New Hire Template as defined in Web Pay.


# Authorization

Paylocity Web Services API uses OAuth2.0 Authentication with JSON Message Format.


All requests of the Paylocity Web Services API require a bearer token which can be obtained by authenticating the client with the Paylocity Web Services API via OAuth 2.0.


The client must request a bearer token from the authorization endpoint:


auth-server for production: https://api.paylocity.com/IdentityServer/connect/token


auth-server for testing: https://apisandbox.paylocity.com/IdentityServer/connect/token

##### Authorization Header

The request is expected to be in the form of a basic authentication request, with the "Authorization" header containing the client-id and client-secret. This means the standard base-64 encoded user:password, prefixed with "Basic" as the value for the Authorization header, where user is the client-id and password is the client-secret.

##### Content-Type Header

The "Content-Type" header is required to be "application/x-www-form-urlencoded".

##### Additional Values

The request must post the following form encoded values within the request body:

    grant_type = client_credentials
    scope = WebLinkAPI

##### Responses

Success will return HTTP 200 OK with JSON content:

    {
      "access_token": "xxx",
      "expires_in": 3600,
      "token_type": "Bearer"
    }

# Encryption

Paylocity uses a combination of RSA and AES cryptography. As part of the setup, each client is issued a public RSA key.

Paylocity recommends the encryption of the incoming requests as additional protection of the sensitive data. Clients can opt-out of the encryption during the initial setup process. Opt-out will allow Paylocity to process unencrypted requests.

The Paylocity Public Key has the following properties:

* 2048 bit key size

* PKCS1 key format

* PEM encoding

##### Properties

* key (base 64 encoded): The AES symmetric key encrypted with the Paylocity Public Key. It is the key used to encrypt the content. Paylocity will decrypt the AES key using RSA decryption and use it to decrypt the content.

* iv (base 64 encoded): The AES IV (Initialization Vector) used when encrypting the content.

* content (base 64 encoded): The AES encrypted request. The key and iv provided in the secureContent request are used by Paylocity for decryption of the content.

We suggest using the following for the AES:

* CBC cipher mode

* PKCS7 padding

* 128 bit block size

* 256 bit key size

##### Encryption Flow

* Generate the unencrypted JSON payload to POST/PUT
* Encrypt this JSON payload using your _own key and IV_ (NOT with the Paylocity public key)
* RSA encrypt the _key_ you used in step 2 with the Paylocity Public Key, then, base64 encode the result
* Base64 encode the IV used to encrypt the JSON payload in step 2
* Put together a "securecontent" JSON object:
 
{
  'secureContent' : {
    'key' : -- RSA-encrypted & base64 encoded key from step 3,
    'iv' : -- base64 encoded iv from step 4
    'content' -- content encrypted with your own key from step 2, base64 encoded
  }
}

##### Sample Example

    {
      "secureContent": {
        "key": "eS3aw6H/qzHMJ00gSi6gQ3xa08DPMazk8BFY96Pd99ODA==",
        "iv": "NLyXMGq9svw0XO5aI9BzWw==",
        "content": "gAEOiQltO1w+LzGUoIK8FiYbU42hug94EasSl7N+Q1w="
      }
    }

##### Sample C# Code

    using Newtonsoft.Json;
    using System;
    using System.IO;
    using System.Security.Cryptography;
    using System.Text;

    public class SecuredContent
    {
      [JsonProperty("key")]
      public string Key { get; set; }

      [JsonProperty("iv")]
      public string Iv { get; set; }

      [JsonProperty("content")]
      public string Content { get; set; }

    }

    public class EndUserSecureRequestExample
    {
      public string CreateSecuredRequest(FileInfo paylocityPublicKey, string unsecuredJsonRequest)
      {
        string publicKeyXml = File.ReadAllText(paylocityPublicKey.FullName, Encoding.UTF8);

        SecuredContent secureContent = this.CreateSecuredContent(publicKeyXml, unsecuredJsonRequest);

        string secureRequest = JsonConvert.SerializeObject(new { secureContent });

        return secureRequest;
      }

      private SecuredContent CreateSecuredContent(string publicKeyXml, string request)
      {
        using (AesCryptoServiceProvider aesCsp = new AesCryptoServiceProvider())
        {
          aesCsp.Mode = CipherMode.CBC;
          aesCsp.Padding = PaddingMode.PKCS7;
          aesCsp.BlockSize = 128;
          aesCsp.KeySize = 256;

          using (ICryptoTransform crt = aesCsp.CreateEncryptor(aesCsp.Key, aesCsp.IV))
          {
            using (MemoryStream outputStream = new MemoryStream())
            {
              using (CryptoStream encryptStream = new CryptoStream(outputStream, crt, CryptoStreamMode.Write))
              {
                byte[] encodedRequest = Encoding.UTF8.GetBytes(request);
                encryptStream.Write(encodedRequest, 0, encodedRequest.Length);
                encryptStream.FlushFinalBlock();
                byte[] encryptedRequest = outputStream.ToArray();

                using (RSACryptoServiceProvider crp = new RSACryptoServiceProvider())
                {
                  crp.FromXmlstring(publicKeyXml);
                  byte[] encryptedKey = crp.Encrypt(aesCsp.Key, false);

                  return new SecuredContent()
                  {
                    Key = Convert.ToBase64string(encryptedKey),
                    Iv = Convert.ToBase64string(aesCsp.IV),
                    Content = Convert.ToBase64string(encryptedRequest)
                  };
                }
              }
            }
          }
        }
      }
    }

## Support

Questions about using the Paylocity API? Please contact webservices@paylocity.com.

# Deductions (v1)

Deductions API provides endpoints to retrieve, add, update and delete deductions for a company's employees. For schema details, click <a href="https://docs.paylocity.com/weblink/guides/Paylocity_Web_Services_API/v1/Paylocity_Web_Services_API.htm" target="_blank">here</a>.

# OnBoarding (v1)

Onboarding API sends employee data into Paylocity Onboarding to help ensure an easy and accurate hiring process for subsequent completion into Web Pay. For schema details, click <a href="https://docs.paylocity.com/weblink/guides/Paylocity_Web_Services_API/v1/Paylocity_Web_Services_API.htm" target="_blank">here</a>.

## Authorization

Supported authorization schemes:
- OAuth2

For OAuth 2.0 you need to specify OAuth Client credentials as environment variables in the connector repository:
* `OAUTH_CLIENT_ID` - your OAuth client id
* `OAUTH_CLIENT_SECRET` - your OAuth client secret

## Actions

### Get All Company Codes

> Get All Company Codes for the selected company and resource

*Tags:* `Company Codes`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `codeResource` - _required_ - Type of Company Code. Common values costcenter1, costcenter2, costcenter3, deductions, earnings, taxes, paygrade, positions.

### Get All Custom Fields

> Get All Custom Fields for the selected company

*Tags:* `Custom Fields`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `category` - _required_ - Custom Fields Category

### Add new employee

> New Employee API sends new employee data directly to Web Pay. Companies who use the New Hire Template in Web Pay may require additional fields when hiring employees. New Employee API Requests will honor these required fields.

*Tags:* `Employee`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id

### Get all employees

> Get All Employees API will return employee data currently available in Web Pay.

*Tags:* `Employee`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `pagesize` - _optional_ - Number of records per page. Default value is 25.
* `pagenumber` - _optional_ - Page number to retrieve; page numbers are 0-based (so to get the first page of results, pass pagenumber=0). Default value is 0.
* `includetotalcount` - _optional_ - Whether to include the total record count in the header's X-Pcty-Total-Count property. Default value is true.

### Get employee

> Get Employee API will return employee data currently available in Web Pay.

*Tags:* `Employee`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Update employee

> Update Employee API will update existing employee data in WebPay.

*Tags:* `Employee`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Add/update additional rates

> Sends new or updated employee additional rates information directly to Web Pay.

*Tags:* `Additional Rates`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Add/update employee's benefit setup

> Sends new or updated employee benefit setup information directly to Web Pay.

*Tags:* `Employee Benefit Setup`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Get All Earnings

> Get All Earnings returns all earnings for the selected employee.

*Tags:* `Earnings`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Add/Update Earning

> Add/Update Earning API sends new or updated employee earnings information directly to Web Pay.

*Tags:* `Earnings`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Get Earnings by Earning Code

> Get Earnings returns all earnings with the provided earning code for the selected employee.

*Tags:* `Earnings`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id
* `earningCode` - _required_ - Earning Code

### Delete Earning by Earning Code and Start Date

*Tags:* `Earnings`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id
* `earningCode` - _required_ - Earning Code
* `startDate` - _required_ - Start Date

### Get Earning by Earning Code and Start Date

> Get Earnings returns the single earning with the provided earning code and start date for the selected employee.

*Tags:* `Earnings`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id
* `earningCode` - _required_ - Earning Code
* `startDate` - _required_ - Start Date

### Get all local taxes

> Returns all local taxes for the selected employee.

*Tags:* `Local Taxes`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Add new local tax

> Sends new employee local tax information directly to Web Pay.

*Tags:* `Local Taxes`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Delete local tax by tax code

*Tags:* `Local Taxes`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id
* `taxCode` - _required_ - Tax Code

### Get local taxes by tax code

> Returns all local taxes with the provided tax code for the selected employee.

*Tags:* `Local Taxes`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id
* `taxCode` - _required_ - Tax Code

### Add/update non-primary state tax

> Sends new or updated employee non-primary state tax information directly to Web Pay.

*Tags:* `Non-Primary State Tax`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Add/update primary state tax

> Sends new or updated employee primary state tax information directly to Web Pay.

*Tags:* `Primary State Tax`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id
* `employeeId` - _required_ - Employee Id

### Get Company-Specific Open API Documentation

> The company-specific Open API endpoint allows the client to GET an Open API document for the Paylocity API that is customized with company-specific resource schemas. These customized resource schemas define certain properties as enumerations of pre-defined values that correspond to the company's setup with Web Pay. The customized schemas also indicate which properties are required by the company within Web Pay.<br  />To learn more about Open API, click [here](https://www.openapis.org/)

*Tags:* `Company-Specific Schema`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id

### Obtain new client secret.

> Obtain new client secret for Paylocity-issued client id. See Setup section for details.

*Tags:* `Client Credentials`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT

### Add new employee to Web Link

> Add new employee to Web Link will send partially completed or potentially erroneous new hire record to Web Link, where it can be corrected and competed by company administrator or authorized Paylocity Service Bureau employee.

*Tags:* `Employee Staging`

#### Input Parameters
* `Authorization` - _required_ - Bearer + JWT
* `companyId` - _required_ - Company Id

## License

**flow**ground :- Telekom iPaaS / paylocity-com-connector<br/>
Copyright © 2019, [Deutsche Telekom AG](https://www.telekom.de)<br/>
contact: flowground@telekom.de

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
