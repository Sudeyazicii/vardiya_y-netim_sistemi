// cypress/support/e2e.js

// Eğer özel komutların varsa buradan import edebilirsin
// import './commands'

// Uncaught exception'ları test akışını bozmayacak şekilde yoksay
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
