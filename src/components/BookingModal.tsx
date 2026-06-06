import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, Clock, Ticket, ShieldAlert, CheckCircle, 
  ChevronRight, Award, Plus, Minus, CreditCard, Check, ArrowLeft, ArrowUpRight
} from 'lucide-react';
import { Concert, TicketTier, BookingDetails } from '../types';
import { formatIndoDate, formatRupiah } from './ConcertCard';

interface BookingModalProps {
  concert: Concert;
  onClose: () => void;
  onConfirmBooking: (booking: BookingDetails) => void;
}

export default function BookingModal({ concert, onClose, onConfirmBooking }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(
    concert.tiers.find(t => t.capacity - t.sold > 0) || null
  );
  const [quantity, setQuantity] = useState<number>(1);
  
  // Buyer Info state
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Created Booking state for success screen
  const [createdBooking, setCreatedBooking] = useState<BookingDetails | null>(null);

  const handleSelectTier = (tier: TicketTier) => {
    if (tier.capacity - tier.sold <= 0) return; // Out of stock
    setSelectedTier(tier);
    setQuantity(1);
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleIncreaseQty = () => {
    if (!selectedTier) return;
    const remainingStock = selectedTier.capacity - selectedTier.sold;
    const maxPurchase = Math.min(5, remainingStock);
    if (quantity < maxPurchase) setQuantity(prev => prev + 1);
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!buyerName.trim()) newErrors.buyerName = 'Nama lengkap wajib diisi.';
    if (!buyerEmail.trim()) {
      newErrors.buyerEmail = 'Email wajib diisi.';
    } else if (!/\S+@\S+\.\S+/.test(buyerEmail)) {
      newErrors.buyerEmail = 'Format email tidak valid.';
    }
    if (!buyerPhone.trim()) {
      newErrors.buyerPhone = 'Nomor Telepon wajib diisi.';
    } else if (buyerPhone.length < 9) {
      newErrors.buyerPhone = 'Nomor Telepon tidak valid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => {
    if (!selectedTier) return;
    setStep(2);
  };

  const handleCheckout = () => {
    if (!validateStep2() || !selectedTier) return;

    // Generate simulated order
    const bookingCode = `FST-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const totalPrice = selectedTier.price * quantity;
    const bookedAt = new Date().toISOString();

    const bookingPayload: BookingDetails = {
      id: `bk-${Date.now()}`,
      concertId: concert.id,
      concertTitle: concert.title,
      concertArtist: concert.artist,
      concertDate: concert.date,
      concertVenue: concert.venue,
      tierId: selectedTier.id,
      tierName: selectedTier.name,
      pricePerTicket: selectedTier.price,
      quantity,
      totalPrice,
      buyerName,
      buyerEmail,
      buyerPhone,
      paymentMethod,
      bookingCode,
      bookedAt
    };

    setCreatedBooking(bookingPayload);
    // Notify main app to persist booking
    onConfirmBooking(bookingPayload);
    // Transition to success screen
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm" id="booking-modal-backdrop">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]" id="booking-modal-panel">
        
        {/* Close Button top corner */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-500 hover:text-zinc-900 bg-white/90 border border-zinc-200 hover:bg-zinc-50 rounded-full shadow-sm cursor-pointer"
          id="close-booking-modal"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Side: Concert Highlight / Info summary */}
        <div className="w-full md:w-5/12 bg-zinc-950 text-white p-6 relative flex flex-col justify-between overflow-y-auto border-b md:border-b-0 md:border-r border-zinc-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <span className="px-2.5 py-1 bg-amber-400 text-zinc-950 text-[10px] font-bold uppercase rounded-lg">
              {concert.genre}
            </span>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white mb-2 leading-snug">
                {concert.title}
              </h2>
              <p className="text-zinc-400 text-xs font-semibold">{concert.artist}</p>
            </div>

            <div className="space-y-3.5 border-t border-b border-zinc-900 py-4 font-sans text-xs">
              <div className="flex items-center gap-3">
                <Calendar className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-zinc-400 font-medium">Tanggal Konser</p>
                  <p className="text-white font-bold">{formatIndoDate(concert.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-zinc-400 font-medium">Waktu Pembukaan Gate</p>
                  <p className="text-white font-bold">{concert.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4.5 h-4.5 text-red-400 shrink-0" />
                <div>
                  <p className="text-zinc-400 font-medium">Lokasi Venue</p>
                  <p className="text-white font-bold">{concert.venue}, {concert.city}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-zinc-900">
            <div className="flex gap-2.5 p-3 rounded-xl bg-zinc-900/50 border border-zinc-850 text-xs">
              <ShieldAlert className="w-4.5 h-4.5 text-amber-400 shrink-0" />
              <p className="text-zinc-400 leading-relaxed font-sans">
                E-Tiket resmi klian akan dikirim instan setelah pembayaran terkonfirmasi. Harap masukkan email aktif Anda untuk mempermudah backup cetak tiket.
              </p>
            </div>
            <p className="text-[10px] text-zinc-600 mt-4 text-center font-mono uppercase tracking-widest">
              Secured by FestPass Engine
            </p>
          </div>
        </div>

        {/* Right Side: Multi-step checkout layout */}
        <div className="flex-1 bg-white p-6 sm:p-8 flex flex-col justify-between overflow-y-auto min-h-[400px] md:min-h-0">
          
          {/* STEP Progress Bar */}
          {step < 3 && (
            <div className="flex items-center gap-2 mb-6" id="checkout-progress">
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${step === 1 ? 'bg-zinc-950 text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>
                {step === 1 ? '1' : <Check className="w-3 h-3" />}
              </span>
              <span className="text-xs font-bold text-zinc-800 font-sans">Tiket & Sesi</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${step === 2 ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                2
              </span>
              <span className={`text-xs font-bold font-sans ${step === 2 ? 'text-zinc-800' : 'text-zinc-400'}`}>Pembeli & Pembayaran</span>
            </div>
          )}

          {/* STEP 1: SELECT TICKET TIER */}
          {step === 1 && (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-sans font-extrabold text-lg text-zinc-900 mb-1">
                  Pilih Kategori Tiket
                </h3>
                <p className="text-zinc-400 text-xs font-sans mb-4">
                  Harga tiket belum termasuk pajak hiburan daerah sebesar 5%.
                </p>

                {/* Tier Choices lists */}
                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                  {concert.tiers.map((tier) => {
                    const remaining = tier.capacity - tier.sold;
                    const isSoldOut = remaining <= 0;
                    const isSelected = selectedTier?.id === tier.id;

                    return (
                      <button
                        key={tier.id}
                        disabled={isSoldOut}
                        onClick={() => handleSelectTier(tier)}
                        className={`w-full text-left p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-zinc-950 bg-zinc-50'
                            : isSoldOut
                            ? 'border-zinc-200 opacity-60 bg-zinc-50 cursor-not-allowed'
                            : 'border-zinc-200 bg-white hover:border-zinc-400'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Ticket className={`w-4 h-4 ${isSelected ? 'text-amber-500' : 'text-zinc-400'}`} />
                            <span className="font-sans font-bold text-sm text-zinc-900">{tier.name}</span>
                          </div>
                          
                          {/* Benefits pills list */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {tier.benefits.map((b, i) => (
                              <span key={i} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 text-[10px] rounded flex items-center gap-1 font-sans">
                                <Award className="w-2.5 h-2.5 text-zinc-400" /> {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <p className={`font-mono font-extrabold text-sm ${isSelected ? 'text-zinc-950' : 'text-zinc-700'}`}>
                            {formatRupiah(tier.price)}
                          </p>
                          <p className="text-[10px] text-zinc-400 font-sans mt-0.5">
                            {isSoldOut ? 'Stok Habis' : `Tersedia ${remaining} Seat`}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quantity Control Panel */}
                {selectedTier && (
                  <div className="mt-5 p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-zinc-800">Jumlah Pembelian</p>
                      <p className="text-[10px] text-zinc-400">Maksimal 5 tiket per transaksi akun.</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDecreaseQty}
                        disabled={quantity <= 1}
                        className="w-8 h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-700 hover:bg-zinc-150 disabled:opacity-50 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-bold text-lg text-zinc-905 w-6 text-center">{quantity}</span>
                      <button
                        onClick={handleIncreaseQty}
                        disabled={!selectedTier || quantity >= Math.min(5, selectedTier.capacity - selectedTier.sold)}
                        className="w-8 h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-700 hover:bg-zinc-150 disabled:opacity-50 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 1 checkout actions bar */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 font-mono uppercase">Total Estimasi</p>
                  <p className="text-lg font-black text-zinc-950 font-mono">
                    {selectedTier ? formatRupiah(selectedTier.price * quantity) : 'Rp 0'}
                  </p>
                </div>

                <button
                  disabled={!selectedTier}
                  onClick={handleProceedToPayment}
                  className="px-5 py-3 bg-zinc-950 hover:bg-amber-500 hover:text-zinc-950 text-white font-bold rounded-xl text-center text-xs sm:text-sm cursor-pointer transition-all duration-200"
                  id="btn-proceed-checkout"
                >
                  Lanjut ke Checkout
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BUYER DETAILS & PAYMENT GATEWAY */}
          {step === 2 && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="space-y-5">
                <div>
                  <button 
                    onClick={() => setStep(1)} 
                    className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 mb-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" /> Kembali ke Kategori
                  </button>
                  <h3 className="font-sans font-extrabold text-lg text-zinc-900">
                    Informasi Pembeli & Pembayaran
                  </h3>
                  <p className="text-zinc-450 text-xs">
                    Isi detail penerima E-Tiket di bawah ini secara tepat.
                  </p>
                </div>

                {/* Buyer identity fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Nama Lengkap</label>
                    <input 
                      type="text"
                      placeholder="Masukkan nama sesuai KTP / ID Card"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className={`w-full px-3 py-2 bg-zinc-50 border rounded-xl text-xs sm:text-sm outline-none transition-all ${errors.buyerName ? 'border-red-400 focus:border-red-505' : 'border-zinc-200 focus:border-zinc-950 focus:bg-white'}`}
                    />
                    {errors.buyerName && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.buyerName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Alamat Email</label>
                    <input 
                      type="email"
                      placeholder="contoh@domain.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      className={`w-full px-3 py-2 bg-zinc-50 border rounded-xl text-xs sm:text-sm outline-none transition-all ${errors.buyerEmail ? 'border-red-400 focus:border-red-505' : 'border-zinc-200 focus:border-zinc-950 focus:bg-white'}`}
                    />
                    {errors.buyerEmail && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.buyerEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1.5">Nomor Telepon (WhatsApp)</label>
                    <input 
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className={`w-full px-3 py-2 bg-zinc-50 border rounded-xl text-xs sm:text-sm outline-none transition-all ${errors.buyerPhone ? 'border-red-400 focus:border-red-505' : 'border-zinc-200 focus:border-zinc-950 focus:bg-white'}`}
                    />
                    {errors.buyerPhone && <p className="text-[10px] text-red-500 mt-1 font-sans">{errors.buyerPhone}</p>}
                  </div>
                </div>

                {/* Dummy Payment Selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-2">Metode Pembayaran</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'QRIS', label: 'QRIS (Gopay/OVO)', icon: '📱' },
                      { id: 'BCA', label: 'BCA Transfer', icon: '🏦' },
                      { id: 'MANDIRI', label: 'Mandiri VA', icon: '💳' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                          paymentMethod === m.id
                            ? 'border-zinc-950 bg-zinc-50 text-zinc-950 font-bold'
                            : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400'
                        }`}
                      >
                        <span className="text-lg mb-1">{m.icon}</span>
                        <span className="text-[10px] text-center leading-none">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 summary & actions bar */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-zinc-400 font-mono">Pesanan:</p>
                  <p className="text-xs font-bold text-zinc-800">
                    {selectedTier?.name} x {quantity} Tiket
                  </p>
                  <p className="text-md font-extrabold text-zinc-955 font-mono">
                    {selectedTier ? formatRupiah(selectedTier.price * quantity) : ''}
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs sm:text-sm cursor-pointer transition-all duration-200 flex items-center gap-2 shadow-sm"
                  id="btn-complete-booking"
                >
                  Bayar & Selesai <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BOOKING SUCCESS RECEIPT RECEIPT VIEW */}
          {step === 3 && createdBooking && (
            <div className="flex-1 flex flex-col justify-between items-center text-center py-4" id="success-receipt-step">
              <div className="space-y-4 max-w-md w-full">
                {/* Success Icon */}
                <div className="flex justify-center mb-1">
                  <span className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl inline-flex animate-bounce text-emerald-600">
                    <CheckCircle className="w-8 h-8" />
                  </span>
                </div>

                <div>
                  <h3 className="font-sans font-extrabold text-xl text-zinc-900 mb-1">
                    Booking Tiket Berhasil!
                  </h3>
                  <p className="text-zinc-500 text-xs font-sans">
                    Pembayaran sukses dilakukan menggunakan {createdBooking.paymentMethod}. E-tiket Anda telah terdaftar dan dicadangkan.
                  </p>
                </div>

                {/* Simulated E-Ticket Receipt */}
                <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl p-4 text-left space-y-4 relative overflow-hidden font-sans">
                  {/* Visual perforation circles */}
                  <div className="absolute top-1/2 -left-2.5 w-5 h-5 rounded-full bg-white border-r border-zinc-200 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-2.5 w-5 h-5 rounded-full bg-white border-l border-zinc-200 -translate-y-1/2"></div>
                  
                  {/* Header */}
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-200/60">
                    <div>
                      <p className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase mb-0.5">KODE BOOKING</p>
                      <p className="text-sm font-extrabold text-zinc-900 font-mono">{createdBooking.bookingCode}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-zinc-950 text-white font-mono text-[9px] font-bold rounded">
                      FESTPASS OFFICIAL
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="grid grid-cols-2 gap-3 text-xs leading-relaxed">
                    <div>
                      <p className="text-zinc-405 font-medium text-[10px]">Konser</p>
                      <p className="text-zinc-800 font-bold truncate">{createdBooking.concertTitle}</p>
                    </div>
                    <div>
                      <p className="text-zinc-405 font-medium text-[10px]">Kategori</p>
                      <p className="text-zinc-800 font-bold">{createdBooking.tierName}</p>
                    </div>
                    <div>
                      <p className="text-zinc-405 font-medium text-[10px]">Tanggal & Waktu</p>
                      <p className="text-zinc-800 font-bold font-mono">{createdBooking.concertDate}</p>
                    </div>
                    <div>
                      <p className="text-zinc-405 font-medium text-[10px]">Jumlah</p>
                      <p className="text-zinc-800 font-bold font-mono">{createdBooking.quantity} Tiket</p>
                    </div>
                  </div>

                  {/* Barcode/QR Code Visualization */}
                  <div className="pt-3 border-t border-zinc-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-400 font-mono mb-0.5">NAMA PEMBELI</p>
                      <p className="text-xs font-bold text-zinc-850 truncate max-w-[150px]">{createdBooking.buyerName}</p>
                    </div>

                    {/* Simple Barcode Simulation using styled divs for incredible aesthetic */}
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="flex items-center gap-[1.5px] bg-white p-2 border border-zinc-200 rounded">
                        <div className="w-1.5 h-6 bg-zinc-950"></div>
                        <div className="w-[1px] h-6 bg-zinc-950"></div>
                        <div className="w-[2px] h-6 bg-zinc-300"></div>
                        <div className="w-1 h-6 bg-zinc-950"></div>
                        <div className="w-[1px] h-6 bg-zinc-950"></div>
                        <div className="w-[2.5px] h-6 bg-zinc-950"></div>
                        <div className="w-[1px] h-6 bg-zinc-300"></div>
                        <div className="w-[1.5px] h-6 bg-zinc-950"></div>
                        <div className="w-[1px] h-6 bg-zinc-950"></div>
                        <div className="w-[2px] h-6 bg-zinc-950"></div>
                      </div>
                      <p className="text-[8px] text-zinc-400 font-mono">{createdBooking.bookingCode}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5 w-full max-w-sm">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold rounded-xl text-center cursor-pointer transition-all"
                >
                  Kembali Membaca
                </button>
                <button
                  onClick={() => {
                    // Quick modal closure but opening user tickets
                    onClose();
                  }}
                  className="flex-1 py-2.5 bg-zinc-950 hover:bg-amber-500 hover:text-zinc-950 text-white text-xs font-bold rounded-xl text-center cursor-pointer transition-all"
                >
                  Buka Tiket Saya
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
