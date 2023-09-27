const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const apiResponse = require('../../functions')


module.exports = {
    createCustomer: async (req, res) => {
      
        let conf = {
            method: 'post',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/customer?minorversion='+config.minorversion,
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
    getCustomerById: async (req, res) => {

        let conf = {
            method: 'get',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/customer/'+ req.params.id  +'?minorversion='+config.minorversion,
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
    getAllCustomers: async (req, res) => {

        let data = 'select * from Customer startposition ' + req.query.startposition + ' maxresults ' + req.query.maxresult

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
    customerSparseUpdate: async (req, res) => {

        let updateObj = {
            'FullyQualifiedName' : req.body.business_name,
            'DisplayName' : req.body.business_name,
            'GivenName' : req.body.business_name,
            'FamilyName' : req.body.business_name,
            'CompanyName' : req.body.business_name,
            "SyncToken": "0", 
            "Id": req.body.quickbooks_id,
            "sparse": true 
        }
        
        let conf = {
            method: 'post',
            url: config.production_baseurl + '/v3/company/'+req.params.realmID+'/customer?minorversion='+config.minorversion,
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': req.header('authorization')
            },
            data : updateObj
          };

        await axios.request(conf)
        .then((result) => {
            res.json({status: apiResponse.getResponseCode(201)[0].code, data: result.data})
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    }
}