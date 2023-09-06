const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')

module.exports = {
    getTransactionList: async (req, res) => {

        let conf = {
            method: 'get',
            url: config.sandbox_baseurl+'/v3/company/'+req.params.realmID+'/reports/TransactionList?minorversion='+config.minorversion+'&start_date='+req.query.start_date+'&end_date='+req.query.end_date,
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json', 
                Authorization: req.header('authorization')
            }
        };
          
        await axios.request(conf)
        .then((result) => {

            let rowRecords = result.data.Rows

            let new_data=[]

            rowRecords.Row.forEach(e=>{

                let object={}

                e.ColData.forEach((v,i)=>{

                    if(i==0) object.transaction_date =v.value;
                    
                    if(i==1) {
                        object.transaction = {
                            transction_type : v.value,
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

            res.json({status: result.status, data: new_data})
            
        }).catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
}