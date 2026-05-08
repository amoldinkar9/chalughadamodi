-- chalughadamodi CMS schema for Cloudflare D1 (SQLite)

CREATE TABLE IF NOT EXISTS announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  backlink TEXT DEFAULT '',
  published INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  start_date TEXT,
  last_date TEXT,
  link TEXT DEFAULT '',
  is_new INTEGER DEFAULT 0,
  date_extended INTEGER DEFAULT 0,
  published INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS magazines (
  id TEXT PRIMARY KEY,
  month TEXT NOT NULL,
  image_url TEXT DEFAULT '',
  pdf_url TEXT DEFAULT '',
  published INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tests (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  questions TEXT NOT NULL,
  duration TEXT NOT NULL,
  href TEXT DEFAULT 'https://www.tcs9.in/mr/test-series',
  image_url TEXT DEFAULT '',
  published INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  exam TEXT NOT NULL,
  quote TEXT NOT NULL,
  published INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  published INTEGER DEFAULT 1,
  display_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Seed: site_settings
INSERT OR IGNORE INTO site_settings (key, value) VALUES ('hero_image_url', '');

-- Seed: announcements
INSERT INTO announcements (id, title, image_url, backlink, display_order) VALUES
  ('a1', 'MPSC राज्यसेवा 2026 अधिसूचना', 'https://placehold.co/1280x360/0A2540/D4A24C?text=MPSC+राज्यसेवा+2026', 'https://www.tcs9.in/mr/test-series', 1),
  ('a2', 'तलाठी भरती अपडेट', 'https://placehold.co/1280x360/163A5F/FAF7F2?text=तलाठी+भरती+अपडेट', 'https://www.tcs9.in/mr/test-series', 2),
  ('a3', 'मोफत मासिक PDF डाउनलोड करा', 'https://placehold.co/1280x360/D4A24C/0A2540?text=मोफत+मासिक+PDF', '#magazine', 3);

-- Seed: gallery
INSERT INTO gallery (id, name, start_date, last_date, link, is_new, date_extended, display_order) VALUES
  ('g1', 'महाराष्ट्र पोलीस भरती 2026', '2026-04-01', '2026-05-15', '#', 1, 0, 1),
  ('g2', 'तलाठी भरती 2026', '2026-04-10', '2026-05-20', '#', 1, 0, 2),
  ('g3', 'रेल्वे RRB Group D', '2026-04-15', '2026-06-01', '#', 0, 0, 3),
  ('g4', 'SSC GD भरती', '2026-05-01', '2026-06-10', '#', 0, 1, 4),
  ('g5', 'वनरक्षक भरती', '2026-05-05', '2026-06-25', '#', 0, 0, 5),
  ('g6', 'सरळसेवा भरती', '2026-05-10', '2026-06-30', '#', 0, 0, 6);

-- Seed: magazines
INSERT INTO magazines (id, month, display_order) VALUES
  ('m1', 'एप्रिल 2026', 1),
  ('m2', 'मार्च 2026', 2),
  ('m3', 'फेब्रुवारी 2026', 3),
  ('m4', 'जानेवारी 2026', 4),
  ('m5', 'डिसेंबर 2025', 5),
  ('m6', 'नोव्हेंबर 2025', 6);

-- Seed: tests
INSERT INTO tests (id, title, questions, duration, href, display_order) VALUES
  ('t1', 'आजची टेस्ट', '10', '5 मिनिट', 'https://www.tcs9.in/mr/test-series', 1),
  ('t2', 'या आठवड्याची टेस्ट', '30', '15 मिनिट', 'https://www.tcs9.in/mr/test-series', 2),
  ('t3', 'मागील महिना टेस्ट', '50', '30 मिनिट', 'https://www.tcs9.in/mr/test-series', 3);

-- Seed: testimonials
INSERT INTO testimonials (id, name, initials, exam, quote, display_order) VALUES
  ('te1', 'प्रिया देशमुख', 'प्रि', 'तलाठी, 2025', 'Static GS शी प्रत्येक बातमीची जोडणी मला खूप आवडली. Revision सोपी झाली.', 1),
  ('te2', 'संदीप पाटील', 'सं', 'महाराष्ट्र पोलीस, 2025', 'मराठीत स्पष्टीकरण असल्यामुळे current affairs कधीच कठीण वाटले नाहीत.', 2),
  ('te3', 'रोहित जाधव', 'रो', 'रेल्वे RRB, 2025', 'मोफत मासिक PDF मुळे मला coaching ची गरज पडली नाही. प्रामाणिक platform.', 3);

-- Seed: faqs
INSERT INTO faqs (id, question, answer, display_order) VALUES
  ('f1', 'हे website मोफत आहे का?', 'होय, संपूर्णपणे मोफत. कुठलेही शुल्क नाही, login नाही.', 1),
  ('f2', 'मासिक PDF download करता येते का?', 'होय. प्रत्येक मासिकाच्या पानावर PDF download बटण आहे.', 2),
  ('f3', 'टेस्ट किती कठीण आहे?', 'MPSC, तलाठी, पोलीस भरती च्या प्रत्यक्ष परीक्षेसारखीच पातळी. सरावासाठी योग्य.', 3),
  ('f4', 'MPSC आणि तलाठी दोन्हीसाठी useful आहे का?', 'होय. आम्ही प्रत्येक चालू घडामोडी सर्व प्रमुख परीक्षांच्या syllabus नुसार tag करतो.', 4),
  ('f5', 'Content रोज update होते का?', 'होय. आठवड्यातील 6 दिवस ताज्या चालू घडामोडी. मासिक एकदा PDF स्वरूपात.', 5),
  ('f6', 'मराठीतच सर्व content आहे का?', 'होय. 100% मराठी. कठीण इंग्रजी संज्ञा असल्यास त्यांचा मराठीत अर्थ देखील दिला जातो.', 6),
  ('f7', 'अजून प्रश्न असतील तर?', 'खाली WhatsApp बटणावर click करा. आम्हाला थेट संपर्क करा.', 7);
