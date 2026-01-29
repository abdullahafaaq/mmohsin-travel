
# Admin Panel Implementation Plan (LocalStorage-Based)

## Overview
Create a password-protected admin panel that stores all editable content in localStorage. This is a limited solution where changes only persist in your browser.

---

## Important Limitations
- Changes are saved to YOUR browser only (not the server)
- Clearing browser data will delete all changes
- Other users/devices won't see your changes
- Not suitable for production multi-user editing

---

## Architecture

```text
+------------------------+
|     Admin Login        |
|   (Password Check)     |
+-----------+------------+
            |
            v
+------------------------+
|    Admin Dashboard     |
+------------------------+
|  - Site Settings       |
|  - Umrah Packages      |
|  - Flight Destinations |
|  - Airlines            |
|  - Team Members        |
|  - Counter Stats       |
|  - Contact Info        |
|  - About Content       |
+------------------------+
            |
            v
+------------------------+
|     localStorage       |
|   (Data Persistence)   |
+------------------------+
            |
            v
+------------------------+
|   Public Pages         |
|  (Read from storage)   |
+------------------------+
```

---

## Files to Create

### 1. Authentication Context
**File:** `src/contexts/AuthContext.tsx`
- Simple auth context with password verification
- Store auth state in sessionStorage (expires when browser closes)
- Hardcoded admin password (can be changed)

### 2. Protected Route Component
**File:** `src/components/ProtectedRoute.tsx`
- Wrapper component to protect admin routes
- Redirect to login if not authenticated

### 3. Admin Login Page
**File:** `src/pages/admin/Login.tsx`
- Clean login form with password field
- Password validation
- Redirect to dashboard on success

### 4. Admin Dashboard Layout
**File:** `src/pages/admin/AdminLayout.tsx`
- Sidebar navigation for all sections
- Header with logout button
- Main content area

### 5. Admin Dashboard Pages
| File | Purpose |
|------|---------|
| `src/pages/admin/Dashboard.tsx` | Overview with quick stats |
| `src/pages/admin/UmrahPackages.tsx` | CRUD for Umrah packages |
| `src/pages/admin/Destinations.tsx` | CRUD for flight destinations |
| `src/pages/admin/Airlines.tsx` | CRUD for airline partners |
| `src/pages/admin/TeamMembers.tsx` | CRUD for team members |
| `src/pages/admin/SiteSettings.tsx` | Edit site-wide settings (contact info, social links) |
| `src/pages/admin/CounterStats.tsx` | Edit counter statistics |
| `src/pages/admin/AboutContent.tsx` | Edit about page content |

### 6. Data Store Hook
**File:** `src/hooks/useSiteData.ts`
- Custom hook to read/write all site data from localStorage
- Provides default values if no localStorage data exists
- Functions: `getData()`, `saveData()`, `resetToDefaults()`

### 7. Type Definitions
**File:** `src/types/admin.ts`
- TypeScript interfaces for all editable content
- Ensures type safety throughout the admin panel

---

## Data Structure

```typescript
interface SiteData {
  siteSettings: {
    companyName: string;
    email: string;
    phones: string[];
    whatsapp: string;
    address: string;
    socialLinks: { facebook: string; instagram: string; youtube: string; };
    businessHours: { day: string; hours: string; }[];
  };
  
  umrahPackages: UmrahPackage[];
  destinations: Destination[];
  airlines: Airline[];
  teamMembers: TeamMember[];
  counterStats: CounterStat[];
  
  aboutContent: {
    heroTitle: string;
    heroDescription: string;
    mainTitle: string;
    paragraphs: string[];
    mission: string;
    vision: string;
    yearsExperience: number;
  };
}
```

---

## Admin Panel Features

### Dashboard
- Overview cards showing total packages, destinations, team members
- Quick links to each section
- Reset to defaults button

### Umrah Packages Section
- Table listing all packages
- Add new package form
- Edit existing package (inline or modal)
- Delete package with confirmation
- Toggle featured status
- Fields: name, duration, price, hotel, rating, distance, inclusions, image URL

### Destinations Section
- Grid/table of destinations
- Add/Edit/Delete with city, country, price, image URL

### Airlines Section
- List of airline partners
- Add/Edit name and logo URL
- Delete with confirmation

### Team Members Section
- Cards showing team members
- Add/Edit name, role, description
- Delete with confirmation

### Site Settings Section
- Company name
- Contact details (email, phones, WhatsApp)
- Office address
- Social media links
- Business hours

### Counter Stats Section
- Edit the 4 counter statistics
- Target numbers, labels, suffixes

### About Content Section
- Hero section text
- Main content paragraphs
- Mission and vision statements
- Years of experience number

---

## Route Structure

```text
/admin/login          - Login page
/admin                - Dashboard (protected)
/admin/packages       - Umrah packages (protected)
/admin/destinations   - Flight destinations (protected)
/admin/airlines       - Airline partners (protected)
/admin/team           - Team members (protected)
/admin/settings       - Site settings (protected)
/admin/stats          - Counter stats (protected)
/admin/about          - About content (protected)
```

---

## Updates to Existing Pages

All public pages will be updated to:
1. Import the `useSiteData` hook
2. Read content from localStorage if available
3. Fall back to default hardcoded values if not

**Pages to Update:**
- `src/pages/Home.tsx`
- `src/pages/UmrahPackages.tsx`
- `src/pages/FlightTickets.tsx`
- `src/pages/About.tsx`
- `src/pages/Contact.tsx`
- `src/components/TopBar.tsx`
- `src/components/Footer.tsx`
- `src/components/CounterStats.tsx`

---

## Authentication Details

### Password Storage
- Admin password will be stored as a constant in the code
- Default password: `admin123` (you should change this)
- Can be changed in `src/config/admin.ts`

### Session Management
- Login state stored in `sessionStorage`
- Automatically logs out when browser is closed
- Manual logout button in admin panel

---

## Security Notes

This is a LOCAL-ONLY solution. For production use:
- Password is visible in source code (not secure)
- No server-side validation
- Anyone with browser dev tools can see the password
- Suitable only for personal use on your own machine

---

## Implementation Order

1. Create type definitions and data structure
2. Create auth context and protected route
3. Create admin login page
4. Create admin layout with sidebar
5. Create data store hook with localStorage
6. Build each admin section (packages, destinations, etc.)
7. Update public pages to read from localStorage
8. Add routes to App.tsx
9. Test all CRUD operations

---

## Estimated Changes

| Category | Files |
|----------|-------|
| New files | ~15 files |
| Modified files | ~10 files |
| Total | ~25 files |

The admin panel will be accessible at `/admin/login` with the default password `admin123`.
