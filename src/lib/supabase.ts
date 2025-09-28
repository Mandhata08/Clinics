import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Offer {
  id: string;
  title: string;
  discount: string;
  original_price: number;
  sale_price: number;
  service: string;
  description: string;
  valid_until: string;
  terms: string[];
  popular: boolean;
  color: string;
  image_url?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  patient_name: string;
  patient_email: string;
  patient_phone: string;
  service: string;
  doctor: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  education: string[];
  certifications: string[];
  achievements: string[];
  bio: string;
  languages: string[];
  image_url?: string;
  active: boolean;
  created_at: string;
}