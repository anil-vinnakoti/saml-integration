module.exports = {
  entryPoint: "https://your-idp.com/saml/login",
  issuer: "your-app-identifier",
  callbackUrl: "http://localhost:4000/auth/saml/callback",
  cert: `-----BEGIN CERTIFICATE-----
MIID...YOUR IDP CERT...
-----END CERTIFICATE-----`
};
