const router = require('express').Router()
const invoiceController = require('../app/controllers/quickbooks_invoice.controller')


/**
 * @swagger
 *  /v1/quickbooks/invoice/count-invoices/{realmID}:
*      get:
 *          summary: Total Number of Invoices
 *          tags: [QuickBooks Invoice]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  type: string
 *                  required: true
 *                  description: Bearer token
*              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *              -   in: query
 *                  name: start_date
 *                  type: date
 *                  required: true
 *                  description: YYYY-MM-DD
 *              -   in: query
 *                  name: end_date
 *                  type: date
 *                  required: true
 *                  description: YYYY-MM-DD
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/count-invoices/:realmID', invoiceController.getInvoicesCount)

/**
 * @swagger
 *  /v1/quickbooks/invoice/get-invoices/{realmID}:
*      get:
 *          summary: Get All Invoices
 *          tags: [QuickBooks Invoice]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  type: string
 *                  required: true
 *                  description: Bearer token
*              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *              -   in: query
 *                  name: startposition
 *                  type: integer
 *                  required: true
 *                  description: start from 1
 *              -   in: query
 *                  name: maxresult
 *                  type: integer
 *                  required: true
 *                  description: max result e.g 1000
 *              -   in: query
 *                  name: start_date
 *                  type: date
 *                  required: true
 *                  description: YYYY-MM-DD
 *              -   in: query
 *                  name: end_date
 *                  type: date
 *                  required: true
 *                  description: YYYY-MM-DD
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/get-invoices/:realmID', invoiceController.getAllInvoices)

/**
 * @swagger
 *  /v1/quickbooks/invoice/get-invoice/{invoice_id}/{realmID}:
*      get:
 *          summary: Get Single Invoice
 *          tags: [QuickBooks Invoice]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  type: string
 *                  required: true
 *                  description: Bearer token
 *              -   in: path
 *                  name: invoice_id
 *                  type: integer
 *                  required: true
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/get-invoice/:invoice_id/:realmID', invoiceController.getSingleInvoice)

router.post('/create/:realmID', invoiceController.createInvoice)

/**
 * @swagger
 *  /v1/quickbooks/invoice/send-an-invoice/{invoice_id}/{realmID}:
*      get:
 *          summary: Send An Invoice By Email
 *          tags: [QuickBooks Invoice]
 *          parameters:
 *              -   in: query
 *                  name: invoiceId
 *                  type: integer
 *                  required: true
 *              -   in: query
 *                  name: email
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/send-an-invoice/:realmID', invoiceController.sendInvoice)

/**
 * @swagger
 *  /v1/quickbooks/invoice/customer/invoices/{realmID}:
*      get:
 *          summary: Get the List of Customer Invoices
 *          tags: [QuickBooks Invoice]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  type: string
 *                  required: true
 *                  description: Bearer token
 *              -   in: query
 *                  name: quickbooks_customer_id
 *                  type: integer
 *                  required: true
 *              -   in: query
 *                  name: startposition
 *                  type: integer
 *                  required: true
 *                  description: start at 1
 *              -   in: query
 *                  name: maxresult
 *                  type: integer
 *                  required: true
 *                  description: max results at 1000
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *              -   in: query
 *                  name: start_date
 *                  type: date
 *                  required: false
 *                  description: YYYY-MM-DD
 *              -   in: query
 *                  name: end_date
 *                  type: date
 *                  required: false
 *                  description: YYYY-MM-DD
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/customer/invoices/:realmID', invoiceController.getCustomerInvoices)

module.exports = router