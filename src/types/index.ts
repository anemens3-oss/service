export type ServiceCategory = 
  | 'all'
  | 'maintenance'
  | 'diagnostics'
  | 'chassis'
  | 'detailing'
  | 'seasonal';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  priceFrom: number;
  duration: string;
  warranty: string;
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  whatIncluded: string[];
  equipmentUsed: string;
  stages: {
    step: string;
    title: string;
    desc: string;
  }[];
  priceByClass: {
    sedan: number;
    suv: number;
    premium: number;
  };
  iconName: string;
}

export type CarClass = 'sedan' | 'suv' | 'premium';

export interface CalculatorItem {
  serviceId: string;
  title: string;
  basePrice: number;
  calculatedPrice: number;
}

export interface BookingFormData {
  serviceIds: string[];
  carMake: string;
  carModel: string;
  carYear: string;
  carClass: CarClass;
  clientName: string;
  phone: string;
  date: string;
  timeSlot: string;
  comment: string;
  agreeToPolicy: boolean;
}

export interface BookingConfirmation {
  bookingId: string;
  data: BookingFormData;
  services: ServiceItem[];
  estimatedTotal: number;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface DemoReview {
  id: string;
  author: string;
  car: string;
  rating: number;
  date: string;
  service: string;
  text: string;
  verified: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'info' | 'success' | 'warning';
  title: string;
  message: string;
}
