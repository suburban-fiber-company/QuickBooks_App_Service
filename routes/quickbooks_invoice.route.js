const router = require('express').Router()
const invoiceController = require('../app/controllers/quickbooks_invoice.controller')

/**
 * @swagger
 *  /v1/quickbooks/invoice/get-invoices/{realmID}:
*      get:
 *          summary: Get All Invoices
 *          tags: [Invoice]
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
 *                  description: max result e.g 5
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Serval Error
 */
router.get('/get-invoices/:realmID', invoiceController.getAllInvoices)

/**
 * @swagger
 *  /v1/quickbooks/invoice/get-invoice/{invoice_id}/{realmID}:
*      get:
 *          summary: Get Single Invoice
 *          tags: [Invoice]
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
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Serval Error
 */
router.get('/get-invoice/:invoice_id/:realmID', invoiceController.getSingleInvoice)

router.post('/create/:realmID', invoiceController.createInvoice)

module.exports = router