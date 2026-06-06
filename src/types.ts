export interface TicketTier {
  id: string;
  name: string;
  price: number;
  capacity: number;
  sold: number;
  benefits: string[];
}

export type ConcertGenre = 'Pop' | 'Rock' | 'Indie' | 'Jazz' | 'EDM' | 'R&B' | 'K-Pop';

export interface Concert {
  id: string;
  title: string;
  artist: string;
  genre: ConcertGenre;
  date: string; // e.g., '2026-08-15'
  time: string; // e.g., '19:00'
  venue: string;
  city: string; // e.g., 'Jakarta', 'Bandung', 'Bali'
  imageUrl: string;
  description: string;
  isFeatured?: boolean;
  status: 'Available' | 'Selling Fast' | 'Sold Out' | 'Presale';
  tiers: TicketTier[];
}

export interface BookingDetails {
  id: string;
  concertId: string;
  concertTitle: string;
  concertArtist: string;
  concertDate: string;
  concertVenue: string;
  tierId: string;
  tierName: string;
  pricePerTicket: number;
  quantity: number;
  totalPrice: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  paymentMethod: string;
  bookingCode: string; // e.g., TKT-12345-XYZ
  bookedAt: string;
}
