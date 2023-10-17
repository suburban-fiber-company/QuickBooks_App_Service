const router = require('express').Router()
const quickBooksOAuthRoutes = require('../app/controllers/quickbooks_oauth.controller')


/**
 * @swagger
 *  /v1/quickbooks/authorization:
*      get:
 *          summary: Get Authorization Code
 *          tags: [QuickBooks Ouath2.0]
*          parameters:
 *              -   in: query
 *                  name: clientId
 *                  type: string
 *                  required: true
 *                  description: Client ID generated from QuickBooks
 *              -   in: query
 *                  name: clientSecret
 *                  type: string
 *                  required: true
 *                  description: Client Secret generated from QuickBooks
 *              -   in: query
 *                  name: redirectUri
 *                  type: string
 *                  required: true
 *                  description: Redirect URI
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: SystemFailureError from QuickBoos
 */
router.get('/authorization', quickBooksOAuthRoutes.authorization)

/**
 * @swagger
 *  /v1/quickbooks/get-authorization-token:
*      get:
 *          summary: Get Authorization Token Exchange
 *          tags: [QuickBooks Ouath2.0]
 *          parameters:
 *              -   in: query
 *                  name: code
 *                  type: string
 *                  required: true
 *                  description: Authorization Code from Redirect URL endpoint
 *              -   in: query
 *                  name: clientId
 *                  type: string
 *                  required: true
 *                  description: Client ID generated from QuickBooks
 *              -   in: query
 *                  name: clientSecret
 *                  type: string
 *                  required: true
 *                  description: Client Secret generated from QuickBooks
 *              -   in: query
 *                  name: redirectUri
 *                  type: string
 *                  required: true
 *                  description: Redirect URI
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: SystemFailureError from QuickBoos
 */
router.get('/get-authorization-token', quickBooksOAuthRoutes.getAuthorizationToken)

/**
 * @swagger
 *  /v1/quickbooks/refresh-token:
*      get:
 *          summary: Get Refresh Token
 *          tags: [QuickBooks Ouath2.0]
 *          parameters:
 *              -   in: query
 *                  name: grant_type
 *                  type: string
 *                  required: true
 *                  example: grant_type
 *                  description: Grant type
 *              -   in: query
 *                  name: refresh_token
 *                  type: string
 *                  required: true
 *                  description: refresh token from Get Authorization Token Exchange endpoint
 *              -   in: query
 *                  name: clientId
 *                  type: string
 *                  required: true
 *                  description: Client ID generated from QuickBooks
 *              -   in: query
 *                  name: clientSecret
 *                  type: string
 *                  required: true
 *                  description: Client Secret generated from QuickBooks
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/refresh-token', quickBooksOAuthRoutes.refreshToken)

/**
 * @swagger
 *  /v1/quickbooks/callback:
*      get:
 *          summary: Redirect URL
 *          tags: [QuickBooks Ouath2.0]
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              422:
 *                  description: Missing Parameters
 *              500:
 *                  description: SystemFailureError from QuickBoos
 */
router.get('/callback', quickBooksOAuthRoutes.callback)

router.get('/disconnect', quickBooksOAuthRoutes.disconnect)

module.exports = router