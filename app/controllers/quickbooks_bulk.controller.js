const axios = require('axios')
const config = require('../../settings/config')
const apiResponse = require('../../functions')


module.exports = {
    bulk_operation: async (req, res) => {
        let conf = {
            method: 'post',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/batch?minorversion='+config.minorversion,
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': req.header('authorization')
            },
            data : req.body
          };

        await axios.request(conf)
        .then((result) => {
            console.log(result)
            res.json({status: apiResponse.getResponseCode(201)[0].code, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    }
}