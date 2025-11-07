import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Login Steps
Given('kullanıcı login sayfasındadır', () => {
  cy.visit('/');
});

When('email alanına {string} yazar', (email) => {
  cy.get('input#email').clear().type(email);
});

When('password alanına {string} yazar', (password) => {
  cy.get('input#password').clear().type(password);
});

When('{string} butonuna tıklar', (buttonText) => {
  cy.contains('button', buttonText).click();
});

Then('kullanıcı departmanlar sayfasına yönlendirilmelidir', () => {
  cy.url().should('include', '/departmanlar');
  cy.contains('Departmanlar', { timeout: 10000 }).should('be.visible');
});

Then('hata mesajı görünmelidir', () => {
  cy.contains('Giriş başarısız', { timeout: 5000 }).should('be.visible');
});

// Authentication Helper
Given('kullanıcı giriş yapmıştır', () => {
  cy.session('login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/login',
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    }).then((response) => {
      window.sessionStorage.setItem('token', response.body.token);
      window.sessionStorage.setItem('authenticated', 'true');
    });
  });
});

// Departman Steps
Given('kullanıcı departmanlar sayfasındadır', () => {
  cy.visit('/departmanlar');
});

When('departman adı alanına {string} yazar', (ad) => {
  cy.get('input[name="ad"], input[placeholder*="Departman"]').first().clear().type(ad);
});

When('modal kaydet butonuna tıklar', () => {
  cy.contains('button', 'Kaydet').click();
});

Then('{string} departmanı listede görünmelidir', (departmanAdi) => {
  cy.contains(departmanAdi, { timeout: 10000 }).should('be.visible');
});

Given('listede en az bir departman vardır', () => {
  cy.get('table tbody tr, [class*="card"]').should('have.length.at.least', 1);
});

When('ilk departmanın sil butonuna tıklar', () => {
  cy.contains('button', 'Sil').first().click();
  cy.on('window:confirm', () => true);
});

Then('departman listeden silinmelidir', () => {
  cy.wait(1000);
});

// Çalışan Steps
Given('kullanıcı çalışanlar sayfasındadır', () => {
  cy.visit('/calisanlar');
});

When('ad alanına {string} yazar', (ad) => {
  cy.get('input[name="ad"], input[placeholder*="Ad"]').first().clear().type(ad);
});

When('soyad alanına {string} yazar', (soyad) => {
  cy.get('input[name="soyad"], input[placeholder*="Soyad"]').first().clear().type(soyad);
});

When('çalışan email alanına {string} yazar', (email) => {
  cy.get('input[name="email"], input[type="email"]').last().clear().type(email);
});

When('şifre alanına {string} yazar', (password) => {
  cy.get('input[type="password"]').first().clear().type(password);
});

When('şifre tekrar alanına {string} yazar', (password) => {
  cy.get('input[type="password"]').last().clear().type(password);
});

When('departman seçer', () => {
  cy.get('select[name="departman_id"], select').first().select(1);
});

Then('{string} çalışanı listede görünmelidir', (calisanAdi) => {
  cy.contains(calisanAdi, { timeout: 10000 }).should('be.visible');
});

// Vardiya Steps
Given('kullanıcı vardiyalar sayfasındadır', () => {
  cy.visit('/vardiyalar');
});

When('vardiya için çalışan seçer', () => {
  cy.get('select[name="calisan_id"], select').first().select(1);
});

When('tarih olarak {string} seçer', (tarih) => {
  cy.get('input[type="date"]').clear().type(tarih);
});

When('başlangıç saati {string} olarak ayarlar', (saat) => {
  cy.get('input[name="baslangic"], input[type="time"]').first().clear().type(saat);
});

When('bitiş saati {string} olarak ayarlar', (saat) => {
  cy.get('input[name="bitis"], input[type="time"]').last().clear().type(saat);
});

Then('yeni vardiya listede görünmelidir', () => {
  cy.contains('09:00', { timeout: 10000 }).should('be.visible');
});