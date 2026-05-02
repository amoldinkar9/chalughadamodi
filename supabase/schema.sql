-- chalughadamodi CMS schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Announcements (जाहिरात बॅनर्स — 32:9 image banners with backlinks)
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  backlink TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery (भरती जाहिराती)
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  start_date DATE,
  last_date DATE,
  link TEXT DEFAULT '',
  is_new BOOLEAN DEFAULT false,
  date_extended BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Magazines (मासिके)
CREATE TABLE IF NOT EXISTS magazines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  pdf_url TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tests (टेस्ट)
CREATE TABLE IF NOT EXISTS tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  questions TEXT NOT NULL,
  duration TEXT NOT NULL,
  href TEXT DEFAULT 'https://www.tcs9.in/mr/test-series',
  image_url TEXT DEFAULT '',
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  exam TEXT NOT NULL,
  quote TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings (key-value store for hero image, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE magazines ENABLE ROW LEVEL SECURITY;
ALTER TABLE tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access (anon can read published rows)
CREATE POLICY "Public can read published announcements" ON announcements FOR SELECT USING (published = true);
CREATE POLICY "Public can read published gallery" ON gallery FOR SELECT USING (published = true);
CREATE POLICY "Public can read published magazines" ON magazines FOR SELECT USING (published = true);
CREATE POLICY "Public can read published tests" ON tests FOR SELECT USING (published = true);
CREATE POLICY "Public can read published testimonials" ON testimonials FOR SELECT USING (published = true);
CREATE POLICY "Public can read published faqs" ON faqs FOR SELECT USING (published = true);
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);

-- Service role (used by admin API) bypasses RLS, so no admin policies needed

-- Seed data: Site Settings
INSERT INTO site_settings (key, value) VALUES ('hero_image_url', '') ON CONFLICT (key) DO NOTHING;

-- Seed data: Announcements
INSERT INTO announcements (title, image_url, backlink, display_order) VALUES
  ('MPSC राज्यसेवा 2026 अधिसूचना', 'https://placehold.co/1280x360/0A2540/D4A24C?text=MPSC+राज्यसेवा+2026', 'https://www.tcs9.in/mr/test-series', 1),
  ('तलाठी भरती अपडेट', 'https://placehold.co/1280x360/163A5F/FAF7F2?text=तलाठी+भरती+अपडेट', 'https://www.tcs9.in/mr/test-series', 2),
  ('मोफत मासिक PDF डाउनलोड करा', 'https://placehold.co/1280x360/D4A24C/0A2540?text=मोफत+मासिक+PDF', '#magazine', 3);

-- Seed data: Gallery
INSERT INTO gallery (name, start_date, last_date, link, is_new, date_extended, display_order) VALUES
  ('महाराष्ट्र पोलीस भरती 2026', '2026-04-01', '2026-05-15', '#', true, false, 1),
  ('तलाठी भरती 2026', '2026-04-10', '2026-05-20', '#', true, false, 2),
  ('रेल्वे RRB Group D', '2026-04-15', '2026-06-01', '#', false, false, 3),
  ('SSC GD भरती', '2026-05-01', '2026-06-10', '#', false, true, 4),
  ('वनरक्षक भरती', '2026-05-05', '2026-06-25', '#', false, false, 5),
  ('सरळसेवा भरती', '2026-05-10', '2026-06-30', '#', false, false, 6);

-- Seed data: Magazines
INSERT INTO magazines (month, display_order) VALUES
  ('एप्रिल 2026', 1),
  ('मार्च 2026', 2),
  ('फेब्रुवारी 2026', 3),
  ('जानेवारी 2026', 4),
  ('डिसेंबर 2025', 5),
  ('नोव्हेंबर 2025', 6);

-- Seed data: Tests
INSERT INTO tests (title, questions, duration, href, display_order) VALUES
  ('आजची टेस्ट', '10', '5 मिनिट', 'https://www.tcs9.in/mr/test-series', 1),
  ('या आठवड्याची टेस्ट', '30', '15 मिनिट', 'https://www.tcs9.in/mr/test-series', 2),
  ('मागील महिना टेस्ट', '50', '30 मिनिट', 'https://www.tcs9.in/mr/test-series', 3);

-- Seed data: Testimonials
INSERT INTO testimonials (name, initials, exam, quote, display_order) VALUES
  ('प्रिया देशमुख', 'प्रि', 'तलाठी, 2025', 'Static GS शी प्रत्येक बातमीची जोडणी मला खूप आवडली. Revision सोपी झाली.', 1),
  ('संदीप पाटील', 'सं', 'महाराष्ट्र पोलीस, 2025', 'मराठीत स्पष्टीकरण असल्यामुळे current affairs कधीच कठीण वाटले नाहीत.', 2),
  ('रोहित जाधव', 'रो', 'रेल्वे RRB, 2025', 'मोफत मासिक PDF मुळे मला coaching ची गरज पडली नाही. प्रामाणिक platform.', 3);

-- Seed data: FAQs
INSERT INTO faqs (question, answer, display_order) VALUES
  ('हे website मोफत आहे का?', 'होय, संपूर्णपणे मोफत. कुठलेही शुल्क नाही, login नाही.', 1),
  ('मासिक PDF download करता येते का?', 'होय. प्रत्येक मासिकाच्या पानावर PDF download बटण आहे.', 2),
  ('टेस्ट किती कठीण आहे?', 'MPSC, तलाठी, पोलीस भरती च्या प्रत्यक्ष परीक्षेसारखीच पातळी. सरावासाठी योग्य.', 3),
  ('MPSC आणि तलाठी दोन्हीसाठी useful आहे का?', 'होय. आम्ही प्रत्येक चालू घडामोडी सर्व प्रमुख परीक्षांच्या syllabus नुसार tag करतो.', 4),
  ('Content रोज update होते का?', 'होय. आठवड्यातील 6 दिवस ताज्या चालू घडामोडी. मासिक एकदा PDF स्वरूपात.', 5),
  ('मराठीतच सर्व content आहे का?', 'होय. 100% मराठी. कठीण इंग्रजी संज्ञा असल्यास त्यांचा मराठीत अर्थ देखील दिला जातो.', 6),
  ('अजून प्रश्न असतील तर?', 'खाली WhatsApp बटणावर click करा. आम्हाला थेट संपर्क करा.', 7);
