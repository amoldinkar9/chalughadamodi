// Content type interfaces for the CMS

export interface GalleryPost {
  id: string;
  name: string;
  image_url: string;
  start_date: string;
  last_date: string;
  link: string;
  apply_link: string;
  is_new: boolean;
  date_extended?: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Magazine {
  id: string;
  month: string;
  image_url: string;
  pdf_url: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Test {
  id: string;
  title: string;
  questions: string;
  duration: string;
  href: string;
  image_url: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  exam: string;
  quote: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  image_url: string;
  backlink: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface PublicContent {
  announcements: Announcement[];
  gallery: GalleryPost[];
  magazines: Magazine[];
  tests: Test[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}
