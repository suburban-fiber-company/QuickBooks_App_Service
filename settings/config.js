const appConfig = {
    appUrl: 'https://vacctservice.suburbanfiberco.com',
    environment: 'production',
    accesstoken_url: 'https://oauth.platform.intuit.com',
    api_key: 'ABHtjNFqYbl8vQB1av0Xm8douOGOhiM2EgllrBYs6spd08kyeU:FATXWeWeXlH7X5PPz9KKprxlM6iQO1o9nsHT9iyA',
    production_baseurl: 'https://quickbooks.api.intuit.com',
    minorversion: 65,
    revocation_endpoint:"https://oauth.platform.intuit.com/oauth2/v1/tokens/revoke",
    jwks_uri:"https://oauth.platform.intuit.com/op/v1/jwks",
}

//Read more here:  https://developer.intuit.com/app/developer/qbo/docs/develop/authentication-and-authorization/oauth-openid-discovery-doc

module.exports = appConfig