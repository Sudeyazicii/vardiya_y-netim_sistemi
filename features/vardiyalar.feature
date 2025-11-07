Feature: Vardiya Yönetimi
  As a user
  I want to manage shifts
  So that I can track employees’ schedules

  Scenario: Yeni vardiya ekleme
    Given I am on the "Vardiyalar" page
    When I click "Yeni Vardiya Ekle"
    And I select "Ahmet Yılmaz" for "Çalışan"
    And I pick date "2025-11-08" for "Tarih"
    And I pick time "09:00" for "Başlangıç"
    And I pick time "17:00" for "Bitiş"
    And I submit the form
    Then I should see "Ahmet Yılmaz" in the list

  Scenario: Vardiya silme
    Given I am on the "Vardiyalar" page
    When I click "Sil" on "Ahmet Yılmaz"
    Then I should not see "Ahmet Yılmaz" in the list