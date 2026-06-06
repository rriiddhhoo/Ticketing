import React, { useState } from 'react';
import { ClipboardList, Trash2, Calendar, MapPin, Receipt, ShieldCheck, QrCode, X } from 'lucide-react';
import { BookingDetails } from '../types';
import { formatIndoDate, formatRupiah } from './ConcertCard';

interface MyTicketsProps {
  bookings: BookingDetails[];
  onCancelBooking: (id: string) => void;
  onClose: () => void;
}

export default function MyTickets({ bookings, onCancelBooking, onClose }: MyTicketsProps) {
  const [selectedQR, setSelectedQR] = useState<BookingDetails | null>(null);

  return (
    <div className="bg-white border border-zinc-150 rounded-2xl p-6 sm:p-8" id="my-tickets-wrapper">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-6">
        <div>
          <h2 className="text-xl font-sans font-extrabold text-zinc-900 flex items-center gap-2" id="my-tickets-title">
            <ClipboardList className="w-5 h-5 text-amber-500" /> Daftar Tiket Anda ({bookings.length})
          </h2>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Berikut tiket konser yang aktif dipesan oleh akun Guest Anda.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-bold text-zinc-500 hover:text-zinc-950 px-3 py-1.5 bg-zinc-100 rounded-lg cursor-pointer transition-colors"
          id="btn-close-tickets"
        >
          Tutup Panel
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 px-4 space-y-4" id="empty-tickets-state">
          <div className="inline-flex p-4 bg-zinc-50 rounded-2xl text-zinc-400 border border-zinc-200">
            <ClipboardList className="w-8 h-8" />
          </div>
          <div className="max-w-xs mx-auto">
            <h3 className="text-sm font-bold text-zinc-800">Belum Ada Tiket yang Dipesan</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Silakan jelajahi daftar konser di halaman utama kami dan buat pesanan tiket pertama Anda!
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-950 text-white font-semibold rounded-lg text-xs hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
            id="empty-tickets-cta"
          >
            Mulai Belanja Tiket
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="tickets-grid">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="relative bg-zinc-50 border border-zinc-200 rounded-2xl p-5 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              id={`ticket-item-${booking.id}`}
            >
              {/* Perforation design circles in card stubs */}
              <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-r border-zinc-200"></div>
              <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-l border-zinc-200"></div>

              {/* Tag Line */}
              <div className="flex justify-between items-start mb-3">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-mono text-[9px] font-bold rounded">
                  {booking.tierName}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider font-bold">
                  {booking.bookingCode}
                </span>
              </div>

              {/* Main concert descriptors */}
              <div className="mb-4">
                <h4 className="font-sans font-extrabold text-md text-zinc-900 leading-tight">
                  {booking.concertTitle}
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium mt-0.5">{booking.concertArtist}</p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-zinc-200/60 font-sans text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="truncate">{formatIndoDate(booking.concertDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="truncate">{booking.concertVenue}</span>
                  </div>
                </div>
              </div>

              {/* Footer pricing, QR code activator and Cancellations */}
              <div className="pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-zinc-400 uppercase font-mono">Total Transaksi</p>
                  <p className="text-xs font-bold font-mono text-zinc-800">
                    {formatRupiah(booking.totalPrice)} ({booking.quantity} Tiket)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* QR view handle */}
                  <button
                    onClick={() => setSelectedQR(booking)}
                    className="p-2 bg-white hover:bg-zinc-150 border border-zinc-200 text-zinc-700 rounded-lg cursor-pointer transition-colors"
                    title="Lihat QR Code Tiket"
                    id={`btn-qr-${booking.id}`}
                  >
                    <QrCode className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onCancelBooking(booking.id)}
                    className="p-2 bg-zinc-100 hover:bg-red-50 hover:text-red-600 border border-zinc-200 text-zinc-500 rounded-lg cursor-pointer transition-colors"
                    title="Batalkan Pesanan (Refund)"
                    id={`btn-delete-${booking.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Full detail Modal Popup */}
      {selectedQR && (
        <div className="fixed inset-0 z-55 overflow-y-auto flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm" id="ticket-qr-overlay">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedQR(null)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-800 bg-zinc-50 hover:bg-zinc-100 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 bg-zinc-950 text-white border border-zinc-800 rounded font-mono text-[9px] font-bold">
                E-TICKET ENTRY GATE
              </span>
              <h3 className="font-sans font-bold text-zinc-805 mt-2 mb-0.5 truncate">{selectedQR.concertTitle}</h3>
              <p className="text-zinc-450 text-[11px] font-mono">Tier: {selectedQR.tierName} • {selectedQR.quantity} Tiket</p>
            </div>

            {/* Simulated detailed QR code block with custom aesthetic layout */}
            <div className="mx-auto w-48 h-48 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center p-4 relative">
              <div className="absolute inset-2 border-2 border-dashed border-zinc-300 rounded-xl pointer-events-none"></div>
              {/* Complex SVG layout for QR simulation */}
              <svg className="w-36 h-36 text-zinc-950 fill-zinc-950 stroke-none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="20" height="20" />
                <rect x="0" y="4" width="16" height="12" fill="white" />
                <rect x="4" y="8" width="8" height="4" />
                
                <rect x="80" y="0" width="20" height="20" />
                <rect x="84" y="4" width="12" height="12" fill="white" />
                <rect x="88" y="8" width="4" height="4" />

                <rect x="0" y="80" width="20" height="20" />
                <rect x="4" y="84" width="12" height="12" fill="white" />
                <rect x="8" y="88" width="4" height="4" />

                {/* Random code points */}
                <rect x="30" y="10" width="4" height="8" />
                <rect x="40" y="0" width="12" height="4" />
                <rect x="60" y="10" width="8" height="6" />
                <rect x="35" y="30" width="15" height="15" />
                <rect x="40" y="35" width="5" height="5" fill="white" />
                <rect x="65" y="40" width="12" height="8" />
                <rect x="15" y="45" width="8" height="12" />
                <rect x="50" y="60" width="16" height="4" />
                <rect x="30" y="70" width="12" height="12" />
                <rect x="75" y="75" width="20" height="10" />
                <rect x="80" y="30" width="10" height="15" />
                <rect x="85" y="35" width="4" height="5" fill="white" />
              </svg>
            </div>

            <div className="space-y-1.5 p-3.5 bg-zinc-50 rounded-xl text-left border border-zinc-150">
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Nama Pemegang:</span>
                <span className="font-bold text-zinc-800">{selectedQR.buyerName}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Kode Tiket:</span>
                <span className="font-mono font-bold text-amber-600">{selectedQR.bookingCode}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Metode Pembayaran:</span>
                <span className="font-bold text-zinc-800">{selectedQR.paymentMethod}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 justify-center py-1.5 px-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Tiket Aktif & Terverifikasi Promotor</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
