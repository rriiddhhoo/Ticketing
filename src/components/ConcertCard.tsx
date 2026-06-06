import React from 'react';
import { MapPin, Calendar, ArrowRight, Music, Sparkles } from 'lucide-react';
import { Concert } from '../types';

interface ConcertCardProps {
  key?: string;
  concert: Concert;
  onSelect: (concert: Concert) => void;
}

// Indonesian Month Names Helper
export function formatIndoDate(dateString: string): string {
  const dateObj = new Date(dateString);
  if (isNaN(dateObj.getTime())) return dateString;
  
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  
  // Format to Indonesian locale if possible
  return dateObj.toLocaleDateString('id-ID', options);
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function ConcertCard({ concert, onSelect }: ConcertCardProps) {
  // Get minimum price from tiers
  const minPrice = concert.tiers.length > 0 
    ? Math.min(...concert.tiers.map(t => t.price)) 
    : 0;

  // Status Badge Colors Mapping
  const statusConfig = {
    'Available': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'Tersedia' },
    'Selling Fast': { bg: 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse', text: 'Hampir Habis' },
    'Presale': { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'Presale Aktif' },
    'Sold Out': { bg: 'bg-zinc-100 text-zinc-500 border-zinc-200', text: 'Habis Terjual' }
  };

  const currentStatus = statusConfig[concert.status] || { bg: 'bg-zinc-50 text-zinc-700 border-zinc-200', text: concert.status };

  return (
    <div 
      className="group bg-white border border-zinc-150 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
      id={`concert-card-${concert.id}`}
    >
      {/* Concert Cover Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
        <img 
          src={concert.imageUrl} 
          alt={concert.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Genre Pill overlay */}
        <div className="absolute top-3 left-3 flex gap-1.5 items-center">
          <span className="px-2.5 py-1 bg-zinc-950/80 backdrop-blur-sm text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded-lg border border-zinc-800/80">
            {concert.genre}
          </span>
          {concert.isFeatured && (
            <span className="px-2.5 py-1 bg-amber-400 text-zinc-950 text-[10px] font-bold uppercase rounded-lg flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 fill-zinc-950" /> Featured
            </span>
          )}
        </div>

        {/* City Badge Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-zinc-200 shadow-sm flex items-center gap-1">
          <MapPin className="w-3 h-3 text-red-500" />
          <span className="text-zinc-800 font-sans font-semibold text-xs">{concert.city}</span>
        </div>
      </div>

      {/* Card Content details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Status, Date */}
          <div className="flex items-center justify-between mb-3">
            <span className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase border rounded-md ${currentStatus.bg}`}>
              {currentStatus.text}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
              <Calendar className="w-3 h-3 text-zinc-400" />
              <span>{formatIndoDate(concert.date)}</span>
            </div>
          </div>

          {/* Title & Artists */}
          <h3 className="font-sans font-bold text-lg text-zinc-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
            {concert.title}
          </h3>
          <p className="text-zinc-500 text-xs font-medium mb-3 flex items-center gap-1">
            <Music className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="truncate">{concert.artist}</span>
          </p>

          {/* Description */}
          <p className="text-zinc-400 text-xs font-sans line-clamp-2 mb-4 leading-relaxed">
            {concert.description}
          </p>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Harga Mulai</p>
            <p className="text-md font-extrabold text-zinc-950 font-mono">
              {formatRupiah(minPrice)}
            </p>
          </div>

          <button 
            onClick={() => onSelect(concert)}
            className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 transition-all duration-200 ${
              concert.status === 'Sold Out'
                ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
                : 'bg-zinc-950 text-white hover:bg-amber-500 hover:text-zinc-950 shadow-sm'
            }`}
            disabled={concert.status === 'Sold Out'}
            id={`btn-select-${concert.id}`}
          >
            {concert.status === 'Sold Out' ? 'Habis' : 'Pesan Tiket'}
            {concert.status !== 'Sold Out' && <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}
