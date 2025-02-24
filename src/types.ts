export interface Instructor {
  id: string;
  name: string;
  postcode: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  experience: number;
}

export interface InstructorFormData {
  name: string;
  email: string;
  phone: string;
  website?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  travelDistance: number;
  experience: number;
  hourlyRate: number;
  about: string;
}