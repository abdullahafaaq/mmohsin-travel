import { useState, useEffect, useCallback } from "react";
import { SiteData, UmrahPackage, Destination, Airline, TeamMember, CounterStat, SiteSettings, AboutContent } from "@/types/admin";
import { STORAGE_KEYS } from "@/config/admin";
import { defaultAirlines } from "@/assets/airlines";

const defaultSiteData: SiteData = {
  siteSettings: {
    companyName: "M Mohsin International Travel Management",
    email: "info@mmohsintravel.com",
    phones: ["+92 300 0180347", "+92 302 7553524"],
    whatsapp: "923000180347",
    address: "Near Govt. Muslim Model High School, Darman Road, Shakargarh",
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      whatsapp: "https://wa.me/923000180347",
    },
    businessHours: [
      { day: "Monday - Saturday", hours: "10:00 AM - 7:00 PM" },
      { day: "Sunday", hours: "Closed (WhatsApp available)" },
    ],
  },
  umrahPackages: [
    {
      id: "1",
      name: "Economy Umrah",
      duration: "7 Days / 6 Nights",
      price: "PKR 185,000",
      hotel: "Al Safwah Tower",
      hotelRating: 3,
      distance: "500m from Haram",
      inclusions: ["Umrah Visa Processing", "Return Economy Flights", "3-Star Hotel in Makkah (3 nights)", "3-Star Hotel in Madinah (3 nights)", "Airport Transfers", "Ziyarat Tours in both cities"],
      featured: false,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      name: "Standard Umrah",
      duration: "10 Days / 9 Nights",
      price: "PKR 245,000",
      hotel: "Anjum Hotel",
      hotelRating: 4,
      distance: "200m from Haram",
      inclusions: ["Umrah Visa Processing", "Return Economy Flights", "4-Star Hotel in Makkah (5 nights)", "4-Star Hotel in Madinah (4 nights)", "Private Airport Transfers", "Full Ziyarat Tours", "Daily Breakfast"],
      featured: false,
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "3",
      name: "Premium Umrah",
      duration: "10 Days / 9 Nights",
      price: "PKR 295,000",
      hotel: "Pullman ZamZam",
      hotelRating: 5,
      distance: "Steps from Haram",
      inclusions: ["Umrah Visa Processing", "Return Economy Flights", "5-Star Pullman ZamZam Makkah (5 nights)", "5-Star Madinah Hilton (4 nights)", "VIP Airport Transfers", "Comprehensive Ziyarat", "Daily Breakfast & Dinner", "24/7 Guide Support"],
      featured: true,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "4",
      name: "VIP Umrah",
      duration: "14 Days / 13 Nights",
      price: "PKR 450,000",
      hotel: "Fairmont Makkah",
      hotelRating: 5,
      distance: "Haram View Rooms",
      inclusions: ["Umrah Visa Processing", "Business Class Flights", "5-Star Fairmont Makkah (7 nights) - Haram View", "5-Star Oberoi Madinah (6 nights)", "Luxury VIP Transfers", "Private Guide Throughout", "All Meals Included", "Laundry Service", "Dedicated Concierge"],
      featured: false,
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "5",
      name: "Family Umrah",
      duration: "12 Days / 11 Nights",
      price: "PKR 275,000",
      hotel: "Swissotel",
      hotelRating: 5,
      distance: "Connected to Haram",
      inclusions: ["Umrah Visa for Family", "Return Flights (Group Rates)", "Family Suite in Makkah (6 nights)", "Family Suite in Madinah (5 nights)", "Family-Friendly Transfers", "Kids-Focused Ziyarat", "All Meals Included", "Stroller & Baby Essentials"],
      featured: false,
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "6",
      name: "Ramadan Special",
      duration: "15 Days / 14 Nights",
      price: "PKR 395,000",
      hotel: "Hilton Suites",
      hotelRating: 5,
      distance: "50m from Haram",
      inclusions: ["Umrah Visa Processing", "Return Flights", "5-Star Makkah (10 nights)", "5-Star Madinah (4 nights)", "Iftar & Suhoor Included", "Special Ramadan Programs", "Taraweeh Prayer Arrangements", "24/7 Guide Support"],
      featured: false,
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&auto=format&fit=crop&q=80",
    },
  ],
  destinations: [
    { id: "1", city: "Jeddah", country: "Saudi Arabia", from: "PKR 85,000", image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&auto=format&fit=crop&q=80" },
    { id: "2", city: "Madinah", country: "Saudi Arabia", from: "PKR 82,000", image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80" },
    { id: "3", city: "Dubai", country: "UAE", from: "PKR 65,000", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80" },
    { id: "4", city: "Istanbul", country: "Turkey", from: "PKR 95,000", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=80" },
    { id: "5", city: "London", country: "United Kingdom", from: "PKR 145,000", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80" },
    { id: "6", city: "Kuala Lumpur", country: "Malaysia", from: "PKR 75,000", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=80" },
  ],
  airlines: defaultAirlines,
  teamMembers: [
    { id: "1", name: "Mohsin Raza", role: "Founder & CEO", description: "10+ years of experience in travel management and Umrah services." },
    { id: "2", name: "Hassan Raza", role: "Operations Manager", description: "Expert in logistics and customer service coordination." },
    { id: "3", name: "Hussnain Raza", role: "CTO", description: "Leading technology initiatives and digital transformation." },
  ],
  counterStats: [
    { id: "1", icon: "Calendar", target: 5000, suffix: "+", label: "Bookings" },
    { id: "2", icon: "Users", target: 50, suffix: "+", label: "Agents" },
    { id: "3", icon: "Award", target: 10000, suffix: "+", label: "Happy Clients" },
    { id: "4", icon: "Clock", target: 14, suffix: "+", label: "Years of Experience" },
  ],
  aboutContent: {
    heroTitle: "Your Trusted Travel Partner Since 2010",
    heroDescription: "M Mohsin International Travel Management is dedicated to making your spiritual and travel dreams a reality with exceptional service and care.",
    mainTitle: "Creating Memorable Journeys for Over a Decade",
    paragraphs: [
      "Welcome to M Mohsin International Travel Management, your dedicated partner in creating unforgettable travel experiences. With years of expertise in the travel industry, we pride ourselves on delivering personalized service and unparalleled knowledge to ensure every journey is as seamless and enjoyable as possible.",
      "Our team of passionate travel experts is committed to crafting tailored itineraries that cater to your unique interests and preferences, whether you're seeking a tranquil getaway, an adventurous expedition, or a spiritual exploration.",
      "At M Mohsin International, we believe that travel is more than just a destination – it's an opportunity to discover new perspectives and create lasting memories. Let us guide you on your next adventure and turn your travel dreams into reality.",
    ],
    mission: "To provide exceptional travel services that exceed expectations, making every journey a memorable experience. We are committed to offering reliable, affordable, and personalized travel solutions for all our clients.",
    vision: "To become the most trusted and preferred travel agency in Pakistan, known for our integrity, quality service, and commitment to making spiritual journeys accessible and comfortable for everyone.",
    yearsExperience: 14,
  },
};

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.SITE_DATA);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData({ ...defaultSiteData, ...parsed });
      } catch (e) {
        console.error("Failed to parse site data from localStorage");
      }
    }
    setIsLoading(false);
  }, []);

  // Save data to localStorage
  const saveData = useCallback((newData: Partial<SiteData>) => {
    const updated = { ...data, ...newData };
    setData(updated);
    localStorage.setItem(STORAGE_KEYS.SITE_DATA, JSON.stringify(updated));
  }, [data]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setData(defaultSiteData);
    localStorage.removeItem(STORAGE_KEYS.SITE_DATA);
  }, []);

  // Individual update functions
  const updateSiteSettings = useCallback((settings: Partial<SiteSettings>) => {
    saveData({ siteSettings: { ...data.siteSettings, ...settings } });
  }, [data.siteSettings, saveData]);

  const updateUmrahPackages = useCallback((packages: UmrahPackage[]) => {
    saveData({ umrahPackages: packages });
  }, [saveData]);

  const updateDestinations = useCallback((destinations: Destination[]) => {
    saveData({ destinations });
  }, [saveData]);

  const updateAirlines = useCallback((airlines: Airline[]) => {
    saveData({ airlines });
  }, [saveData]);

  const updateTeamMembers = useCallback((members: TeamMember[]) => {
    saveData({ teamMembers: members });
  }, [saveData]);

  const updateCounterStats = useCallback((stats: CounterStat[]) => {
    saveData({ counterStats: stats });
  }, [saveData]);

  const updateAboutContent = useCallback((content: Partial<AboutContent>) => {
    saveData({ aboutContent: { ...data.aboutContent, ...content } });
  }, [data.aboutContent, saveData]);

  return {
    data,
    isLoading,
    saveData,
    resetToDefaults,
    updateSiteSettings,
    updateUmrahPackages,
    updateDestinations,
    updateAirlines,
    updateTeamMembers,
    updateCounterStats,
    updateAboutContent,
  };
}

export { defaultSiteData };
