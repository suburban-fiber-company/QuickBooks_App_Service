const OAuthClient = require('intuit-oauth')
const config = require('../../settings/config')
const axios = require('axios')
const responses = require('../../functions')

module.exports = {
    authorization: (req, res) => {
        try {
            const oauthClient = new OAuthClient({
                clientId: req.query.clientId,
                clientSecret: req.query.clientSecret,
                environment: config.environment,
                redirectUri: config.appUrl + '/v1/quickbooks/callback',
                logging: true
            })
        
            // AuthorizationUri
            const authUri = oauthClient.authorizeUri({
                scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
                state: 'testState', //testState or security_token
            })
         
            res.json({
                status: responses.getResponseCode(200)[0].code,
                authorization_url: authUri, //Create the UI that redirects users to the authorization page
                error: false
            })
    
        } catch (error) {
            res.json({
                status: responses.getResponseCode(500)[0].code,
                message: error,
                error: true
            })
        }
    },
    callback: (req, res) => {
        if(!req.query.code || !req.query.realmId || !req.query.state){
            res.json({
                status: responses.getResponseCode(422)[0].code,
                message: "Sorry we could not complete this request."
            })
        }else{
            res.json({
                status: responses.getResponseCode(200)[0].code,
                data: {
                    authorization_code: req.query.code,
                    realmId: req.query.realmId,
                    state: req.query.state
                } 
            })      
        }
    },
    getAuthorizationToken: async (req, res) => {

        let data = {
            code: req.query.code,
            redirect_uri: config.appUrl + '/v1/quickbooks/callback',
            grant_type: 'authorization_code',
            clientId: req.query.clientId
        }

        let authHeader = responses.generateAuthHeader(req)

        let conf = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${config.accesstoken_url}/oauth2/v1/tokens/bearer`,
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded', 
              'Authorization': `Basic ${authHeader}`
            //   'Authorization': `Basic ${apiKey}`
            },
            data : data
          };

          await axios.request(conf)
          .then((response) => {
            res.json({status: response.status, data: response.data})
          })
          .catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
          });
    },
    refreshToken: async (req, res) => {

        let grant_type, refresh_token;

        grant_type = req.query.grant_type || null
        refresh_token = req.query.refresh_token || null

        if(!grant_type || !refresh_token){
            return res.json({
                status: responses.getResponseCode(422)[0].code,
                message: "We could not confirm your grant_type or refresh_token field"
            })
        }

        let authHeader = responses.generateAuthHeader(req)

        let data = { grant_type, refresh_token }

        await axios
            .post(
                `${config.accesstoken_url}/oauth2/v1/tokens/bearer`,
                data,
                {
                    headers: {
                        Authorization: `Basic ${authHeader}`,
                        // Authorization: `Basic ${apiKey}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then( (response) => {
                // console.log(response)
                res.json({status: response.status, data: response.data})
            })
            .catch( (error) => {
                console.log(error)
                res.json({status: error.status, data: error.response.data})
            });
    }
}