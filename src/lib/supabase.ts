import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  created_at: string;
  updated_at: string;
}

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
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
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

// Auth helper functions
export const signUp = async (email: string, password: string, name: string, role: string = 'customer') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return profile;
};