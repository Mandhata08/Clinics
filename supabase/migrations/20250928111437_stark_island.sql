/*
  # Luminance Clinic Database Schema

  1. New Tables
    - `offers`
      - `id` (uuid, primary key)
      - `title` (text)
      - `discount` (text)
      - `original_price` (decimal)
      - `sale_price` (decimal)
      - `service` (text)
      - `description` (text)
      - `valid_until` (date)
      - `terms` (text array)
      - `popular` (boolean)
      - `color` (text)
      - `image_url` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `appointments`
      - `id` (uuid, primary key)
      - `patient_name` (text)
      - `patient_email` (text)
      - `patient_phone` (text)
      - `service` (text)
      - `doctor` (text)
      - `preferred_date` (date)
      - `preferred_time` (text)
      - `message` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `doctors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `title` (text)
      - `specialties` (text array)
      - `experience` (text)
      - `education` (text array)
      - `certifications` (text array)
      - `achievements` (text array)
      - `bio` (text)
      - `languages` (text array)
      - `image_url` (text)
      - `active` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admin access
*/

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  discount text NOT NULL,
  original_price decimal(10,2) DEFAULT 0,
  sale_price decimal(10,2) DEFAULT 0,
  service text NOT NULL,
  description text NOT NULL,
  valid_until date NOT NULL,
  terms text[] DEFAULT '{}',
  popular boolean DEFAULT false,
  color text DEFAULT 'blue',
  image_url text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name text NOT NULL,
  patient_email text NOT NULL,
  patient_phone text NOT NULL,
  service text NOT NULL,
  doctor text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  specialties text[] DEFAULT '{}',
  experience text NOT NULL,
  education text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  bio text NOT NULL,
  languages text[] DEFAULT '{}',
  image_url text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Offers policies
CREATE POLICY "Anyone can view active offers"
  ON offers
  FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can manage offers"
  ON offers
  FOR ALL
  TO authenticated
  USING (true);

-- Appointments policies
CREATE POLICY "Users can create appointments"
  ON appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (true);

-- Doctors policies
CREATE POLICY "Anyone can view active doctors"
  ON doctors
  FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can manage doctors"
  ON doctors
  FOR ALL
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO offers (title, discount, original_price, sale_price, service, description, valid_until, terms, popular, color, image_url) VALUES
('New Patient Special', '50% OFF', 6000.00, 3000.00, 'First Laser Hair Removal Session', 'Perfect for first-time patients to experience our premium laser hair removal service.', '2024-12-31', ARRAY['Valid for new patients only', 'Cannot be combined with other offers', 'Consultation included', 'All body areas available'], true, 'blue', 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Summer Skin Package', '30% OFF', 16000.00, 11200.00, 'Complete Skin Rejuvenation Package', 'Get summer-ready skin with our comprehensive rejuvenation package including 3 sessions.', '2024-08-31', ARRAY['Includes 3 treatment sessions', 'Free aftercare products', 'Follow-up consultation included', 'Valid for face and neck'], false, 'purple', 'https://images.pexels.com/photos/5752296/pexels-photo-5752296.jpeg?auto=compress&cs=tinysrgb&w=600'),
('Royal Treatment Package', '40% OFF', 25000.00, 15000.00, 'Premium Full Body Rejuvenation', 'Our most luxurious treatment package with gold-infused therapies and personalized care.', '2024-10-31', ARRAY['Includes 5 premium sessions', 'Gold-infused treatments', 'Personal treatment coordinator', 'Complimentary aftercare kit'], true, 'gold', 'https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=600');

INSERT INTO doctors (name, title, specialties, experience, education, certifications, achievements, bio, languages, image_url) VALUES
('Dr. Sarah Chen', 'Lead Dermatologist & Medical Director', ARRAY['Laser Dermatology', 'Cosmetic Procedures', 'Skin Cancer Treatment'], '15+ years', ARRAY['MD - University of Toronto', 'Dermatology Residency - Toronto General Hospital', 'Fellowship in Laser Surgery - Harvard Medical School'], ARRAY['Board Certified Dermatologist', 'Fellow of the Royal College of Physicians', 'American Society for Laser Medicine & Surgery'], ARRAY['Top Dermatologist Award 2023', 'Published 50+ research papers', 'International speaker on laser treatments'], 'Dr. Sarah Chen is a renowned dermatologist with over 15 years of experience in advanced laser treatments. She has pioneered several innovative techniques in laser hair removal and skin rejuvenation.', ARRAY['English', 'Mandarin', 'French'], 'https://images.pexels.com/photos/5752296/pexels-photo-5752296.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Dr. Michael Rodriguez', 'Senior Dermatologist', ARRAY['Acne Treatment', 'Pigmentation Disorders', 'Anti-Aging'], '12+ years', ARRAY['MD - McMaster University', 'Dermatology Residency - Mount Sinai Hospital', 'Advanced Training in Cosmetic Dermatology'], ARRAY['Board Certified Dermatologist', 'Canadian Dermatology Association Member', 'International Society of Dermatology'], ARRAY['Excellence in Patient Care Award', 'Research Grant Recipient', 'Mentor of the Year 2022'], 'Dr. Rodriguez specializes in treating complex skin conditions and has extensive experience in laser therapy for acne and pigmentation disorders.', ARRAY['English', 'Spanish'], 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400');