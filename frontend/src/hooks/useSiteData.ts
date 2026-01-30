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
  umrahPackages: [],
  destinations: [],
  airlines: defaultAirlines,
  teamMembers: [],
  counterStats: [],
  aboutContent: {
    heroTitle: "Your Trusted Travel Partner Since 2010",
    heroDescription: "M Mohsin International Travel Management is dedicated to making your spiritual and travel dreams a reality with exceptional service and care.",
    mainTitle: "Creating Memorable Journeys for Over a Decade",
    paragraphs: [],
    mission: "To provide exceptional travel services that exceed expectations",
    vision: "To become the most trusted and preferred travel agency in Pakistan",
    yearsExperience: 14,
  },
};

const API_URL = "http://127.0.0.1:8000/api";

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data from API on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const [packagesRes, destinationsRes, teamRes, statsRes, settingsRes, aboutRes] = await Promise.all([
        fetch(`${API_URL}/umrah-packages`),
        fetch(`${API_URL}/destinations`),
        fetch(`${API_URL}/team-members`),
        fetch(`${API_URL}/counter-stats`),
        fetch(`${API_URL}/site-settings`),
        fetch(`${API_URL}/about-content`),
      ]);

      const packages = await packagesRes.json();
      const destinations = await destinationsRes.json();
      const team = await teamRes.json();
      const stats = await statsRes.json();
      const settings = await settingsRes.json();
      const about = await aboutRes.json();

      setData(prevData => ({
        ...prevData,
        umrahPackages: Array.isArray(packages) ? packages : [],
        destinations: Array.isArray(destinations) ? destinations : [],
        teamMembers: Array.isArray(team) ? team : [],
        counterStats: Array.isArray(stats) ? stats : [],
        siteSettings: settings && settings[0] ? settings[0] : prevData.siteSettings,
        aboutContent: about && about[0] ? about[0] : prevData.aboutContent,
      }));
    } catch (error) {
      console.error("Failed to fetch site data from API:", error);
      // Fallback to default data if API fails
    } finally {
      setIsLoading(false);
    }
  };

  const getAuthToken = () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
  };

  const makeAuthenticatedRequest = async (
    url: string,
    method: string = "GET",
    body?: unknown
  ) => {
    const token = getAuthToken();
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`${API_URL}${url}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });
  };

  // Individual update functions
  const updateSiteSettings = useCallback(async (settings: Partial<SiteSettings>) => {
    try {
      const response = await makeAuthenticatedRequest("/site-settings", "PUT", settings);
      if (response.ok) {
        const updated = await response.json();
        setData(prev => ({ ...prev, siteSettings: updated }));
      }
    } catch (error) {
      console.error("Failed to update site settings:", error);
    }
  }, []);

  const updateUmrahPackages = useCallback(async (packages: UmrahPackage[]) => {
    try {
      // This would typically be done via individual API calls for each package
      // For now, update locally and sync with API
      setData(prev => ({ ...prev, umrahPackages: packages }));
    } catch (error) {
      console.error("Failed to update umrah packages:", error);
    }
  }, []);

  const updateDestinations = useCallback(async (destinations: Destination[]) => {
    try {
      setData(prev => ({ ...prev, destinations }));
    } catch (error) {
      console.error("Failed to update destinations:", error);
    }
  }, []);

  const updateAirlines = useCallback(async (airlines: Airline[]) => {
    try {
      setData(prev => ({ ...prev, airlines }));
    } catch (error) {
      console.error("Failed to update airlines:", error);
    }
  }, []);

  const updateTeamMembers = useCallback(async (members: TeamMember[]) => {
    try {
      setData(prev => ({ ...prev, teamMembers: members }));
    } catch (error) {
      console.error("Failed to update team members:", error);
    }
  }, []);

  const updateCounterStats = useCallback(async (stats: CounterStat[]) => {
    try {
      setData(prev => ({ ...prev, counterStats: stats }));
    } catch (error) {
      console.error("Failed to update counter stats:", error);
    }
  }, []);

  const updateAboutContent = useCallback(async (content: Partial<AboutContent>) => {
    try {
      const response = await makeAuthenticatedRequest("/about-content", "PUT", content);
      if (response.ok) {
        const updated = await response.json();
        setData(prev => ({ ...prev, aboutContent: updated }));
      }
    } catch (error) {
      console.error("Failed to update about content:", error);
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(defaultSiteData);
  }, []);

  return {
    data,
    isLoading,
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
