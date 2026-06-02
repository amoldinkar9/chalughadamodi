-- Auto-generated: data import for D1
-- Exported at: 2026-05-08T06:34:58.735Z

-- Clear seed data before importing real data
DELETE FROM announcements;
DELETE FROM gallery;
DELETE FROM magazines;
DELETE FROM tests;
DELETE FROM testimonials;
DELETE FROM faqs;
DELETE FROM site_settings;

-- announcements (1 rows)
INSERT INTO announcements (id, title, image_url, backlink, published, display_order, created_at, updated_at) VALUES ('ef62dd55-8a5d-45de-a375-e2b1a146ca75', 'Trial', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/Untitled-1_1777539872870.jpg', 'https://www.tcs9.in/mr', 1, 1, '2026-04-30T09:48:51.639202+00:00', '2026-04-30T09:48:51.639202+00:00');

-- gallery (7 rows)
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('eabcc447-559c-4be8-b798-178cae2c98c0', 'तलाठी भरती 2026', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/Maharashtra-New-Governor_1777015388303.webp', '2026-04-01', '2026-05-05', 'https://www.tcs9.in/mr', 0, 0, 1, 1, '2026-04-29T13:21:30.763837+00:00', '2026-05-01T10:50:00.131+00:00');
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('9626b647-2689-40d2-8086-778ede3ee575', 'रेल्वे RRB Group D', '', NULL, NULL, '#', 0, 0, 1, 2, '2026-04-29T13:21:30.763837+00:00', '2026-05-01T10:26:20.488+00:00');
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('d0b26c9e-a13d-48e7-abe7-dc1144670fbe', 'SSC GD भरती', '', NULL, NULL, '#', 0, 0, 1, 3, '2026-04-29T13:21:30.763837+00:00', '2026-05-01T10:26:21.947+00:00');
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('2f569907-5df2-4036-a3ca-5d77cd0c145b', 'Amol Dinkar', '', '2026-03-03', '2026-05-14', 'https://www.tcs9.in/mr/current-affairs/current-affairs-marathi-or-chalu-ghadamodi-2026-or-project-hanuman-or-healing-and-nurturing-units-for-monitoring-aid-and-nursing-of-wildlife-or-andhra-pradesh-deputy-cm-pawan-kalyan', 1, 1, 1, 4, '2026-04-29T13:21:30.763837+00:00', '2026-05-01T10:26:21.938+00:00');
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('fb34913b-54da-48d9-a91d-28a2df287e7e', 'वनरक्षक भरती', '', NULL, NULL, '#', 0, 0, 1, 5, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('602ae9d9-b8e3-4713-8300-a932afcee292', 'सरळसेवा भरती', '', NULL, NULL, '#', 0, 0, 1, 6, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO gallery (id, name, image_url, start_date, last_date, link, is_new, date_extended, published, display_order, created_at, updated_at) VALUES ('40e67391-f91b-4529-90ba-5b443e865e82', 'Trial', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/Project-Hanuman_1777044575173.webp', NULL, NULL, 'https://www.tcs9.in/mr/current-affairs/current-affairs-marathi-or-chalu-ghadamodi-2026-or-project-hanuman-or-healing-and-nurturing-units-for-monitoring-aid-and-nursing-of-wildlife-or-andhra-pradesh-deputy-cm-pawan-kalyan', 1, 0, 1, 7, '2026-05-01T10:04:15.905726+00:00', '2026-05-01T10:04:15.905726+00:00');

-- magazines (7 rows)
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('989e653a-707a-4dcb-947d-be58a8ad810a', 'मे 2026', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/33624_1777633904575.jpg', 'https://www.tcs9.in/mr/current-affair-bundle/current-affairs-marathi-november-2025-chalu-ghadmodi', 1, 1, '2026-04-30T01:36:27.547651+00:00', '2026-05-01T11:13:39.619+00:00');
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('b738673c-068a-41d9-a20f-75015bef826a', 'एप्रिल 2026', '', '', 1, 2, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:37:11.838+00:00');
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('5b911580-b398-437a-9f4a-d81afcc9f7a3', 'मार्च 2026', '', '', 1, 3, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:37:03.29+00:00');
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('7ae408f5-a137-4e3a-9fda-e4225639057e', 'फेब्रुवारी 2026', '', 'https://www.tcs9.in/mr/current-affair-bundle/current-affairs-marathi-february-2026-chalu-ghadmodi', 1, 4, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:37:02.217+00:00');
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('aab9d1b6-3e4d-482a-beb1-8ab5efa648c2', 'जानेवारी 2026', '', '', 1, 5, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:37:00.931+00:00');
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('cfb06f6e-82ef-44af-b735-066f6baf1368', 'डिसेंबर 2025', '', '', 1, 6, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:36:59.214+00:00');
INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES ('9f9d9934-9b75-45cf-8bb4-0b89252fb53a', 'नोव्हेंबर 2025', '', '', 1, 7, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:36:58.246+00:00');

-- tests (2 rows)
INSERT INTO tests (id, title, questions, duration, href, image_url, published, display_order, created_at, updated_at) VALUES ('b0491581-2038-4963-ac55-13048c89f4d6', 'आजची टेस्ट qq', '10', '5 मिनिट', 'https://www.tcs9.in/mr/test-series', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/Project-Hanuman_1777044575173.webp', 1, 1, '2026-04-29T13:21:30.763837+00:00', '2026-05-02T06:02:51.349+00:00');
INSERT INTO tests (id, title, questions, duration, href, image_url, published, display_order, created_at, updated_at) VALUES ('0b7a2ee7-11c8-4e54-a470-d979c7c9bb9b', '12442', '', '', 'https://www.tcs9.in/mr/current-affairs/current-affairs-marathi-or-chalu-ghadamodi-2026-or-yashwantrao-chavan-birth-anniversary-or-maharashtrache-pahile-mukhyamantri-or-bhartache-uppantapradhan', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/LYC-Thumbnail_1777013050516.webp', 1, 2, '2026-05-02T06:14:16.160014+00:00', '2026-05-02T06:14:16.160014+00:00');

-- testimonials (4 rows)
INSERT INTO testimonials (id, name, initials, exam, quote, published, display_order, created_at, updated_at) VALUES ('24d94a51-2a1e-400b-828b-b5627669e5f3', 'प्रिया देशमुख', 'P', 'तलाठी, 2025', 'Static GS शी प्रत्येक बातमीची जोडणी मला खूप आवडली. Revision सोपी झाली.', 1, 1, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T01:35:42.833+00:00');
INSERT INTO testimonials (id, name, initials, exam, quote, published, display_order, created_at, updated_at) VALUES ('7af411ba-6aa9-4a7d-aa7f-79bc09e33ad9', 'Tejas Tile', 'T', 'Dy. S P, 2022', 'Masta', 1, 2, '2026-04-30T04:55:35.601663+00:00', '2026-04-30T04:55:41.317+00:00');
INSERT INTO testimonials (id, name, initials, exam, quote, published, display_order, created_at, updated_at) VALUES ('3707292c-1657-474a-b5fb-bec83247e672', 'संदीप पाटील', 'सं', 'महाराष्ट्र पोलीस, 2025', 'मराठीत स्पष्टीकरण असल्यामुळे current affairs कधीच कठीण वाटले नाहीत.', 1, 3, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T04:55:41.319+00:00');
INSERT INTO testimonials (id, name, initials, exam, quote, published, display_order, created_at, updated_at) VALUES ('adb34727-b14c-4229-9e3c-27656c01ac89', 'रोहित जाधव', 'रो', 'रेल्वे RRB, 2025', 'मोफत मासिक PDF मुळे मला coaching ची गरज पडली नाही. प्रामाणिक platform.', 1, 4, '2026-04-29T13:21:30.763837+00:00', '2026-04-30T04:55:40.395+00:00');

-- faqs (8 rows)
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('ede32436-53a9-44d4-bac0-aa49657b0d96', 'हे website मोफत आहे का?', 'होय, संपूर्णपणे मोफत. कुठलेही शुल्क नाही, login नाही.', 1, 1, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('c5d26a01-e4a9-4d71-adb1-c4dab6c67fb3', 'मासिक PDF download करता येते का?', 'होय. प्रत्येक मासिकाच्या पानावर PDF download बटण आहे.', 1, 2, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('196f536e-862d-4877-8fc8-91a1265c2f71', 'टेस्ट किती कठीण आहे?', 'MPSC, तलाठी, पोलीस भरती च्या प्रत्यक्ष परीक्षेसारखीच पातळी. सरावासाठी योग्य.', 1, 3, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('4a3ae49a-706e-4db1-a27d-93caefe82091', 'MPSC आणि तलाठी दोन्हीसाठी useful आहे का?', 'होय. आम्ही प्रत्येक चालू घडामोडी सर्व प्रमुख परीक्षांच्या syllabus नुसार tag करतो.', 1, 4, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('bd29905f-a46e-4082-bcfa-b371740fe01e', 'Content रोज update होते का?', 'होय. आठवड्यातील 6 दिवस ताज्या चालू घडामोडी. मासिक एकदा PDF स्वरूपात.', 1, 5, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('fe62c939-bc9a-4412-b9a9-a925f9a47397', 'मराठीतच सर्व content आहे का?', 'होय. 100% मराठी. कठीण इंग्रजी संज्ञा असल्यास त्यांचा मराठीत अर्थ देखील दिला जातो.', 1, 6, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('573194d0-c19f-4b28-90c7-e0fd36af67e5', 'अजून प्रश्न असतील तर?', 'खाली WhatsApp बटणावर click करा. आम्हाला थेट संपर्क करा.', 1, 7, '2026-04-29T13:21:30.763837+00:00', '2026-04-29T13:21:30.763837+00:00');
INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES ('2a5ddaae-5bdc-4978-bcef-fe7865d091cf', 'का फ्री आहे चालू घडामोडी?', 'For Society', 1, 8, '2026-04-30T01:47:27.390159+00:00', '2026-04-30T01:47:27.390159+00:00');

-- site_settings (2 rows)
INSERT INTO site_settings (key, value, updated_at) VALUES ('hero_image_url', 'https://dw44bia1z0v5t.cloudfront.net/current_affairs_images/Untitled-2_1777709399762.png', '2026-05-02T08:10:48.309+00:00');
INSERT INTO site_settings (key, value, updated_at) VALUES ('hero_mobile_image_url', '', '2026-05-02T08:10:48.309+00:00');

