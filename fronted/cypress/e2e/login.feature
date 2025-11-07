Feature: Login ve Sayfa Geçişleri
  Kullanıcı sistemde login olabilmelidir ve diğer sayfalara geçiş yapabilmelidir

  Scenario: Kullanıcı login olur ve departmanlar, çalışanlar ve vardiyalar sayfalarını görür
    Given kullanıcı login sayfasındadır
    When email alanına "sude.yazici@example.com" yazar
    And password alanına "123456" yazar
    And "Giriş Yap" butonuna tıklar
    Then kullanıcı departmanlar sayfasına yönlendirilmelidir ve yeni departman ekleyebilir
    Then kullanıcı çalışanlar sayfasına geçebilir ve yeni çalışan ekleyebilir
    Then kullanıcı vardiyalar sayfasına geçebilir ve yeni vardiya ekleyebilir
