const OAuthClient = require('intuit-oauth')
const config = require('../../settings/config')
const axios = require('axios')

const apiKey = `${config.api_key}`
const authHeader = typeof btoa === 'function' ? btoa(apiKey) : Buffer.from(apiKey).toString('base64')

module.exports = {
    authorization: (req, res) => {
        try {
            const oauthClient = new OAuthClient({
                clientId: config.clientId,
                clientSecret: config.clientSecret,
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
                status: 200,
                authorization_url: authUri, //Create the UI that redirects users to the authorization page
                error: false
            })
    
        } catch (error) {
            res.json({
                status: 500,
                message: error,
                error: true
            })
        }
    },
    callback: (req, res) => {
        if(!req.query.code || !req.query.realmId || !req.query.state){
            res.json({
                status: 422,
                message: "Sorry we could not complete this request."
            })
        }else{
            res.json({
                status: 200,
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
            grant_type: 'authorization_code'
        }

        await axios
            .post(
                `${config.quickbooks_baseurl}/oauth2/v1/tokens/bearer`,
                data,
                {
                    headers: {
                        Authorization: 'Basic ' + authHeader,
                        'User-Agent': 'APIExplorer',
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then( (response) => {
                // console.log(response.data)
                res.json({status: response.status, data: response.data})
            })
            .catch( (error) => {
                // console.log(error.response);
                res.json({status: error.status, data: error.response.data})
            });
    },
    refreshToken: async (req, res) => {

        let grant_type, refresh_token;

        grant_type = req.query.grant_type || null
        refresh_token = req.query.refresh_token || null

        if(!grant_type || !refresh_token){
            return res.json({
                status: 422,
                message: "We could not confirm your grant_type or refresh_token field"
            })
        }

        let data = { grant_type, refresh_token }

        await axios
            .post(
                `${config.quickbooks_baseurl}/oauth2/v1/tokens/bearer`,
                data,
                {
                    headers: {
                        Authorization: 'Basic ' + authHeader,
                        'User-Agent': 'APIExplorer',
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then( (response) => {
                res.json({status: response.status, data: response.data})
            })
            .catch( (error) => {
                res.json({status: error.status, data: error.response.data})
            });
    }
}