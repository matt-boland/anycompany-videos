/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["publickey","privateKey"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const ssm = new AWS.SSM({ region: 'us-east-1' });

const SIGNING_URL = 'd69f1z2duoru5.cloudfront.net';

const cache = {}

const loadParameter = async(key, WithDecryption = false) => {
    const { Parameter } = await ssm.getParameter({ Name: key, WithDecryption: WithDecryption }).promise();
    return Parameter.Value;
};

const policyString = JSON.stringify({
    'Statement': [{
        'Resource': `http*://${SIGNING_URL}/*`,
        'Condition': {
            'DateLessThan': { 'AWS:EpochTime': getExpiryTime() }
        }
    }]
});

function getSignedCookie(publicKey, privateKey) {
    const cloudFront = new AWS.CloudFront.Signer(publicKey, privateKey);
    const options = { policy: policyString };
    return cloudFront.getSignedCookie(options);
}

function getSignedUrl(publicKey, privateKey) {
    const url = 'https://d69f1z2duoru5.cloudfront.net/0486b7af-fdca-43ca-8e83-0ae33d6d4662/hls/SampleVideo_1280x720_30mb%20copy%2015.m3u8';
    const cloudFront = new AWS.CloudFront.Signer(publicKey, privateKey);
    const twoDays = 2*24*60*60*1000
    return cloudFront.getSignedUrl({
        url: url,
        expires: Math.floor((Date.now() + twoDays)/1000), // Unix UTC timestamp for now + 2 days
      });
}

function getExpirationTime() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
}

function getExpiryTime() {
    return Math.floor(getExpirationTime().getTime() / 1000);
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async(event) => {
    if (cache.publicKey == null) cache.publicKey = await loadParameter('/amplify/d1p4t29ysdweyk/staging/AMPLIFY_CreateSignedCookie_publickey');
    if (cache.privateKey == null) cache.privateKey = await loadParameter('/amplify/d1p4t29ysdweyk/staging/AMPLIFY_CreateSignedCookie_privateKey', true);

    const { publicKey, privateKey } = cache;

    const signedCookie = getSignedCookie(publicKey, privateKey);
    const signedUrl = getSignedUrl(publicKey, privateKey);

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda! SignedUrl: |||' + signedUrl + '|||'),
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Location": `https://${SIGNING_URL}/restricted-content.html`,
            "Cache-Control": "no-cache, no-store, must-revalidate"
        },
        multiValueHeaders: {
            "Set-Cookie": [`CloudFront-Policy=${signedCookie['CloudFront-Policy']};Domain=${SIGNING_URL};Path=/;Expires=${getExpirationTime().toUTCString()};Secure;HttpOnly;SameSite=Lax`,
            `CloudFront-Key-Pair-Id=${signedCookie['CloudFront-Key-Pair-Id']};Domain=${SIGNING_URL};Path=/;Expires=${getExpirationTime().toUTCString()};Secure;HttpOnly;SameSite=Lax`,
            `CloudFront-Signature=${signedCookie['CloudFront-Signature']};Domain=${SIGNING_URL};Path=/;Expires=${getExpirationTime().toUTCString()};Secure;HttpOnly;SameSite=Lax`]
        }
    };
    
    return response;

    // return {
    //     isBase64Encoded: false,
    //     status: '200',
    //     multiValueHeaders: {
    //         location: [{
    //             key: 'Location',
    //             value: `https://${SIGNING_URL}/restricted-content.html`,
    //         }],
    //         'cache-control': [{
    //             key: "Cache-Control",
    //             value: "no-cache, no-store, must-revalidate"
    //         }],
    //         'set-cookie': [{
    //             key: "Set-Cookie",
    //             value: `CloudFront-Policy=${signedCookie['CloudFront-Policy']};Domain=${SIGNING_URL};Path=/;Expires=${getExpirationTime().toUTCString()};Secure;HttpOnly;SameSite=Lax`
    //         }, {
    //             key: "Set-Cookie",
    //             value: `CloudFront-Key-Pair-Id=${signedCookie['CloudFront-Key-Pair-Id']};Domain=${SIGNING_URL};Path=/;Expires=${getExpirationTime().toUTCString()};Secure;HttpOnly;SameSite=Lax`
    //         }, {
    //             key: "Set-Cookie",
    //             value: `CloudFront-Signature=${signedCookie['CloudFront-Signature']};Domain=${SIGNING_URL};Path=/;Expires=${getExpirationTime().toUTCString()};Secure;HttpOnly;SameSite=Lax`
    //         }]
    //     },
    //     body: 'Signed cookies'
    // };
};
