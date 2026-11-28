# Supabase kurulumu

Site Supabase'i tarayıcıdan, **publishable key** ile çağırır (`lib/supabase.ts`).
Bu anahtar herkese açık olacak şekilde tasarlanmıştır; veriyi koruyan şey tablolardaki
**Row Level Security** kurallarıdır. Veritabanı şifresi ve secret / service_role key
sitede hiçbir yerde kullanılmaz — onları kimseyle paylaşma.

## Bir kez yapılacak

1. Supabase → **SQL Editor** → [`supabase/schema.sql`](../supabase/schema.sql) içeriğini yapıştır → **Run**.
   Tekrar çalıştırmak güvenlidir.
2. Bitti. Hero'daki müsaitlik rozeti ve form kaydı hemen çalışmaya başlar.

## Ne yapıyor

| Tablo         | Site ne yapabilir                  | Sen nereden yönetirsin |
| ------------- | ---------------------------------- | ---------------------- |
| `messages`    | Sadece **ekler** (form mesajları). Okuyamaz, silemez. | Table Editor → `messages` (`read` sütunuyla okundu işaretle) |
| `site_status` | Sadece **okur** (`available`).     | Table Editor → `site_status` → `available` true / false |

- **İletişim formu** mesajı aynı anda iki yere gönderir: Supabase'e kaydeder (kaybolmaz)
  ve FormSubmit ile sana mail atar. İkisinden biri çalışırsa ziyaretçi "gönderildi" görür.
- **Müsaitlik rozeti**: `available = true` → "Yeni projelere açığım",
  `false` → "Şu an yeni proje almıyorum". Değiştirdiğin an sitede görünür, build gerekmez.
  Okunamazsa rozet hiç gösterilmez.

## Ayarlar

Varsayılan URL ve anahtar `lib/supabase.ts` içinde. Başka bir projeye geçmek için:
`NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` ortam değişkenleri.

## Bilinen sınır

Form kaydında hız sınırı yok (statik sitede sunucu yok). Gizli bot alanı ve tablo
kısıtları (uzunluk, e-posta biçimi) temel spam'i keser. Spam artarsa bir Supabase Edge
Function ile Cloudflare Turnstile doğrulaması eklenebilir.
