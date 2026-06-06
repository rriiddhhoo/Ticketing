import React from 'react';
import { Ticket, Search, User, ClipboardList, Sparkles } from 'lucide-react';
import logoMahana from '@/assets/logomahana.png';

interface NavbarProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
  onMyTicketsClick: () => void;
  ticketCount: number;
}

export default function Navbar({ onSearchChange, searchQuery, onMyTicketsClick, ticketCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 py-3 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src={logoMahana} 
              alt="Mahana Logo" 
              className="h-10 w-auto object-contain hover:scale-105 transition-transform" 
              id="nav-brand-logo" 
            />
          </div>

          {/* Mobile Tickets Access Button */}
          <button
            onClick={onMyTicketsClick}
            className="md:hidden relative flex items-center gap-2 px-3 py-2 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-lg text-xs font-medium cursor-pointer transition-colors"
            id="mobile-ticket-badge-btn"
          >
            <ClipboardList className="w-4 h-4 text-zinc-700" />
            <span>Tiket Saya</span>
            {ticketCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white ring-2 ring-white animate-bounce">
                {ticketCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Input Panel */}
        <div className="flex-1 max-w-md mx-auto md:mx-6 w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari konser favorit Anda, artis, atau kota..."
            className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:bg-white text-zinc-900 text-sm rounded-xl outline-none transition-all placeholder:text-zinc-400 font-sans"
            id="nav-search-input"
          />
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onMyTicketsClick}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 text-zinc-800 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
            id="desktop-ticket-badge-btn"
          >
            <ClipboardList className="w-4.5 h-4.5 text-zinc-700" />
            <span className="font-sans">Tiket Saya</span>
            {ticketCount > 0 ? (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-zinc-950 px-1.5 text-xs font-mono font-bold text-white ring-2 ring-amber-400">
                {ticketCount}
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-zinc-300"></span>
            )}
          </button>

          <div className="flex items-center gap-2 pl-3 border-l border-zinc-200">
            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-600 font-bold text-xs" id="nav-user-avatar">
              <User className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-xs font-semibold text-zinc-800 leading-none" id="nav-user-name">Guest Explorer</p>
              <p className="text-[10px] text-zinc-400 leading-tight">Member</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
