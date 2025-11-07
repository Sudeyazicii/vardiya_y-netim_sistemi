Feature: Departman Yönetimi
  As a user
  I want to manage departments
  So that I can organize employees

  Scenario: Yeni departman ekleme
    Given I am on the "Departmanlar" page
    When I click "Yeni Departman Ekle"
    And I fill in "Ad" with "Muhasebe"
    And I submit the form
    Then I should see "Muhasebe" in the list

  Scenario: Departman silme
    Given I am on the "Departmanlar" page
    When I click "Sil" on "Muhasebe"
    Then I should not see "Muhasebe" in the list
