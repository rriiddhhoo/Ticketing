import React, { useState, useEffect } from 'react';
import { CONCERTS } from './data/concerts';
import { Concert, ConcertGenre, BookingDetails } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ConcertCard from './components/ConcertCard';
import BookingModal from './components/BookingModal';
import MyTickets from './components/MyTickets';
import { Bookmark, Star, ArrowUpRight, ShieldCheck, Heart, Sparkles, FilterX, HelpCircle } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<ConcertGenre | 'All'>('All');
  const [selectedCity, setSelectedCity] = useState<string | 'All'>('All');
  
  // Modal states
  const [activeConcert, setActiveConcert] = useState<Concert | null>(null);
  
  // Bookings list state with localStorage hydration
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [showTicketsPanel, setShowTicketsPanel] = useState(false);

  // Load from localStorage on initialization
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('festpass_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    } catch (e) {
      console.error('Failed to load tickets from localStorage', e);
    }
  }, []);

  // Save bookings helper
  const handleConfirmBooking = (newBooking: BookingDetails) => {
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    try {
      localStorage.setItem('festpass_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Failed to save booking to localStorage', e);
    }
    
    // Automatically trigger notification display after custom timeout
    setTimeout(() => {
      setShowTicketsPanel(true);
      const targetElement = document.getElementById('my-tickets-wrapper');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const handleCancelBooking = (bookingId: string) => {
    const isConfirmed = window.confirm('Apakah Anda yakin ingin membatalkan/refund pemesanan tiket ini?');
    if (!isConfirmed) return;

    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);
    try {
      localStorage.setItem('festpass_bookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Failed to update bookings state in localStorage', e);
    }
  };

  const handleGenreSelect = (genre: ConcertGenre | 'All') => {
    setSelectedGenre(genre);
  };

  const handleCitySelect = (city: string | 'All') => {
    setSelectedCity(city);
  };

  const handleNavbarSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFeaturedConcertClick = (concertId: string) => {
    const concert = CONCERTS.find(c => c.id === concertId);
    if (concert) {
      setActiveConcert(concert);
    }
  };

  // Filter concert list
  const filteredConcerts = CONCERTS.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'All' || c.genre === selectedGenre;
    const matchesCity = selectedCity === 'All' || c.city === selectedCity;

    return matchesSearch && matchesGenre && matchesCity;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedCity('All');
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between font-sans selection:bg-amber-100 selection:text-zinc-900" id="applet-container">
      
      {/* Dynamic Header / Navigation Bar */}
      <Navbar 
        onSearchChange={handleNavbarSearch}
        searchQuery={searchQuery}
        onMyTicketsClick={() => setShowTicketsPanel(!showTicketsPanel)}
        ticketCount={bookings.length}
      />

      {/* Hero Banner Showcase */}
      <Hero 
        onGenreSelect={handleGenreSelect}
        selectedGenre={selectedGenre}
        onCitySelect={handleCitySelect}
        selectedCity={selectedCity}
        onFeaturedClick={handleFeaturedConcertClick}
      />

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8 w-full space-y-12">
        
        {/* Conditional "My Tickets" Active Panel Display */}
        {showTicketsPanel && (
          <section className="bg-white rounded-2xl shadow-sm border border-zinc-150 overflow-hidden transition-all duration-300">
            <MyTickets 
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              onClose={() => setShowTicketsPanel(false)}
            />
          </section>
        )}

        {/* Concert Discovery Catalog Container */}
        <section className="space-y-6 text-left" id="discovery-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-150 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-zinc-900 flex items-center gap-2" id="discovery-title">
                <Sparkles className="w-5 h-5 text-amber-500" /> Temukan Konser Musik Favorit Anda
              </h2>
              <p className="text-xs text-zinc-400 mt-1 font-sans">
                {filteredConcerts.length} Konser tersedia di berbagai kota terkemuka Indonesia
              </p>
            </div>

            {/* Selected stats markers */}
            {(selectedGenre !== 'All' || selectedCity !== 'All' || searchQuery !== '') && (
              <button 
                onClick={handleResetFilters}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 px-3 py-1.5 bg-amber-50 rounded-lg cursor-pointer transition-colors"
                id="btn-reset-filters"
              >
                Reset Semua Filter ×
              </button>
            )}
          </div>

          {/* Concert cards main listings grid */}
          {filteredConcerts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-dashed border-zinc-250 rounded-2xl max-w-xl mx-auto space-y-4" id="empty-search-state">
              <div className="inline-flex p-4 bg-zinc-50 rounded-full text-zinc-400">
                <FilterX className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-md font-extrabold text-zinc-800">Tidak Ada Konser yang Sesuai</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Kami tidak fmenemukan hasil yang cocok untuk genre, kota, or query pencarian "{searchQuery}". Silakan atur ulang kriteria pencarian Anda.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-zinc-950 text-white font-bold rounded-xl text-xs hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                id="empty-action-reset"
              >
                Tampilkan Semua Konser
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="concerts-main-grid">
              {filteredConcerts.map((concert) => (
                <ConcertCard 
                  key={concert.id}
                  concert={concert}
                  onSelect={(c) => setActiveConcert(c)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Dynamic FAQ / User Guides for Premium ticket buyers */}
        <section className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden text-left" id="faq-guide-section">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 text-[10px] font-semibold uppercase tracking-wider">
                Panduan Pelanggan
              </span>
              <h3 className="text-2xl font-bold font-sans tracking-tight text-white">
                Cara Kerja Pemesanan di FestPass
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                Kami menyediakan langkah pembelian yang sangat ringkas, transparan, dan pastinya aman bagi semua pencinta musik tanah air.
              </p>
              <div className="pt-4 flex gap-4 text-xs font-sans">
                <div className="flex gap-1.5 items-center bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Garansi Pengembalian</span>
                </div>
                <div className="flex gap-1.5 items-center bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl text-zinc-300">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>FAQ Hub</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 border-l border-zinc-900 hidden lg:block"></div>

            <div className="lg:col-span-6 space-y-6">
              {[
                { step: '01', title: 'Pilih Konser & Kategori', desc: 'Mulailah dengan menjelajahi konser idola Anda. Pilih kategori baris tempat duduk (VIP, CAT, Tribune) sesuai dengan kenyamanan dan bujet Anda.' },
                { step: '02', title: 'Isi Detail Identitas Sah', desc: 'Masukkan nama sesuai kartu identitas (KTP/SIM/Paspor) serta email aktif. Data identitas digunakan untuk validasi masuk di pintu gate konser.' },
                { step: '03', title: 'Selesaikan Pembayaran', desc: 'Gunakan saldo E-Wallet digital favorit (QRIS) atau transfer bank. Sistem kami akan menyelesaikan verifikasi dana dalam waktu kurang dari 3 detik.' },
                { step: '04', title: 'Simpan E-Tiket Barcode Anda', desc: 'Unduh E-tiket lengkap dengan QR Code or Barcode unik. Tunjukkan e-tiket langsung dari gawai Anda di pintu lobi konser untuk dipindai!' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="font-mono font-extrabold text-lg text-amber-400 shrink-0">{item.step}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1 font-sans">{item.title}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer Design Branding, payments list, client indicators */}
      <footer className="bg-white border-t border-zinc-200 mt-20 pt-12 pb-6 px-4 sm:px-6 md:px-8 text-left" id="footer-panel">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo brand pitch */}
          <div className="space-y-4">
            <h4 className="font-sans font-black text-lg text-zinc-900">
              FestPass<span className="text-amber-500 font-extrabold">.</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Gateway terpercaya untuk tiket pertunjukan konser musik megah dan festival di Indonesia. Menghubungkan promotor resmi dengan jutaan penggemar berat secara instan.
            </p>
            <p className="text-[10px] text-zinc-400 font-mono">
              © 2026 FestPass Inc. All rights reserved.
            </p>
          </div>

          {/* Quick genres lists */}
          <div>
            <h5 className="font-sans font-bold text-xs text-zinc-900 uppercase tracking-widest mb-3.5">Genre Musik Terfavorit</h5>
            <ul className="space-y-2 text-xs text-zinc-500 font-sans">
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedGenre('Pop')}>Lantunan Musik Pop Romantis</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedGenre('Rock')}>Guncangan Distorsi Rock Legendaris</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedGenre('Indie')}>Musik Indie Gelombang Baru</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedGenre('K-Pop')}>Panggung Megah Gemerlap K-Pop</li>
            </ul>
          </div>

          {/* Location listings */}
          <div>
            <h5 className="font-sans font-bold text-xs text-zinc-900 uppercase tracking-widest mb-3.5">Lokasi Utama Cabang</h5>
            <ul className="space-y-2 text-xs text-zinc-500 font-sans">
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedCity('Jakarta')}>Konser Istora & GBK Jakarta</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedCity('Bandung')}>Seni Pegunungan Bandung</li>
              <li className="hover:text-amber-500 cursor-pointer transition-colors" onClick={() => setSelectedCity('Bali')}>Amphitheatre GWK Pantai Bali</li>
            </ul>
          </div>

          {/* Newsletter mockup */}
          <div className="space-y-4">
            <h5 className="font-sans font-bold text-xs text-zinc-900 uppercase tracking-widest leading-none">Berlangganan Info Konser</h5>
            <p className="text-xs text-zinc-400 font-sans">
              Jadilah orang pertama yang mendapatkan notifikasi presale tiket artis idola Anda langsung ke email.
            </p>
            <div className="flex gap-1.5">
              <input 
                type="email" 
                placeholder="Alamat email Anda..." 
                className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200 text-xs rounded-xl focus:border-zinc-950 focus:bg-white outline-none"
              />
              <button 
                onClick={() => window.alert('Terima kasih! Anda sukses terdaftar dalam list buletin promotor konser FestPass.')}
                className="px-3.5 py-2 bg-zinc-900 hover:bg-amber-500 hover:text-zinc-950 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
                title="Daftar"
              >
                Gabung
              </button>
            </div>
          </div>
        </div>

        {/* Accepted Payment Gateway Icons */}
        <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-150 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-zinc-400">
          <div className="flex flex-wrap items-center gap-3">
            <span>Pembayaran Resmi Didukung: </span>
            <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-650">BCA Transfer</span>
            <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-650">Mandiri Virtual Account</span>
            <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-650">GoPay Digital</span>
            <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-650">OVO</span>
            <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-650">QRIS Bersama</span>
          </div>
          <div>
            <span>Verified by <strong>FestPass Secure SSL Encryption</strong></span>
          </div>
        </div>
      </footer>

      {/* Global Booking Modal display logic */}
      {activeConcert && (
        <BookingModal 
          concert={activeConcert}
          onClose={() => setActiveConcert(null)}
          onConfirmBooking={handleConfirmBooking}
        />
      )}

    </div>
  );
}
