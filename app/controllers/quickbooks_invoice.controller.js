const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const apiResponse = require('../../functions')


module.exports = {
    getAllInvoices: async (req, res) => {

        let data = 'select * from invoice startposition ' + req.query.startposition + ' maxresults ' + req.query.maxresult

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
    },
    createInvoice: async (req, res) => {
        let conf = {
            method: 'post',
            url: config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/invoice?minorversion='+config.minorversion,
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': req.header('authorization')
            },
            data : req.body
          };

        await axios.request(conf)
        .then((result) => {
            res.json({status: apiResponse.getResponseCode(201)[0].code, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
    getSingleInvoice: async (req, res) => {
        let conf = {
            method: 'get',
            url: config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/invoice/'+ req.params.invoice_id  +'?minorversion='+config.minorversion,
            headers: { 
                Accept: 'application/json', 
                Authorization: req.header('authorization')
            }
        };
          
        await axios.request(conf)
        .then((result) => {
            res.json({status: result.status, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
    sendInvoice: async (req, res) => {
        let invoiceId = req.query.invoiceId
        let email = req.query.email
        if(!invoiceId || !email) return res.json({status: apiResponse.getResponseCode(422)[0].code, data: 'Missing invoiceId or email'})

        let conf = {
            method: 'post',
            url: config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/invoice/'+invoiceId+'/send?sendTo='+email+'?minorversion='+config.minorversion,
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': req.header('authorization')
            },
          };

        await axios.request(conf)
        .then((result) => {
            console.log(result)
            res.json({status: apiResponse.getResponseCode(200)[0].code, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    }
}