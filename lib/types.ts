// Content type interfaces for the CMS

export interface GalleryPost {
  id: string;
  name: string;
  date: string;
  link: string;
  is_new: boolean;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Magazine {
  id: string;
  month: string;
  questions: string;
  pages: string;
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
