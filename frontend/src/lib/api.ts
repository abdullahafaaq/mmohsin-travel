import { STORAGE_KEYS } from "@/config/admin";
import type { UmrahPackage, Destination, Airline, TeamMember, CounterStat, SiteSettings, AboutContent } from "@/types/admin";

const API_URL = "http://127.0.0.1:8000/api";

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
};

// Make authenticated request
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

// Umrah Packages API
export const umrahPackagesApi = {
  getAll: () => authFetch("/umrah-packages"),
  getOne: (id: string) => authFetch(`/umrah-packages/${id}`),
  create: (data: Omit<UmrahPackage, "id">) => authFetch("/umrah-packages", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<UmrahPackage>) => authFetch(`/umrah-packages/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  delete: (id: string) => authFetch(`/umrah-packages/${id}`, {
    method: "DELETE",
  }),
};

// Destinations API
export const destinationsApi = {
  getAll: () => authFetch("/destinations"),
  getOne: (id: string) => authFetch(`/destinations/${id}`),
  create: (data: Omit<Destination, "id">) => authFetch("/destinations", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Destination>) => authFetch(`/destinations/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  delete: (id: string) => authFetch(`/destinations/${id}`, {
    method: "DELETE",
  }),
};

// Airlines API
export const airlinesApi = {
  getAll: () => authFetch("/airlines"),
  getOne: (id: string) => authFetch(`/airlines/${id}`),
  create: (data: Omit<Airline, "id">) => authFetch("/airlines", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<Airline>) => authFetch(`/airlines/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  delete: (id: string) => authFetch(`/airlines/${id}`, {
    method: "DELETE",
  }),
};

// Team Members API
export const teamMembersApi = {
  getAll: () => authFetch("/team-members"),
  getOne: (id: string) => authFetch(`/team-members/${id}`),
  create: (data: Omit<TeamMember, "id">) => authFetch("/team-members", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<TeamMember>) => authFetch(`/team-members/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  delete: (id: string) => authFetch(`/team-members/${id}`, {
    method: "DELETE",
  }),
};

// Counter Stats API
export const counterStatsApi = {
  getAll: () => authFetch("/counter-stats"),
  create: (data: Omit<CounterStat, "id">) => authFetch("/counter-stats", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  update: (id: string, data: Partial<CounterStat>) => authFetch(`/counter-stats/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  }),
  delete: (id: string) => authFetch(`/counter-stats/${id}`, {
    method: "DELETE",
  }),
};

// Site Settings API
export const siteSettingsApi = {
  get: () => authFetch("/site-settings"),
  update: (data: SiteSettings) => authFetch("/site-settings", {
    method: "PUT",
    body: JSON.stringify(data),
  }),
};

// About Content API
export const aboutContentApi = {
  get: () => authFetch("/about-content"),
  update: (data: AboutContent) => authFetch("/about-content", {
    method: "PUT",
    body: JSON.stringify(data),
  }),
};
