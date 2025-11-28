export interface ReservationInput {
  serviceProviderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  peopleCount: number;
  reservationAt: string;
}

export interface Reservation {
  id: string;
  serviceProviderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  peopleCount: number;
  reservationAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface CreateReservationResponse {
  createServiceProviderReservation: Reservation;
}

export interface CreateReservationVariables {
  input: ReservationInput;
}
