import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// 🔹 Test kullanıcısını backend’e ekle
before(() => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3002/api/v1/calisans',
    body: {
      calisan: {
        ad: 'Sude',
        soyad: 'Yazıcı',
        email: 'sude.yazici@example.com',
        password: '123456',
        password_confirmation: '123456',
        departman_id: 4
      }
    },
    failOnStatusCode: false,
  });
});

Given('kullanıcı login sayfasındadır', () => {
  cy.visit('http://localhost:3001/login');
});

When('email alanına {string} yazar', (email) => {
  cy.get('input[placeholder="Email adresinizi girin"]').clear().type(email);
});

When('password alanına {string} yazar', (password) => {
  cy.get('input[placeholder="Şifrenizi girin"]').clear().type(password);
});

When('{string} butonuna tıklar', (buttonText) => {
  cy.intercept('POST', '**/api/v1/login').as('loginRequest');
  cy.contains('button', buttonText).click();
  cy.wait('@loginRequest', { timeout: 20000 }).its('response.statusCode').should('eq', 200);

  // Token sessionStorage'a kaydedilsin
  cy.get('@loginRequest').then((interception) => {
    const token = interception.response.body.token;
    cy.window().then((win) => win.sessionStorage.setItem('token', token));
  });

  cy.wait(3000); // Sayfanın tam yüklenmesi için bekle
});

Then('kullanıcı departmanlar sayfasına yönlendirilmelidir ve yeni departman ekleyebilir', () => {
  cy.url({ timeout: 30000 }).should('include', '/departmanlar');
  cy.wait(1000);
  cy.contains('Yeni Departman Ekle').click();
  cy.wait(1000); // modal açılması için
});

Then('kullanıcı çalışanlar sayfasına geçebilir ve yeni çalışan ekleyebilir', () => {
  cy.window().then((win) => {
    const token = win.sessionStorage.getItem('token');
    if (token) win.sessionStorage.setItem('token', token);
  });
  cy.visit('http://localhost:3001/calisanlar');
  cy.wait(1000);
  cy.url({ timeout: 30000 }).should('include', '/calisanlar');
  cy.contains('Yeni Çalışan Ekle').click();
  cy.wait(1000); // modal açılması için
});

Then('kullanıcı vardiyalar sayfasına geçebilir ve yeni vardiya ekleyebilir', () => {
  cy.window().then((win) => {
    const token = win.sessionStorage.getItem('token');
    if (token) win.sessionStorage.setItem('token', token);
  });
  cy.visit('http://localhost:3001/vardiyalar');
  cy.wait(1000);
  cy.url({ timeout: 30000 }).should('include', '/vardiyalar');
  cy.contains('Yeni Vardiya Ekle').click();
  cy.wait(1000); // modal açılması için
});

// Uncaught exception'ları test akışını bozmayacak şekilde yoksay
Cypress.on('uncaught:exception', () => false);
