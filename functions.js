const axios = require('axios')
const config = require('./settings/config')
const responseCodes = require('./settings/response_statuses')

module.exports = {
    requestInterceptor: (req, res, next) => {
        axios.interceptors.request.use(request => {
            return Promise.reject('Error is found')
            return request
        },
        error => {
            return Promise.reject(error)
        });
    },
    generateAuthHeader: (req, res, next) => {
        if(!req.query.clientId || !req.query.clientSecret){
            throw new Error('You have not provide the clientId or clientSecret key in the query parameter');
        }

        let apiKey = `${req.query.clientId}:${req.query.clientSecret}`
            let authHeader = typeof btoa === 'function' ? btoa(apiKey) : Buffer.from(apiKey).toString('base64')

            return authHeader
    },
    getResponseCode: (code) => {
        let result = responseCodes.filter(function(item){
            return item.code == code
        })

        return result;
    }
}