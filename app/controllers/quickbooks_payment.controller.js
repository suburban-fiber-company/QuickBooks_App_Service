const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const apiResponse = require('../../functions')


module.exports = {

    createPayment: async (req, res) => {
        
        let conf = {
            method: 'post',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/payment?minorversion='+config.minorversion,
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': req.header('authorization')
            },
            data : req.body
        };

        await axios.request(conf).then((result) => {
            res.json({status: apiResponse.getResponseCode(201)[0].code, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })

    },

    getSinglePayment: async (req, res) => {

        let conf = {
            method: 'get',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/payment/'+ req.params.payment_id  +'?minorversion='+config.minorversion,
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': req.header('authorization')
            }
        };

        await axios.request(conf).then((result) => {
            res.json({status: result.status, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })

    }

}