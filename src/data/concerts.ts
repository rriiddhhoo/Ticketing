import { Concert } from '../types';

export const CONCERTS: Concert[] = [
  {
    id: 'c1',
    title: 'Hindia & Lomba Sihir: Blue Waves Tour',
    artist: 'Hindia, Lomba Sihir',
    genre: 'Indie',
    date: '2026-08-22',
    time: '19:00 WIB',
    venue: 'Tennis Indoor Senayan',
    city: 'Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop',
    description: 'Kolaborasi panggung megah antara Hindia dan Lomba Sihir dalam rangkaian tur album terbaru mereka. Rasakan energi musik indie gelombang baru Indonesia secara langsung dengan tata cahaya memukau dan visual art interaktif.',
    isFeatured: true,
    status: 'Selling Fast',
    tiers: [
      { id: 't1_vip', name: 'VIP (Festival)', price: 850000, capacity: 500, sold: 420, benefits: ['Akses Dekat Panggung', 'Official Lanyard', 'Prioritas Antrean Masuk'] },
      { id: 't1_cat1', name: 'CAT 1 (Tribune)', price: 550000, capacity: 1000, sold: 950, benefits: ['Nomor Kursi Terjamin', 'Sertifikat Konser'] },
      { id: 't1_cat2', name: 'CAT 2 (Tribune)', price: 350000, capacity: 1500, sold: 1100, benefits: ['Nomor Kursi Terjamin'] }
    ]
  },
  {
    id: 'c2',
    title: 'Tulus: Monokrom Orchestral Session',
    artist: 'Tulus',
    genre: 'Pop',
    date: '2026-09-12',
    time: '20:00 WIB',
    venue: 'JIExpo Theatre Kemayoran',
    city: 'Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    description: 'Nikmati keindahan puisi-puisi melodi Tulus dengan aransemen orkestra megah yang dipimpin oleh konduktor ternama Indonesia. Malam penuh kehangatan, nostalgi, dan lantunan suara merdu nan syahdu bergaya teatrikal klasik.',
    isFeatured: true,
    status: 'Available',
    tiers: [
      { id: 't2_diamond', name: 'Diamond VIP', price: 1750000, capacity: 200, sold: 50, benefits: ['Kursi Baris Depan', 'Exclusive Merchandise Bag', 'Pre-show Lounge Access', 'Signed Poster'] },
      { id: 't2_platinum', name: 'Platinum', price: 1250000, capacity: 400, sold: 180, benefits: ['Kursi Strategis Tengah', 'Exclusive Merchandise Bag'] },
      { id: 't2_gold', name: 'Gold', price: 850000, capacity: 600, sold: 250, benefits: ['Kursi Sayap Kiri/Kanan'] },
      { id: 't2_silver', name: 'Silver', price: 450000, capacity: 800, sold: 300, benefits: [] }
    ]
  },
  {
    id: 'c3',
    title: 'Dewa 19: Symphony of 3 Decades',
    artist: 'Dewa 19, Ari Lasso, Virzha, Ello',
    genre: 'Rock',
    date: '2026-10-17',
    time: '19:30 WIB',
    venue: 'Stadion Utama Gelora Bung Karno',
    city: 'Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    description: 'Konser perayaan mahakarya Dewa 19 selama lebih dari 30 tahun berkarya di belantika musik Indonesia. Menampilkan 3 vokalis legendaris sekaligus dalam satu panggung spektakuler berlatarkan kemegahan orkestra penuh.',
    isFeatured: true,
    status: 'Presale',
    tiers: [
      { id: 't3_super_vip', name: 'SUPER VIP (Numbered Seats)', price: 2500000, capacity: 150, sold: 145, benefits: ['VIP Lounge Access', 'Official Hoodie', 'Lanyard & Badges', 'Sofa Seat Row'] },
      { id: 't3_fest_a', name: 'Festival A (Standing)', price: 950000, capacity: 2000, sold: 1200, benefits: ['Area Berdiri Depan Panggung'] },
      { id: 't3_fest_b', name: 'Festival B (Standing)', price: 650000, capacity: 3000, sold: 1500, benefits: ['Area Berdiri Belakang Festival A'] },
      { id: 't3_cat1', name: 'CAT 1 (Tribune)', price: 450000, capacity: 5000, sold: 1200, benefits: [] }
    ]
  },
  {
    id: 'c4',
    title: 'Nadin Amizah: Sunyi di Dago Tea House',
    artist: 'Nadin Amizah',
    genre: 'Indie',
    date: '2026-08-05',
    time: '18:30 WIB',
    venue: 'Dago Tea House Amphitheatre',
    city: 'Bandung',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    description: 'Pertunjukan teatrikal intim bernuansa alam pegunungan sejuk di Bandung. Nadin Amizah akan merajut kisah-kisah masa kecil, dongeng keluarga, dan kesedihan manis melalui pertunjukan musik bergaya rasi dongeng yang magis.',
    status: 'Selling Fast',
    tiers: [
      { id: 't4_kamartinggi', name: 'Kamar Tinggi VIP', price: 650000, capacity: 150, sold: 130, benefits: ['Akses Paling Depan', 'Buku Cerita Eksklusif', 'Meet & Greet Singkat'] },
      { id: 't4_teras', name: 'Teras Utama', price: 400000, capacity: 350, sold: 310, benefits: ['Tempat Duduk Undakan Alami'] },
      { id: 't4_halaman', name: 'Halaman Luar', price: 250000, capacity: 500, sold: 480, benefits: [] }
    ]
  },
  {
    id: 'c5',
    title: 'Sunset Beats: Isyana x Pamungkas Live',
    artist: 'Isyana Sarasvati, Pamungkas',
    genre: 'R&B',
    date: '2026-09-26',
    time: '16:00 WITA',
    venue: 'GWK Cultural Park Amphitheatre',
    city: 'Bali',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop',
    description: 'Pertunjukan musik di sore hari menjelang matahari terbenam berlatarkan patung Garuda Wisnu Kencana yang monumental. Menyajikan transisi musik opera progresif-metal milik Isyana dengan tembang-tembang romantis-melankolis Pamungkas.',
    status: 'Available',
    tiers: [
      { id: 't5_sunset', name: 'Sunset Front Row', price: 1100000, capacity: 300, sold: 120, benefits: ['Asuransi Pembatalan', 'Drink Voucher', 'Prioritas Gate Masuk'] },
      { id: 't5_festival', name: 'General Festival (Standing)', price: 550000, capacity: 1200, sold: 600, benefits: ['Akses Area Festival Pantai/Taman'] }
    ]
  },
  {
    id: 'c6',
    title: 'Jakarta Jazz Rendezvous 2026',
    artist: 'Maliq & D\'Essentials, Joey Alexander, Eva Celia',
    genre: 'Jazz',
    date: '2026-11-08',
    time: '15:00 WIB',
    venue: 'The Kasablanka Hall',
    city: 'Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=800&auto=format&fit=crop',
    description: 'Pusat pertemuan musisi jazz lokal dan internasional terbaik tahun ini. Dari ritme jazz klasik yang dimaikan oleh sang virtuoso Joey Alexander hingga lantunan lagu pop-jazz romantis Maliq & D’Essentials yang asyik untuk berdansa.',
    status: 'Available',
    tiers: [
      { id: 't6_vippass', name: '3-Day VIP Pass', price: 1950000, capacity: 250, sold: 80, benefits: ['Akses Semua Stage', 'VIP Lounge', 'F&B Free Flow', 'Special Merchandise'] },
      { id: 't6_dailyvip', name: 'Daily VIP Pass', price: 850000, capacity: 500, sold: 150, benefits: ['Akses Semua Stage Hari Terpilih', 'VIP Lounge'] },
      { id: 't6_general', name: 'Daily General Admission', price: 450000, capacity: 1500, sold: 400, benefits: [] }
    ]
  },
  {
    id: 'c7',
    title: 'K-Pop Neon Symphony: AESPA & RIIZE Live',
    artist: 'AESPA, RIIZE',
    genre: 'K-Pop',
    date: '2026-11-29',
    time: '18:00 WIB',
    venue: 'Indonesia Convention Exhibition (ICE) BSD',
    city: 'Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1482575832494-771f74bf6857?q=80&w=800&auto=format&fit=crop',
    description: 'Malam spektakuler penuh gemerlap lightstick dari dua grup idola K-Pop paling bersinar masa kini. Pertunjukan laser tercanggih, dance cover stage megah, serta lagu-lagu hits yang akan mengguncang BSD Indonesia.',
    status: 'Selling Fast',
    tiers: [
      { id: 't7_soundcheck', name: 'Soundcheck VIP (Festival)', price: 3200000, capacity: 300, sold: 290, benefits: ['Akses Sesi Soundcheck Exclusive', 'Official Lightstick Holder', 'VIP Exclusive Photo Card', 'Lanyard VIP'] },
      { id: 't7_kat1', name: 'CAT 1 Premium (Standing)', price: 2400000, capacity: 800, sold: 650, benefits: ['Standing Area Bagian Depan', 'Official Photo Card Set'] },
      { id: 't7_kat2', name: 'CAT 2 Standard (Standing)', price: 1600000, capacity: 1500, sold: 1050, benefits: ['Standing Area Tengah'] },
      { id: 't7_kat3', name: 'CAT 3 (Tribune Seated)', price: 1200000, capacity: 2000, sold: 1500, benefits: ['Tribune seats'] }
    ]
  },
  {
    id: 'c8',
    title: 'Sigur Rós: Ambient Shadows in GWK',
    artist: 'Sigur Rós',
    genre: 'Indie',
    date: '2026-12-05',
    time: '20:00 WITA',
    venue: 'Lotus Pond GWK Park',
    city: 'Bali',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=800&auto=format&fit=crop',
    description: 'Grup band post-rock legendaris asal Islandia, Sigur Rós, kembali untuk menghipnotis Indonesia. Pertunjukan magis luar ruangan di tengah tebing-tebing kapur tinggi Lotus Pond GWK Bali, menghadirkan atmosfer magis melankolis khas arktik.',
    status: 'Sold Out',
    tiers: [
      { id: 't8_festival', name: 'Festival (Standing)', price: 1450000, capacity: 2000, sold: 2000, benefits: ['Akses Area Teater Alam Lotus Pond'] }
    ]
  }
];
