export interface Product {
  id: number;
  name: string;
  slug: string;
  size: string;
  tagline: string;
  description: string;
  ingredients: string[];
  heat: number;
  category: "Signature" | "Classic" | "Spicy" | "Garlic" | "Sweet Heat" | "Traditional" | "Specialty";
  image: string;
  featured?: boolean;
}

export interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  type: "market" | "festival" | "pop-up" | "class";
  description?: string;
}

export interface ClassInfo {
  title: string;
  price: number;
  duration: string;
  description: string;
  whatYouLearn: string[];
  whatYouGet: string[];
  maxStudents: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  product?: string;
}