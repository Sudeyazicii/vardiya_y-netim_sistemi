describe("Login Page", () => {
  it("should login successfully", () => {
    cy.visit("/login")

    cy.get('input[placeholder="Email adresinizi girin"]').type("test@example.com")
    cy.get('input[placeholder="Şifrenizi girin"]').type("123456")

    cy.contains("Giriş Yap").click()

    // Redirected to Departmanlar page
    cy.url().should("include", "/departmanlar")
  })
})
