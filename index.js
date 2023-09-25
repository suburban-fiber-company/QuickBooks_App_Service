const express = require('express')
const config = require('./settings/config')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const helmet = require("helmet")
const swaggerJSDoc = require('swagger-jsdoc')
const SwaggerUiOptions = require('swagger-ui-express')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Quickbooks API Application Service')
})

const PORT = 4000 || process.env.PORT

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "QuickBooks Service with Swagger",
        version: "1.0.0",
        description: "This is a quickbooks application and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Oyedele Olufemi",
          email: "o.oyedele@suburbanfiberco.com",
        },
      },
      schemes: ['http', 'https'],
      servers: [
        {
            url: 'http://localhost:4000',
            description: 'Local Server'
        },
        {
            url: "https://vacctservice.suburbanfiberco.com",
            description: "Production Server"  
        }
    ],
    },
    apis: ["./routes/*.js"],
  };

const specs = swaggerJSDoc(options);

app.use(
        "/api-docs",
        SwaggerUiOptions.serve,
        SwaggerUiOptions.setup(specs, { explorer: true })
);

const ouathRoute = require('./routes/quickbooks_ouath.route')
const customerRoute = require('./routes/quickbooks_customer.route')
const invoiceRoute = require('./routes/quickbooks_invoice.route')
const itemRoute = require('./routes/quickbooks_item.route')
const accountRoute = require('./routes/quickbooks_account.route')
const reportRoute = require('./routes/quickbooks_report.route')

// axios.interceptors.request.use( request =>  {
//     request.headers['User-Agent'] = 'APIExplorer'
//     request.headers['Accept'] = 'application/json'

//     if(request.url.includes('query')){
//         request.headers['Content-Type'] = 'application/text'
//     }else{
//         request.headers['Content-Type'] = 'application/json'
//     }    
//     return request;
//   }, function (error) {
//     return Promise.reject(error);
//   }
// )

//API Routes
app.use('/v1/quickbooks', ouathRoute)
app.use('/v1/quickbooks/customer', customerRoute)
app.use('/v1/quickbooks/invoice', invoiceRoute)
app.use('/v1/quickbooks/item', itemRoute)
app.use('/v1/quickbooks/account', accountRoute)
app.use('/v1/quickbooks/report/', reportRoute)

app.listen(PORT, () =>{
    console.log(`Quickbooks app service is  currently connected via ${config.appUrl}`);
})