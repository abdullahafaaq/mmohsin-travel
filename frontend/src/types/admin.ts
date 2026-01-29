export interface UmrahPackage {
  id: string;
  name: string;
  duration: string;
  price: string;
  hotel: string;
  hotelRating: number;
  distance: string;
  inclusions: string[];
  featured: boolean;
  image: string;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  from: string;
  image: string;
}

export interface Airline {
  id: string;
  name: string;
  logo: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
}

export interface CounterStat {
  id: string;
  icon: string;
  target: number;
  suffix: string;
  label: string;
}

export interface BusinessHour {
  day: string;
  hours: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}

export interface SiteSettings {
  companyName: string;
  email: string;
  phones: string[];
  whatsapp: string;
  address: string;
  socialLinks: SocialLinks;
  businessHours: BusinessHour[];
}

export interface AboutContent {
  heroTitle: string;
  heroDescription: string;
  mainTitle: string;
  paragraphs: string[];
  mission: string;
  vision: string;
  yearsExperience: number;
}

export interface SiteData {
  siteSettings: SiteSettings;
  umrahPackages: UmrahPackage[];
  destinations: Destination[];
  airlines: Airline[];
  teamMembers: TeamMember[];
  counterStats: CounterStat[];
  aboutContent: AboutContent;
}
