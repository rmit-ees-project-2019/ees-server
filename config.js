var config = {}

config.host = process.env.HOST || "https://fypees.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "eV9Qs5taTnjVENml2RJRITxYitC0fDeIKHBD81OLrIVHA9bA6aDKZEKni1c9TPHM1LyXLMF5mHfBfN3h8hYJLQ==";
config.databaseId = "EES";
config.containerId = "Test";

module.exports = config;