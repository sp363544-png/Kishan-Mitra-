export interface Center {
  id: string;
  name: string;
  district: string;
  distance: string;
  capacity: number;
  currentLoad: number;
  status: 'green' | 'yellow' | 'red';
  lat: number;
  lng: number;
}

export interface Booking {
  id: string;
  farmerName: string;
  crop: string;
  quantity: number;
  centerId: string;
  date: string;
  time: string;
  status: 'Registered' | 'Weighed' | 'Quality Checked' | 'Payment Initiated' | 'Paid';
  token: string;
  queuePosition: number;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  photoURL?: string;
}

export type Role = 'farmer' | 'supervisor' | 'gov' | null;
