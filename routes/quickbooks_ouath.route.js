const router = require('express').Router()
const quickBooksOAuthRoutes = require('../app/controllers/quickbooks_oauth.controller')

router.get('/authorization', quickBooksOAuthRoutes.authorization)
router.get('/callback', quickBooksOAuthRoutes.callback)
router.get('/get-token', quickBooksOAuthRoutes.getAuthorizationToken)
router.get('/refresh-token', quickBooksOAuthRoutes.refreshToken)

module.exports = router