describe("Çalışanlar Page", () => {
  beforeEach(() => {
    cy.visit("/calisanlar");
  });

  it("should add a new employee", () => {
    cy.contains("Yeni Çalışan Ekle").click();
    cy.get('input[placeholder="Ad"]').type("Ahmet");
    cy.get('input[placeholder="Soyad"]').type("Yılmaz");
    cy.get('input[placeholder="Email"]').type("ahmet@example.com");
    cy.get('select').select("IT"); // Departman dropdown
    cy.contains("Kaydet").click();
    cy.contains("Ahmet").should("be.visible");
  });
});
