const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')
const { query } = require('express')
const { route } = require('../../routes/quickbooks_ouath.route')

module.exports = {
    getTransactionList: async (req, res) => {

        let start_date = req.query.start_date
        let end_date = req.query.end_date
        let arpaid = req.query.arpaid
        let appaid = req.query.status_balance
        let date_macro = req.query.date_macro
        let transaction_type = req.query.transaction_type
        let sort_order = req.query.sort_order

        let queryParams=''

        // queryParams = '&columns=account_name,create_date,due_date,doc_num,inv_date,is_ap_paid,is_no_post,memo,name,other_account,pmt_mthd,tx_date,txn_type'
        // create_date, due_date, doc_num, inv_date, is_ap_paid, is_cleared, is_no_post, last_mod_by, memo, name, other_account, pmt_mthd, tx_date, txn_type'
        
        if(start_date && end_date ){
            queryParams = '&start_date='+start_date+'&end_date='+end_date
        }

        if(arpaid){
            queryParams += `&arpaid=${arpaid}`
        }

        if(appaid){
            queryParams += `&appaid=${appaid}`
        }

        if(date_macro){
            queryParams += `&date_macro=${date_macro}`
        }

        if(transaction_type){
            queryParams += `&transaction_type=${transaction_type}`
        }

        if(sort_order){
            queryParams += `&sort_order=${sort_order}`
        }

        const link = config.production_baseurl+'/v3/company/'+req.params.realmID+'/reports/TransactionList?minorversion='+config.minorversion+queryParams

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

                const data = result.data.Rows.Row

                for (let index = 0; index < data.length; index++) {
                    let status
                    if(arpaid == 'All' || arpaid == null){
                        status = null
                    }else if(arpaid == 'Paid' || arpaid == 'Unpaid'){
                        status = arpaid
                    }


                  new_data.push(
                    {
                      "date" : data[index].ColData[0].value, 
                      "transaction_type": data[index].ColData[1].value,
                      "transaction_id": data[index].ColData[1].id,
                      "document_number": data[index].ColData[2].value,
                      "posting": data[index].ColData[3].value,
                      "name": data[index].ColData[4].value,
                      "memo": data[index].ColData[5].value,
                      "account": data[index].ColData[6].value,
                      "other account": data[index].ColData[7].value,
                      "amount": data[index].ColData[8].value,
                      "paid_status": status
                    }
                  )
                }

                res.json({status: result.status, headers: result.data.Header , data: new_data})
                // res.json({status: result.status, headers: result.data.Header , data: data})
            }else{
                res.json({status: 404, data: 'Nothing was returned'})
            }

        }).catch((error) => {
            // console.log(error)
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
            url: config.production_baseurl+'/v3/company/'+req.params.realmID+'/reports/AgedReceivableDetail?minorversion='+config.minorversion+queryParams,
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
            url: config.production_baseurl+'/v3/company/'+req.params.realmID+'/reports/AgedPayableDetail?minorversion='+config.minorversion+queryParams,
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
            url: config.production_baseurl+'/v3/company/'+req.params.realmID+'/reports/AgedPayable?minorversion='+config.minorversion+queryParams,
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
    },
    reportMacroPreDefined: async (req, res) => {
        const supportedValues = [
            'Today', 
            'Yesterday', 
            'This Week', 
            'Last Week', 
            'This Week-to-date', 
            'Last Week-to-date', 
            'Next Week', 
            'Next 4 Weeks', 
            'This Month', 
            'Last Month', 
            'This Month-to-date', 
            'Last Month-to-date', 
            'Next Month', 
            'This Fiscal Quarter', 
            'Last Fiscal Quarter', 
            'This Fiscal Quarter-to-date', 
            'Last Fiscal Quarter-to-date', 
            'Next Fiscal Quarter', 
            'This Fiscal Year', 
            'Last Fiscal Year', 
            'This Fiscal Year-to-date', 
            'Last Fiscal Year-to-date', 
            'Next Fiscal Year'
        ]

        res.json({status: 200, data: {supported_values: supportedValues}})
    },
    reportTransactionType: async (req, res) => {
        const supportedValues = [
            'CreditCardCharge', 
            'Check', 
            'Invoice', 
            'ReceivePayment', 
            'JournalEntry', 
            'Bill', 
            'CreditCardCredit', 
            'VendorCredit', 
            'Credit', 
            'BillPaymentCheck', 
            'BillPaymentCreditCard', 
            'Charge', 
            'Transfer', 
            'Deposit', 
            'Statement', 
            'BillableCharge', 
            'TimeActivity', 
            'CashPurchase', 
            'SalesReceipt', 
            'CreditMemo', 
            'CreditRefund', 
            'Estimate', 
            'InventoryQuantityAdjustment', 
            'PurchaseOrder', 
            'GlobalTaxPayment', 
            'GlobalTaxAdjustment', 
            'Service Tax Refund', 
            'Service Tax Gross Adjustment', 
            'Service Tax Reversal', 
            'Service Tax Defer', 
            'Service Tax Partial Utilisation'
        ]

        res.json({status: 200, data: {supported_values: supportedValues}})
    }
}