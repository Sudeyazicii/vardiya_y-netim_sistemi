describe('Departmanlar', () => {
  it('Yeni departman ekleyebilmeliyim', () => {
    cy.visit('/departmanlar')
    cy.contains('Yeni Departman Ekle').click()
    cy.get('input[name="ad"]').type('Muhasebe')
    cy.contains('Kaydet').click()
    cy.contains('Muhasebe')
  })

  it('Departman silebilmeliyim', () => {
    cy.visit('/departmanlar')
    cy.contains('Muhasebe').parent().contains('Sil').click()
    cy.contains('Muhasebe').should('not.exist')
  })
})

describe('Çalışanlar', () => {
  it('Yeni çalışan ekleyebilmeliyim', () => {
    cy.visit('/calisanlar')
    cy.contains('Yeni Çalışan Ekle').click()
    cy.get('input[name="ad"]').type('Ahmet')
    cy.get('input[name="soyad"]').type('Yılmaz')
    cy.get('input[name="email"]').type('ahmet@example.com')
    cy.get('select[name="departman"]').select('Muhasebe')
    cy.contains('Kaydet').click()
    cy.contains('Ahmet Yılmaz')
  })
})
