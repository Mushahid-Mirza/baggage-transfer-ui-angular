export const environment = {
  production: true,
  isDesktop: false,
  app_name: 'Baggage Transfer System',
  minDate: new Date(2020, 2),
  maxDate: new Date(2018, 5),
  apiUrl: 'https://localhost:44317/api/',
  appAuthUrl: 'https://localhost:44317/token',
  azureLocationSearchUrl: "https://atlas.microsoft.com/search/address/json?api-version=1.0",
  azureMapAuthOptions: {
    authType: 'subscriptionKey',
    subscriptionKey: 'DBHXO3op4vrMAV3jk9vjPsh4lg4TBYMNhHoHbPDhaLQ'
  },
  azureClientId: "f8af8402-0170-4cd1-9c57-1cc8680f1d17",
  azureAuthorization: "b1c28fc1-9a29-44ab-b406-84b796afa21c"
};