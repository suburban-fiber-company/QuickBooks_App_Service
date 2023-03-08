const axios = require('axios')
const config = require('./settings/config')

module.exports = {
    getAuthorizationToken: async (req, res) => {
        const apiKey = `${config.clientId}:${config.clientSecret}`
        const authHeader = typeof btoa === 'function' ? btoa(apiKey) : Buffer.from(apiKey).toString('base64')

        let data = {
            code: req.query.code,
            redirect_uri: config.appUrl + '/v1/quickbooks/callback',
            grant_type: 'authorization_code'
        }

        axios
            .post(
                'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
                data,
                {
                    headers: {
                      Authorization: 'Basic '+authHeader,
                      'User-Agent': 'APIExplorer',
                      Accept: 'application/json',
                      'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )
            .then( (response) => {
                console.log(response.data);
            })
            .catch( (error) => {
                console.error(error);
            });

    }
}