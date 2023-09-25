const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const { query } = require('express')
const { route } = require('../../routes/quickbooks_ouath.route')

module.exports = {
    getTransactionList: async (req, res) => {

        let start_date = req.query.start_date
        let end_date = req.query.end_date

        let queryParams
        
        if(start_date && end_date ){
            queryParams = '&start_date='+req.query.start_date+'&end_date='+req.query.end_date
        }else{
            queryParams = ''
        }

        const link = config.sandbox_baseurl+'/v3/company/'+req.params.realmID+'/reports/TransactionList?minorversion='+config.minorversion+queryParams

        let conf = {
            method: 'get',
            url: link,
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                Authorization: req.header('authorization')
            }
        };
          
        await axios.request(conf)
        .then((result) => {

            let rowRecords = result.data.Rows

            if(rowRecords.Row && rowRecords.Row.length){
                let new_data=[]

                rowRecords.Row.forEach(e=>{

                    let object={}

                    e.ColData.forEach((v,i)=>{

                        if(i==0) object.transaction_date =v.value;
                        
                        if(i==1) {
                            object.transaction = {
                                transaction_type : v.value,
                                transaction_id: v.id 
                            }    
                        }

                        if(i==2) object.document_num = v.value

                        if(i==3) object.is_no_post = v.value

                        if(i==4){
                            object.customer = {
                                customer_name : v.value,
                                customerId : v.id
                            }
                        }

                        if(i==5) object.description = v.value

                        if(i==6){
                            object.account = {
                                account_name : v.value,
                                account_id : v.id
                            }
                        }

                        if(i==7){

                            object.split = {
                                other_account : v.value,
                                other_account_id : v.id
                            }
                        }

                        if(i==8) object.amount = v.value

                        new_data.push(object)
                    })
                })

                res.json({status: result.status, headers: result.data.Header , data: new_data})
            }else{
                res.json({status: 404, data: 'Nothing was returned'})
            }

        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
    getAccountReceivables: async (req, res) => {

        let start_date = req.query.start_date
        let end_date = req.query.end_date

        let queryParams
        
        if(start_date && end_date ){
            queryParams = '&start_date='+req.query.start_date+'&end_date='+req.query.end_date
        }else{
            queryParams = ''
        }

        let conf = {
            method: 'get',
            url: config.sandbox_baseurl+'/v3/company/'+req.params.realmID+'/reports/AgedReceivableDetail?minorversion='+config.minorversion+queryParams,
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                Authorization: req.header('authorization')
            }
        };

        await axios.request(conf)
        .then((result) => {

            let rowRecords = result.data
            let data = rowRecords.Rows.Row

            if(rowRecords){

                let table = []

                for (let index = 0; index < data.length; index++) {
                    if (data.length > index + 1) {        
                        var tableRows = []

                        for (let row_index = 0; row_index < data[index]['Rows']['Row'].length; row_index++) {              
                            tableRows.push({
                                    "date": data[index]['Rows']['Row'][row_index].ColData[0].value,
                                    "transactionType": data[index]['Rows']['Row'][row_index].ColData[1].value,
                                    "num":data[index]['Rows']['Row'][row_index].ColData[2].value,
                                    "customer":data[index]['Rows']['Row'][row_index].ColData[3].value,
                                    "dueDate": data[index]['Rows']['Row'][row_index].ColData[0].value,
                                    "amount": data[index]['Rows']['Row'][row_index].ColData[5].value,
                                    "openingBalance": data[index]['Rows']['Row'][row_index].ColData[6].value,
                                }
                            )                                                       

                        }
                        
                        var tableData = {
                            "date" : data[index]['Header']['ColData'][0],
                            "summary": {
                                "Amount" : data[index]["Summary"].ColData[5].value,
                                "OpenBalance": data[index]['Summary'].ColData[6].value
                            },            
                            "rows": tableRows
                        }

                        table.push(tableData)
                    }
                }
                res.json({status: result.status, data: table})
            }else{
                res.json({status: 404, data: 'Nothing was returned'})
            }

        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
    getAccountPayables: async (req, res) => {
        let start_date = req.query.start_date
        let end_date = req.query.end_date

        let queryParams
        
        if(start_date && end_date ){
            queryParams = '&start_date='+req.query.start_date+'&end_date='+req.query.end_date
        }else{
            queryParams = ''
        }

        let conf = {
            method: 'get',
            url: config.sandbox_baseurl+'/v3/company/'+req.params.realmID+'/reports/AgedPayableDetail?minorversion='+config.minorversion+queryParams,
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                Authorization: req.header('authorization')
            }
        };

        await axios.request(conf)
        .then((result) => {

            let rowRecords = result.data
            let data = rowRecords.Rows.Row

            if(rowRecords){

                let table = []

                for (let index = 0; index < data.length; index++) {
                    if (data.length > index + 1) {        
                        var tableRows = []

                        for (let row_index = 0; row_index < data[index]['Rows']['Row'].length; row_index++) {              
                            tableRows.push({
                                    "date": data[index]['Rows']['Row'][row_index].ColData[0].value,
                                    "transactionType": data[index]['Rows']['Row'][row_index].ColData[1].value,
                                    "num":data[index]['Rows']['Row'][row_index].ColData[2].value,
                                    "customer":data[index]['Rows']['Row'][row_index].ColData[3].value,
                                    "dueDate": data[index]['Rows']['Row'][row_index].ColData[0].value,
                                    "amount": data[index]['Rows']['Row'][row_index].ColData[5].value,
                                    "openingBalance": data[index]['Rows']['Row'][row_index].ColData[6].value,
                                }
                            )                                                       

                        }
                        
                        var tableData = {
                            "date" : data[index]['Header']['ColData'][0],
                            "summary": {
                                "Amount" : data[index]["Summary"].ColData[5].value,
                                "OpenBalance": data[index]['Summary'].ColData[6].value
                            },            
                            "rows": tableRows
                        }

                        table.push(tableData)
                    }
                }
                res.json({status: result.status, data: table})
            }else{
                res.json({status: 404, data: 'Nothing was returned'})
            }

        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
    getAccountPayableAgingSummary: async (req, res) => {
        let start_date = req.query.start_date
        let end_date = req.query.end_date

        let queryParams
        
        if(start_date && end_date ){
            queryParams = '&start_date='+req.query.start_date+'&end_date='+req.query.end_date
        }else{
            queryParams = ''
        }

        let conf = {
            method: 'get',
            url: config.sandbox_baseurl+'/v3/company/'+req.params.realmID+'/reports/AgedPayable?minorversion='+config.minorversion+queryParams,
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                Authorization: req.header('authorization')
            }
        };

        await axios.request(conf)
        .then((result) => {

            res.json({status: result.status, data: result})

        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    }
}