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
| `phone_click`      | Telefon numarasına tıklama                   | —                                         |
| `contact_form_submit` | İletişim formu gönderildi (mesaj sana ulaştı) | —                                     |
| `contact_form_error`  | İletişim formu gönderilemedi               | —                                         |
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

GTM tek başına bir şey kaydetmez: site olayları `dataLayer`'a gönderir, ama GTM'de
onları GA4'e ileten etiketler yoksa GA4'e hiçbir şey ulaşmaz. Bütün kurulum
[`gtm-container.json`](gtm-container.json) dosyasında hazır.

1. **GA4 mülkü oluştur** (analytics.google.com → Yönetici → Oluştur → Mülk), bir
   *Web* veri akışı ekle (`https://huseyinsade.dev`) ve Ölçüm Kimliğini kopyala (`G-XXXXXXXXXX`).
2. **İçe aktar:** GTM → Yönetici → *Kapsayıcıyı İçe Aktar* → `docs/gtm-container.json`
   → Çalışma alanı: *Mevcut* (Default Workspace) → **Birleştir** → *Çakışan öğeleri yeniden adlandır*
   → Onayla. Gelenler:
   - Etiket **Google tag - GA4** (Initialization - All Pages)
   - Etiket **GA4 event - site events** (olay adı `{{Event}}`, parametreler `label`,
     `link_url`, `section`, `page_language`, `consent`)
   - Tetikleyici **CE - site events** (sitedeki tüm olaylar, normal ifade ile)
   - Değişkenler: `GA4 Measurement ID` ve beş *Veri Katmanı Değişkeni*
3. **Ölçüm kimliği:** Dosyada `G-5F4D5PJZQT` olarak hazır (Değişkenler → `GA4 Measurement ID`). Başka bir mülke geçersen yalnızca bunu değiştir.
4. **Önizle** ile siteyi aç, çerez banner'ında *İzin ver* de ve bir şeylere tıkla. Tag
   Assistant'ta `nav_click`, `project_click` gibi olayların altında *GA4 event - site events*
   etiketinin **tetiklendiğini** gör.
5. **Gönder → Yayınla.** Yayınlamadan canlı sitede hiçbir şey çalışmaz.

Kontrol: GA4 → Raporlar → **Gerçek zamanlı** ekranında olaylar birkaç saniyede görünür.
Standart raporlara düşmesi 24–48 saat sürebilir.

## GA4'te yapılacaklar

- Yönetici → Özel tanımlar → **Özel boyut oluştur** (kapsam: Etkinlik):
  `label`, `section`, `page_language`. Bunu yapmazsan parametreler raporlarda görünmez.
- Raporlar:
  - **Kaç ziyaret?** Raporlar → Kullanıcı edinme / Etkileşim → Sayfalar ve ekranlar.
  - **En çok neye tıklandı?** Raporlar → Etkileşim → Etkinlikler → `project_click`
    → `label` boyutuna göre kır.
  - **Ne kadar aşağı okundu?** `section_view` olayını `section` boyutuna göre kır.
  - Daha esnek tablolar için **Keşfet** (Explorations) → Serbest biçim.
