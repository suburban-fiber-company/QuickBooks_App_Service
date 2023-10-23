const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const apiResponse = require('../../functions')


module.exports = {
    getAllInvoices: async (req, res) => {

        // let data = "SELECT * FROM Invoice WHERE MetaData.CreateTime >= '2009-10-14T04:05:05-07:00' AND MetaData.CreateTime <= '2023-10-14T04:05:05-07:00' startposition " + req.query.startposition + " maxresults " + req.query.maxresult
        let data = `SELECT * FROM Invoice WHERE TxnDate >= '${req.query.start_date}'`
            data += ` AND TxnDate <= '${req.query.end_date}'`
            data += ` startposition ${req.query.startposition} maxresults ${req.query.maxresult}`

        let conf = {
            method: 'post',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/query?minorversion='+config.minorversion,
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
    getInvoicesCount: async (req, res) => {
        let data = `SELECT count(*) FROM Invoice WHERE TxnDate >= '${req.query.start_date}'`
            data += ` AND TxnDate <= '${req.query.end_date}'`

        let conf = {
            method: 'post',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/query?minorversion='+config.minorversion,
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
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/invoice?minorversion='+config.minorversion,
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
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/invoice/'+ req.params.invoice_id  +'?minorversion='+config.minorversion,
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
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/invoice/'+invoiceId+'/send?sendTo='+email+'?minorversion='+config.minorversion,
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
    },
    getCustomerInvoices: async (req, res) => {

        let start_date = req.query.start_date
        let end_date = req.query.end_date

        let queryParams = `sort_order=descend`

        if(start_date && end_date ){
            queryParams += '&start_date='+start_date+'&end_date='+end_date
        }

        let data = `SELECT * FROM Invoice WHERE CustomerRef = '${req.query.quickbooks_customer_id}'`
            data += ` startposition ${req.query.startposition} maxresults ${req.query.maxresult}`

        let conf = {
            method: 'post',
            url: config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/query?'+queryParams+'&minorversion='+config.minorversion,
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