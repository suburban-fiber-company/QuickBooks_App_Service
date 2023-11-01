const express = require('express')
const config = require('./settings/config')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const helmet = require("helmet")
const swaggerJSDoc = require('swagger-jsdoc')
const SwaggerUiOptions = require('swagger-ui-express')
const EventEmitter = require('events')


// Create an instance of EventEmitter
const myEmitter = new EventEmitter();

// Set the maximum number of listeners for this EventEmitter
myEmitter.setMaxListeners(20); // Increase the limit to 20 listeners

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet())
app.use(cors())

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
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          in: 'header',
          name: 'Authorization',
          description: 'Bearer token to access these api endpoints',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        // {
        //     url: 'http://localhost:4000',
        //     description: 'Local Server'
        // },
        {
            url: 'https://vacctservicetest.suburbanfiberco.com',
            description: 'Testing Server'
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

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

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
const paymentRoute = require('./routes/quickbooks_payment.route')

//API Routes
app.use('/v1/quickbooks', ouathRoute)
app.use('/v1/quickbooks/customer', customerRoute)
app.use('/v1/quickbooks/invoice', invoiceRoute)
app.use('/v1/quickbooks/item', itemRoute)
app.use('/v1/quickbooks/account', accountRoute)
app.use('/v1/quickbooks/report/', reportRoute)
app.use('/v1/quickbooks/payment/', paymentRoute)

app.listen(PORT, () =>{
    console.log(`Quickbooks app service is  currently connected via ${config.appUrl}`);
})