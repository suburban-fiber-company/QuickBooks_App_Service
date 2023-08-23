const axios = require('axios')
const config = require('../../settings/config')

module.exports = {
    fetchAll: async (req, res) => {
        let data = 'select * from Account startposition ' + req.query.startposition + ' maxresults ' + req.query.maxresult

        let conf = {
            method: 'post',
            url: config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/query?minorversion='+config.minorversion,
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/text', 
                Authorization: req.header('authorization')
            },
            data
        };
          
        await axios.request(conf)
        .then((result) => {
            res.json({status: result.status, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    }
}