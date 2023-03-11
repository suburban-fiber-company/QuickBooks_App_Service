const express = require('express')
const config = require('./settings/config')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const helmet = require("helmet")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Quickbooks API Application Service')
})

const PORT = 4000 || process.env.PORT

const ouathRoute = require('./routes/quickbooks_ouath.route')
const customerRoute = require('./routes/quickbooks_customer.route')

axios.interceptors.request.use( request =>  {
    request.headers['User-Agent'] = 'APIExplorer'
    request.headers['Accept'] = 'application/json'

    if(request.url.includes('query')){
        request.headers['Content-Type'] = 'application/text'
    }else{
        request.headers['Content-Type'] = 'application/json'
    }    
    return request;
  }, function (error) {
    return Promise.reject(error);
  }
)

//API Routes
app.use('/v1/quickbooks', ouathRoute)
app.use('/v1/quickbooks/customer', customerRoute)

app.listen(PORT, () =>{
    console.log(`Quickbooks app service is  currently connected via ${config.appUrl}`);
})