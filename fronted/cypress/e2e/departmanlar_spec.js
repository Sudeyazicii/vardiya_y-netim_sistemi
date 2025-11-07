describe("Departmanlar Page", () => {
  beforeEach(() => {
    cy.visit("/departmanlar");
  });

  it("should add a new department", () => {
    cy.contains("Yeni Departman Ekle").click();
    cy.get('input[placeholder="Ad"]').type("IT");
    cy.contains("Kaydet").click();
    cy.contains("IT").should("be.visible");
  });
});
