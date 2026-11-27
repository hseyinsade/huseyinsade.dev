# Analitik kurulumu (GTM + GA4)

Site, Google Tag Manager konteynerini (`GTM-WRSC5BBD`) her sayfada yükler ve
anlamlı olayları `dataLayer`'a gönderir. GTM tarafında bu olayları Google
Analytics 4'e (GA4) iletmek için aşağıdaki adımları **bir kez** yapman yeterli.

Konteyner kimliğini değiştirmek için: `NEXT_PUBLIC_GTM_ID` ortam değişkeni
(yoksa `lib/analytics.ts` içindeki varsayılan kullanılır).

## Siteden gelen olaylar

| Olay (`event`)     | Ne zaman                                     | Parametreler                              |
| ------------------ | -------------------------------------------- | ----------------------------------------- |
| `section_view`     | Bir bölüm ilk kez ekranın ortasına geldiğinde | `section` (top, work, experience, stack, contact) |
| `cta_click`        | Hero'daki butonlar                           | `label` (get_in_touch, see_work)          |
| `nav_click`        | Üst menü linkleri                            | `label` (work, experience, stack, contact) |
| `project_click`    | Bir projenin linki                           | `label` (proje adı), `link_url`           |
| `outbound_click`   | GitHub / LinkedIn / Links                    | `label`, `link_url`                       |
| `email_click`      | E-posta adresine tıklama                     | —                                         |
| `email_copy`       | "Kopyala" butonu                             | —                                         |
| `language_switch`  | EN / TR / DE değişimi                        | `label` (en, tr, de)                      |
| `theme_toggle`     | Açık / koyu tema                             | `label` (yeni tema)                       |
| `inspect_toggle`   | İnceleme modu                                | `label` (on, off)                         |
| `code_tab`         | Hero'daki kod kartında sekme değişimi        | `label` (tsx, js, vue, angular)           |
| `consent_update`   | Çerez banner'ında seçim                      | `consent` (granted, denied)               |

Her olayda `page_language` (en / tr / de) da gönderilir.

## Çerez izni (Consent Mode v2)

- Varsayılan: `analytics_storage` ve tüm reklam izinleri **denied**.
- Ziyaretçi "İzin ver" derse `analytics_storage: granted` olur; seçim
  `localStorage`'da saklanır ve sonraki ziyaretlerde GTM başlamadan uygulanır.
- Reklam izinleri hiçbir zaman verilmez (site reklam kullanmıyor).
- Footer'daki "Çerez tercihleri" butonu banner'ı tekrar açar.
- İzin vermeyen ziyaretçiler için GA4 çerezsiz, anonim sinyaller gönderir;
  GA4 bunlarla ziyaret sayısını tahmin edebilir (modelleme).

## GTM'de yapılacaklar

1. **GA4 mülkü oluştur** (analytics.google.com) ve Ölçüm Kimliğini al (`G-XXXXXXXXXX`).
2. **Google Etiketi:** Etiketler → Yeni → *Google Etiketi* → Etiket kimliği: `G-XXXXXXXXXX`
   → Tetikleyici: *Initialization - All Pages*.
3. **Veri Katmanı Değişkenleri:** Değişkenler → Yeni → *Veri Katmanı Değişkeni*, şu adlarla
   birer tane: `label`, `link_url`, `section`, `page_language`.
4. **Tetikleyici:** Tetikleyiciler → Yeni → *Özel Etkinlik* →
   Etkinlik adı: `^(section_view|cta_click|nav_click|project_click|outbound_click|email_click|email_copy|language_switch|theme_toggle|inspect_toggle|code_tab)$`
   → *Normal ifade eşleşmesi kullan* işaretli.
5. **GA4 Etkinlik etiketi:** Etiketler → Yeni → *Google Analytics: GA4 Etkinliği* →
   Ölçüm kimliği: `G-XXXXXXXXXX` → Etkinlik adı: `{{Event}}` →
   Etkinlik parametreleri: `label` = `{{label}}`, `link_url` = `{{link_url}}`,
   `section` = `{{section}}`, `page_language` = `{{page_language}}` →
   Tetikleyici: 4. adımdaki.
6. **Önizle** ile siteyi açıp olayların geldiğini kontrol et, sonra **Gönder / Yayınla**.

## GA4'te yapılacaklar

- Yönetici → Özel tanımlar → **Özel boyut oluştur** (kapsam: Etkinlik):
  `label`, `section`, `page_language`. Bunu yapmazsan parametreler raporlarda görünmez.
- Raporlar:
  - **Kaç ziyaret?** Raporlar → Kullanıcı edinme / Etkileşim → Sayfalar ve ekranlar.
  - **En çok neye tıklandı?** Raporlar → Etkileşim → Etkinlikler → `project_click`
    → `label` boyutuna göre kır.
  - **Ne kadar aşağı okundu?** `section_view` olayını `section` boyutuna göre kır.
  - Daha esnek tablolar için **Keşfet** (Explorations) → Serbest biçim.
