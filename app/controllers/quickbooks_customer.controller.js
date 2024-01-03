const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const apiResponse = require('../../functions')
const crypto = require('crypto')


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

        // let updateObj = {
        //     "domain": req.body.domain,
        //     'FullyQualifiedName' : req.body.business_name,
        //     'DisplayName' : req.body.business_name,
        //     'GivenName' : req.body.business_name,
        //     'FamilyName' : req.body.business_name,
        //     'CompanyName' : req.body.business_name,
        //     "SyncToken": req.body.SyncToken, 
        //     "Id": req.body.quickbooks_id,
        //     "sparse": true 
        // }

        let updateObj = 
            {
                "domain": req.body.domain,
                "DisplayName": req.body.business_name, 
                "PreferredDeliveryMethod": req.body.PreferredDeliveryMethod, 
                "GivenName": req.body.business_name, 
                "FullyQualifiedName": req.body.business_name, 
                "BillWithParent": req.body.BillWithParent, 
                "Job": req.body.Job, 
                "BalanceWithJobs": req.body.BalanceWithJobs, 
                "PrimaryPhone": {
                    "FreeFormNumber": req.body.FreeFormNumber
                }, 
                "Active": req.body.Active, 
                "MetaData": {
                    "CreateTime": req.body.CreateTime, 
                    "LastUpdatedTime": req.body.LastUpdatedTime
                }, 
                "BillAddr": {
                    "City": req.body.City, 
                    "Line1": req.body.Line1, 
                    "PostalCode": req.body.PostalCode, 
                    "Lat": req.body.Lat, 
                    "Long": req.body.Long, 
                    "CountrySubDivisionCode": req.body.CountrySubDivisionCode, 
                    "Id": req.body.BillAddrId
                }, 
                "MiddleName": req.body.MiddleName, 
                "Taxable": req.body.Taxable, 
                "Balance": req.body.Balance, 
                "SyncToken": req.body.SyncToken, 
                "CompanyName": req.body.business_name, 
                "FamilyName": req.body.business_name, 
                "PrintOnCheckName": req.body.business_name, 
                "sparse": false, 
                "Id": req.body.quickbooks_id
            }

            console.log(updateObj)


            if(req.body.new_email && req.body.new_email != ''){
                updateObj.PrimaryEmailAddr.Address = req.body.new_email
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
                console.log(result)
                res.json({status: apiResponse.getResponseCode(201)[0].code, data: result.data})
            }).catch((error) => {
                console.log(error)
                res.json({status: error.response.status, data: error.response.data})
            })
    },
}