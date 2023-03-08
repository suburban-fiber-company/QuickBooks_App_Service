const express = require('express')
const config = require('./settings/config')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Quickbooks API Application Service')
})

const PORT = 4000 || process.env.PORT

const ouathRoute = require('./routes/quickbooks_ouath.route')
const customerRoute = require('./routes/quickbooks_customer.route')

//API Routes
app.use('/v1/quickbooks', ouathRoute)
app.use('/v1/quickbooks/customer', customerRoute)

app.listen(PORT, () =>{
    console.log(`Quickbooks app service is  currently connected via ${config.appUrl}`);
})