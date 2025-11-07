Feature: Çalışan Yönetimi
  As a user
  I want to manage employees
  So that I can assign shifts

  Scenario: Yeni çalışan ekleme
    Given I am on the "Çalışanlar" page
    When I click "Yeni Çalışan Ekle"
    And I fill in "Ad" with "Ahmet"
    And I fill in "Soyad" with "Yılmaz"
    And I fill in "Email" with "ahmet@example.com"
    And I select "Muhasebe" for "Departman"
    And I submit the form
    Then I should see "Ahmet Yılmaz" in the list

  Scenario: Çalışan silme
    Given I am on the "Çalışanlar" page
    When I click "Sil" on "Ahmet Yılmaz"
    Then I should not see "Ahmet Yılmaz" in the list