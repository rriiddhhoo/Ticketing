import React from 'react';
import { Sparkles, Calendar, MapPin, Tag, ShieldCheck, Flame, HeartHandshake } from 'lucide-react';
import { ConcertGenre } from '../types';

interface HeroProps {
  onGenreSelect: (genre: ConcertGenre | 'All') => void;
  selectedGenre: ConcertGenre | 'All';
  onCitySelect: (city: string | 'All') => void;
  selectedCity: string | 'All';
  onFeaturedClick: (concertId: string) => void;
}

export default function Hero({ onGenreSelect, selectedGenre, onCitySelect, selectedCity, onFeaturedClick }: HeroProps) {
  const genres: (ConcertGenre | 'All')[] = ['All', 'Pop', 'Rock', 'Indie', 'Jazz', 'EDM', 'R&B', 'K-Pop'];
  const cities = ['All', 'Jakarta', 'Bandung', 'Bali'];

  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white py-12 md:py-20 px-4 sm:px-6 md:px-8" id="hero-section">
      {/* Dynamic Background Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-zinc-950/50 to-zinc-950 z-0"></div>
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Slogan & Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider" id="hero-badge">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Platfrom Booking Tiket Konser Terpercaya</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight leading-tight" id="hero-main-title">
              Amankan Tiket <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                Konser Impian Anda
              </span> <br />
              dalam Sekejap.
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base md:text-lg font-sans max-w-xl leading-relaxed" id="hero-sub-title">
              Nikmati kenyamanan berbelanja tiket konser resmi klian kami. Bebas calo, sistem antrean aman, dengan konfirmasi instan langsung berbentuk E-Tiket berfitur QR Code unik.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-zinc-900" id="hero-trust-metrics">
              <div className="flex gap-2 items-start">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold leading-tight">100% Garansi Resmi</p>
                  <p className="text-[10px] text-zinc-500">Tiket langsung dari promotor</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Flame className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold leading-tight">Sistem Anti-Calo</p>
                  <p className="text-[10px] text-zinc-500">Integrasi data identitas sah</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <HeartHandshake className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold leading-tight">Layanan Bantuan</p>
                  <p className="text-[10px] text-zinc-500">Customer Support 24/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlighted Banner Interactive Promo card */}
          <div className="lg:col-span-5" id="hero-promo-wrapper">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden p-4 shadow-2xl relative group">
              <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-zinc-950/80 border border-amber-400 rounded-md text-amber-400 text-[10px] font-mono font-bold tracking-wider">
                FEATURED EVENT
              </div>
              
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop" 
                  alt="Dewa 19 Concert" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  <span className="px-2 py-0.5 bg-orange-500 rounded text-[10px] font-semibold text-black">ROCK</span>
                  <span className="px-2 py-0.5 bg-zinc-800/80 rounded text-[10px] text-zinc-300">Jakarta</span>
                </div>
              </div>

              <div>
                <h3 className="font-sans font-bold text-lg text-white mb-1 group-hover:text-amber-400 transition-colors">
                  Dewa 19: Symphony of 3 Decades
                </h3>
                <p className="text-zinc-400 text-xs line-clamp-2 mb-3">
                  Konser perayaan mahakarya Dewa 19 selama lebih dari 30 tahun berkarya di belantika musik Indonesia menampilkan 3 vokalis legendaris...
                </p>

                <div className="flex justify-between items-center bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 mb-4 text-xs font-sans">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>17 Oktober 2026</span>
                  </div>
                  <div className="font-mono text-amber-400 font-semibold">
                    Mulai Rp 450k
                  </div>
                </div>

                <button 
                  onClick={() => onFeaturedClick('c3')}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold rounded-xl text-center text-sm cursor-pointer transition-all duration-200"
                  id="hero-featured-action"
                >
                  Pesan Tiket Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Filtering Tabs (Genres & Cities) */}
        <div className="mt-12 pt-8 border-t border-zinc-900 text-left" id="hero-filter-tabs">
          <div className="flex flex-col gap-4">
            {/* Genre filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs font-bold text-zinc-400 flex items-center gap-1 tracking-wider uppercase shrink-0">
                <Tag className="w-3.5 h-3.5 text-amber-500" /> Kategori Musik:
              </span>
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {genres.map((g) => (
                  <button
                    key={g}
                    onClick={() => onGenreSelect(g)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 ${
                      selectedGenre === g
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-850 hover:text-white'
                    }`}
                  >
                    {g === 'All' ? 'Semua Genre' : g}
                  </button>
                ))}
              </div>
            </div>

            {/* City filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-xs font-bold text-zinc-400 flex items-center gap-1 tracking-wider uppercase shrink-0">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> Lokasi Kota:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => onCitySelect(city)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full cursor-pointer transition-all duration-200 ${
                      selectedCity === city
                        ? 'bg-zinc-100 text-zinc-950 border border-zinc-100'
                        : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-850 hover:text-white'
                    }`}
                  >
                    {city === 'All' ? 'Semua Kota' : city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
