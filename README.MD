# 👑 Kings Bakes — Product Requirement Document (PRD)

> **Version:** 2.0  
> **Last Updated:** February 28, 2026  
> **Status:** In Development  
> **Author:** Team Neural Nexus

---

## 📋 Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Business Context](#2-business-context)
- [3. Problem Statement](#3-problem-statement)
- [4. Project Objectives & Success Metrics](#4-project-objectives--success-metrics)
- [5. Target Audience](#5-target-audience)
- [6. Competitive Analysis](#6-competitive-analysis)
- [7. Feature Specification](#7-feature-specification)
- [8. User Flows](#8-user-flows)
- [9. Information Architecture](#9-information-architecture)
- [10. Technology Stack & Justification](#10-technology-stack--justification)
- [11. API Design (Backend)](#11-api-design-backend)
- [12. Database Schema](#12-database-schema)
- [13. SEO & Performance Strategy](#13-seo--performance-strategy)
- [14. Functional Requirements](#14-functional-requirements)
- [15. Non-Functional Requirements](#15-non-functional-requirements)
- [16. Development Phases & Timeline](#16-development-phases--timeline)
- [17. Risk Assessment](#17-risk-assessment)
- [18. Future Roadmap](#18-future-roadmap)
- [19. Conclusion](#19-conclusion)

---

## 1. Executive Summary

**Kings Bakes** is a well-known local bakery in Tiruchirappalli, Tamil Nadu, currently operating without a dedicated digital platform. This project delivers a **full-stack responsive website** with product showcase, WhatsApp-based ordering, contact management, and an admin panel — replacing the bakery's fragmented dependency on Zomato, Instagram, and Facebook with a unified brand experience.

This is not a template website. This is a **complete digital storefront** engineered for conversion, speed, and scalability.

---

## 2. Business Context

| Detail | Info |
|---|---|
| **Shop Name** | Kings Bakes |
| **Address** | Sathanur Main Rd, Sundar Nagar, Tiruchirappalli, Tamil Nadu – 620021 |
| **Phone** | 076392 77171 |
| **Hours** | 9:00 AM – 10:00 PM (Daily) |
| **Google Maps** | [View Location](https://maps.google.com/?q=Kings+Bakes+Sathanur+Main+Rd+Tiruchirappalli) |

### Current Online Presence

| Platform | Status | Limitation |
|---|---|---|
| WhatsApp | ✅ Active (wa.me link) | No product catalog, no order tracking |
| Zomato | ✅ Listed | Commission fees, limited control over branding |
| Instagram | ✅ Active | No direct ordering, algorithm-dependent reach |
| Facebook | ✅ Active | Declining organic reach, no menu structure |
| Wheree.com | ✅ Listed | Low traffic, minimal visibility |
| **Dedicated Website** | ❌ None | — |

**Core Issue:** Zero owned digital real estate. The business is entirely at the mercy of third-party algorithms and policies.

---

## 3. Problem Statement

Kings Bakes faces **five critical digital gaps**:

1. **No Centralized Menu** — Customers cannot view the full product catalog with prices in one place. They must scroll through Instagram posts or check Zomato (which may have outdated listings).

2. **No Direct Order Channel** — Every order goes through third-party platforms that charge commissions or through unstructured WhatsApp messages with no product context.

3. **Fragmented Brand Identity** — Business information is scattered across 5+ platforms with inconsistent branding, descriptions, and imagery.

4. **Zero SEO Presence** — Searching "bakery near Sathanur" or "cakes in Trichy" returns competitors with websites. Kings Bakes is invisible in organic search.

5. **No Customer Data Ownership** — The bakery has no way to collect customer contacts, feedback, or preferences for repeat marketing.

---

## 4. Project Objectives & Success Metrics

### Objectives

| # | Objective | Priority |
|---|---|---|
| O1 | Launch a responsive, fast-loading website showcasing all products | 🔴 Critical |
| O2 | Enable WhatsApp ordering with pre-filled product details | 🔴 Critical |
| O3 | Establish local SEO presence for Tiruchirappalli searches | 🟡 High |
| O4 | Build backend API for dynamic product management | 🟡 High |
| O5 | Provide admin panel for menu CRUD operations | 🟢 Medium |
| O6 | Collect customer inquiries via contact form | 🟢 Medium |

### Success Metrics (KPIs)

| Metric | Target | Measurement |
|---|---|---|
| Page Load Time | < 2 seconds (mobile 4G) | Google Lighthouse |
| Lighthouse Performance Score | > 90 | Google Lighthouse |
| WhatsApp Orders via Website | 20+ per week within 2 months | WhatsApp Business Analytics |
| Organic Search Impressions | 500+ monthly within 3 months | Google Search Console |
| Contact Form Submissions | 10+ per week | Backend logs |
| Bounce Rate | < 50% | Google Analytics |

---

## 5. Target Audience

### Primary Personas

| Persona | Age | Behavior | Need |
|---|---|---|---|
| **Local Resident** | 25–55 | Searches "bakery near me", wants quick ordering | Menu visibility, WhatsApp ordering |
| **College Student** | 18–24 | Browses on mobile, price-sensitive, wants snacks/pastries | Fast mobile UX, clear pricing |
| **Birthday Cake Buyer** | 20–45 | Needs custom cakes, compares options | Product gallery, easy communication |
| **Event Planner** | 25–50 | Bulk orders for parties/functions | Contact form, bulk order inquiry |

### Key Insight
> 85%+ of users will access via **mobile devices**. Mobile-first design is non-negotiable.

---

## 6. Competitive Analysis

| Feature | Kings Bakes (Current) | Local Competitor A (with website) | Kings Bakes (After Project) |
|---|---|---|---|
| Dedicated Website | ❌ | ✅ | ✅ |
| Online Menu with Prices | ❌ | ✅ | ✅ |
| WhatsApp Ordering | ✅ (unstructured) | ❌ | ✅ (structured, pre-filled) |
| Google Maps Embedded | ❌ | ✅ | ✅ |
| SEO Optimized | ❌ | Partial | ✅ (Full local SEO) |
| Admin Panel | ❌ | ❌ | ✅ |
| Contact Form | ❌ | ✅ | ✅ |
| Social Media Integration | ✅ | Partial | ✅ |

---

## 7. Feature Specification

### 7.1 🏠 Home Page

| Element | Description |
|---|---|
| Hero Banner | Full-width image slider with bakery photos, tagline, and CTA button |
| Introduction | 2-3 line brand story — who Kings Bakes is and what makes them special |
| Featured Products | Grid of 4–6 best-selling items with image, name, price, and "Order Now" button |
| Opening Hours | Visual display with current open/closed status indicator |
| WhatsApp CTA | Floating WhatsApp button (persistent across all pages) |
| Testimonials | 3–4 customer reviews in a carousel |
| Social Links | Instagram, Facebook, Zomato icons in footer |

### 7.2 📖 About Page

| Element | Description |
|---|---|
| Brand Story | Origin, values, and specialties of Kings Bakes |
| Shop Image Gallery | 4–6 images of the shop interior, team, and baking process |
| Address & Hours | Full address with operating hours |
| Embedded Google Map | Interactive map with shop pin and directions link |

### 7.3 🍰 Menu Page

**Product Categories:**

| Category | Examples |
|---|---|
| 🎂 Cakes | Birthday cakes, custom cakes, eggless cakes, photo cakes |
| 🧁 Pastries | Chocolate pastry, butterscotch, black forest, red velvet |
| 🥐 Puffs | Veg puff, egg puff, paneer puff, chicken puff |
| 🍿 Snacks | Samosa, bread roll, cutlet, sandwich |
| ☕ Beverages | Tea, coffee, milkshake, fresh juice |

**Each Product Card Contains:**

| Field | Type | Description |
|---|---|---|
| `image` | String (URL) | Product photo (optimized WebP, 400x400) |
| `name` | String | Product name |
| `price` | Number | Price in ₹ |
| `description` | String | Short description (max 100 chars) |
| `category` | String | Category tag |
| `isVeg` | Boolean | Veg/Non-veg indicator |
| `isAvailable` | Boolean | In-stock status |
| `isFeatured` | Boolean | Show on homepage |

**Menu Page Features:**
- Category filter tabs (All / Cakes / Pastries / Puffs / Snacks / Beverages)
- Search bar for quick product lookup
- Sort by price (Low → High, High → Low)
- "Order Now" button per product → WhatsApp with product name pre-filled

### 7.4 📲 Order Feature (WhatsApp Integration)

**Flow:**
1. Customer clicks "Order Now" on any product
2. WhatsApp opens with pre-filled message:

```
Hi Kings Bakes! 👋
I'd like to order:
🛒 Product: {product_name}
💰 Price: ₹{price}

Please confirm availability. Thank you!
```

3. For multiple items, a "Cart" concept stores selections in localStorage and generates a consolidated WhatsApp message

**WhatsApp Link Format:**
```
https://wa.me/917639277171?text={encoded_message}
```

### 7.5 📞 Contact Page

| Element | Description |
|---|---|
| Phone Number | Clickable tel: link |
| Address | Full address with copy button |
| Google Map | Embedded interactive map |
| Contact Form | Name, Phone, Email (optional), Message |
| Social Links | All platform links |

**Contact Form Submission:**
- Frontend validation (required fields, phone format, message length)
- POST to backend API `/api/contact`
- Stored in MongoDB
- Success/error toast notification

### 7.6 🔐 Admin Panel (Backend Connected)

| Feature | Description |
|---|---|
| Login | Admin authentication with JWT |
| Product CRUD | Add, edit, delete, toggle availability of products |
| Image Upload | Upload product images (stored locally or cloud) |
| Contact Inquiries | View all contact form submissions |
| Dashboard | Total products, total inquiries, recent activity |

---

## 8. User Flows

### 8.1 Customer — Browse & Order Flow

```
Landing (Home)
    │
    ├── View Featured Products
    │       └── Click "Order Now"
    │               └── WhatsApp opens with pre-filled message
    │
    ├── Navigate to Menu
    │       ├── Filter by Category
    │       ├── Search Product
    │       └── Click "Order Now" on Product
    │               └── WhatsApp opens with product details
    │
    ├── Navigate to About
    │       └── View Map → Get Directions
    │
    └── Navigate to Contact
            └── Fill Form → Submit → Success Message
```

### 8.2 Admin — Product Management Flow

```
Admin Login (/admin)
    │
    ├── Dashboard Overview
    │
    ├── Manage Products
    │       ├── Add New Product (name, image, price, category, description)
    │       ├── Edit Existing Product
    │       ├── Delete Product
    │       └── Toggle Availability (Available / Sold Out)
    │
    └── View Contact Submissions
            └── List of Name, Phone, Message, Timestamp
```

---

## 9. Information Architecture

```
Kings Bakes Website
│
├── / (Home)
│   ├── Hero Banner
│   ├── Featured Products (from API)
│   ├── Opening Hours
│   └── WhatsApp CTA
│
├── /about
│   ├── Brand Story
│   ├── Gallery
│   └── Google Map
│
├── /menu
│   ├── Category Tabs
│   ├── Search Bar
│   ├── Product Grid (from API)
│   └── Order Buttons → WhatsApp
│
├── /contact
│   ├── Contact Info
│   ├── Google Map
│   └── Contact Form → POST /api/contact
│
├── /admin (Protected)
│   ├── /admin/login
│   ├── /admin/dashboard
│   ├── /admin/products
│   └── /admin/contacts
│
└── Components (Shared)
    ├── Navbar
    ├── Footer
    ├── WhatsApp Floating Button
    └── Product Card
```

---

## 10. Technology Stack & Justification

### Frontend

| Technology | Purpose | Why This? |
|---|---|---|
| **HTML5** | Page structure | Semantic markup for accessibility & SEO |
| **CSS3 + Flexbox/Grid** | Styling & layout | No framework dependency, lightweight, full control |
| **Vanilla JavaScript (ES6+)** | Interactivity | Zero build step, fast loading, no framework overhead |
| **Font Awesome / Lucide Icons** | Iconography | Lightweight icon set for UI elements |
| **Google Fonts (Poppins)** | Typography | Clean, modern, highly readable |

### Backend

| Technology | Purpose | Why This? |
|---|---|---|
| **Node.js** | Runtime | Non-blocking I/O, fast for API servers, JavaScript everywhere |
| **Express.js** | Web framework | Minimal, flexible, massive ecosystem |
| **JWT (jsonwebtoken)** | Authentication | Stateless auth for admin panel, no session management needed |
| **Multer** | File uploads | Handles multipart/form-data for product image uploads |
| **bcrypt** | Password hashing | Industry-standard password security |
| **cors** | Cross-origin | Enable frontend-backend communication |
| **dotenv** | Config management | Secure environment variable handling |

### Database

| Technology | Purpose | Why This? |
|---|---|---|
| **MongoDB** | Primary database | Schema-flexible, JSON-native, perfect for product catalogs |
| **Mongoose** | ODM | Schema validation, middleware, clean query API |

### DevOps & Hosting

| Technology | Purpose | Why This? |
|---|---|---|
| **Frontend** | Netlify / Vercel | Free tier, auto-deploy from Git, global CDN |
| **Backend** | Render / Railway | Free tier, auto-deploy, supports Node.js |
| **Database** | MongoDB Atlas (Free Tier) | 512MB free, cloud-hosted, auto-backups |
| **Version Control** | Git + GitHub | Standard, collaboration-ready |

---

## 11. API Design (Backend)

### Base URL
```
https://api.kingsbakes.com/api/v1
```

### Authentication
- Admin routes protected with JWT Bearer token
- Token expires in 24 hours
- Refresh token mechanism for persistent sessions

### Endpoints

#### Products API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/products` | ❌ | Get all products (with optional filters) |
| `GET` | `/products/:id` | ❌ | Get single product by ID |
| `GET` | `/products/featured` | ❌ | Get featured products for homepage |
| `GET` | `/products/category/:category` | ❌ | Get products by category |
| `POST` | `/products` | ✅ Admin | Create new product |
| `PUT` | `/products/:id` | ✅ Admin | Update product |
| `DELETE` | `/products/:id` | ✅ Admin | Delete product |
| `PATCH` | `/products/:id/availability` | ✅ Admin | Toggle availability |

**Query Parameters for `GET /products`:**
```
?category=cakes&sort=price_asc&search=chocolate&page=1&limit=12
```

**Sample Response — `GET /products`:**
```json
{
  "success": true,
  "count": 24,
  "totalPages": 2,
  "currentPage": 1,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6789",
      "name": "Black Forest Cake",
      "price": 450,
      "description": "Classic chocolate cake with cherry filling and whipped cream",
      "category": "cakes",
      "image": "/uploads/black-forest.webp",
      "isVeg": true,
      "isAvailable": true,
      "isFeatured": true,
      "createdAt": "2026-02-28T10:00:00Z"
    }
  ]
}
```

#### Contact API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/contact` | ❌ | Submit contact form |
| `GET` | `/contact` | ✅ Admin | Get all contact submissions |
| `DELETE` | `/contact/:id` | ✅ Admin | Delete a submission |

**Request Body — `POST /contact`:**
```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210",
  "email": "ravi@email.com",
  "message": "I need a custom birthday cake for 50 people"
}
```

#### Admin Auth API

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/admin/login` | ❌ | Admin login, returns JWT |
| `GET` | `/admin/verify` | ✅ Admin | Verify token validity |
| `POST` | `/admin/change-password` | ✅ Admin | Update admin password |

---

## 12. Database Schema

### Products Collection

```javascript
{
  name:        { type: String, required: true, trim: true },
  price:       { type: Number, required: true, min: 0 },
  description: { type: String, required: true, maxlength: 200 },
  category:    { type: String, enum: ['cakes', 'pastries', 'puffs', 'snacks', 'beverages'], required: true },
  image:       { type: String, required: true },
  isVeg:       { type: Boolean, default: true },
  isAvailable: { type: Boolean, default: true },
  isFeatured:  { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
}
```

### Contacts Collection

```javascript
{
  name:      { type: String, required: true, trim: true },
  phone:     { type: String, required: true, match: /^[6-9]\d{9}$/ },
  email:     { type: String, trim: true },
  message:   { type: String, required: true, maxlength: 500 },
  isRead:    { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}
```

### Admin Collection

```javascript
{
  username:  { type: String, required: true, unique: true },
  password:  { type: String, required: true }, // bcrypt hashed
  role:      { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 13. SEO & Performance Strategy

### On-Page SEO

| Element | Implementation |
|---|---|
| Title Tags | Unique per page: "Kings Bakes – Best Bakery in Trichy | Fresh Cakes & Pastries" |
| Meta Description | Page-specific descriptions with local keywords |
| Open Graph Tags | og:title, og:description, og:image for social sharing |
| Structured Data | Schema.org `Bakery` and `Product` JSON-LD markup |
| Semantic HTML | Proper heading hierarchy (h1 → h6), landmark elements |
| Alt Text | Descriptive alt tags on all product images |
| Sitemap | Auto-generated sitemap.xml |
| Robots.txt | Allow all public pages, block /admin |

### Local SEO

| Action | Detail |
|---|---|
| Google Business Profile | Claim and optimize with website link |
| NAP Consistency | Same Name, Address, Phone across all platforms |
| Local Keywords | "bakery in Trichy", "cakes near Sathanur", "best puffs Tiruchirappalli" |
| Review Strategy | Encourage Google reviews with QR code at shop |

### Performance Optimization

| Technique | Target |
|---|---|
| Image Format | WebP with fallback to JPEG |
| Image Lazy Loading | `loading="lazy"` on all below-fold images |
| Minification | CSS and JS minified for production |
| Gzip Compression | Enabled on server |
| CDN | Netlify/Vercel built-in CDN |
| Critical CSS | Inline above-fold CSS for faster first paint |
| Caching | Cache-Control headers for static assets (1 year) |
| **Target Lighthouse Score** | **> 90 (Performance, Accessibility, SEO, Best Practices)** |

---

## 14. Functional Requirements

| ID | Requirement | Priority | Status |
|---|---|---|---|
| FR-01 | Homepage displays hero banner, featured products, and operating hours | 🔴 Critical | Pending |
| FR-02 | Menu page loads products dynamically from backend API | 🔴 Critical | Pending |
| FR-03 | Category filter and search functionality on menu page | 🟡 High | Pending |
| FR-04 | "Order Now" button generates WhatsApp deep link with product details | 🔴 Critical | Pending |
| FR-05 | Contact form validates input and submits to backend | 🟡 High | Pending |
| FR-06 | Google Maps embedded on About and Contact pages | 🟢 Medium | Pending |
| FR-07 | Admin login with JWT authentication | 🟡 High | Pending |
| FR-08 | Admin CRUD operations for products with image upload | 🟡 High | Pending |
| FR-09 | Admin can view and manage contact submissions | 🟢 Medium | Pending |
| FR-10 | Floating WhatsApp button on all pages | 🔴 Critical | Pending |

---

## 15. Non-Functional Requirements

| ID | Requirement | Specification |
|---|---|---|
| NFR-01 | **Mobile Responsiveness** | Fully functional on screens 320px to 2560px |
| NFR-02 | **Page Load Speed** | < 2 seconds on mobile 4G connection |
| NFR-03 | **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| NFR-04 | **Accessibility** | WCAG 2.1 Level AA compliance |
| NFR-05 | **Security** | Input sanitization, XSS prevention, HTTPS enforced |
| NFR-06 | **Password Security** | bcrypt hashing with 10+ salt rounds |
| NFR-07 | **API Response Time** | < 200ms for all endpoints |
| NFR-08 | **Uptime** | 99.5% availability (hosting SLA dependent) |
| NFR-09 | **Image Optimization** | All images < 100KB, served in WebP |
| NFR-10 | **Code Quality** | ESLint configured, consistent formatting |

---

## 16. Development Phases & Timeline

### Phase 1 — Foundation (Week 1–2)

| Task | Deliverable |
|---|---|
| Project setup & repository | GitHub repo with folder structure |
| Frontend: HTML structure for all pages | Home, About, Menu, Contact pages |
| Frontend: CSS styling (mobile-first) | Responsive design complete |
| Frontend: JavaScript interactivity | Navbar, filters, WhatsApp links |

### Phase 2 — Backend (Week 3–4)

| Task | Deliverable |
|---|---|
| Node.js + Express server setup | Running API server |
| MongoDB Atlas connection | Database connected |
| Products API (CRUD) | All product endpoints functional |
| Contact API | Contact form submission working |
| Admin authentication (JWT) | Login system functional |

### Phase 3 — Integration (Week 5)

| Task | Deliverable |
|---|---|
| Frontend ↔ Backend connection | Dynamic product loading |
| Admin panel UI | Product management interface |
| Image upload system | Multer integration complete |
| Contact form → API integration | End-to-end form submission |

### Phase 4 — Polish & Deploy (Week 6)

| Task | Deliverable |
|---|---|
| SEO implementation | Meta tags, structured data, sitemap |
| Performance optimization | Lighthouse score > 90 |
| Cross-browser testing | Verified on Chrome, Firefox, Safari, Edge |
| Deploy frontend (Netlify/Vercel) | Live frontend URL |
| Deploy backend (Render/Railway) | Live API URL |
| Final QA & bug fixes | Production-ready |

---

## 17. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| MongoDB Atlas free tier storage limit (512MB) | Medium | Medium | Optimize image sizes, monitor usage, upgrade if needed |
| Render free tier cold starts (30s delay) | High | Low | Add loading states on frontend, consider paid tier |
| WhatsApp API policy changes | Low | High | Keep wa.me link format updated, consider WhatsApp Business API |
| Admin credentials compromised | Low | Critical | Strong passwords, JWT expiry, rate limiting on login |
| Image upload abuse | Medium | Medium | File type validation, size limits (max 2MB), rate limiting |
| Backend downtime | Medium | High | Graceful frontend fallback (static data), uptime monitoring |

---

## 18. Future Roadmap

| Phase | Feature | Description | Timeline |
|---|---|---|---|
| v2.0 | **Online Payment (UPI)** | Razorpay/PhonePe integration for direct payments | Month 3 |
| v2.0 | **Cake Customization Form** | Custom cake builder (flavor, size, design, message) | Month 3 |
| v2.5 | **Delivery Tracking** | Order status updates via WhatsApp Business API | Month 4 |
| v2.5 | **Customer Accounts** | Login, order history, favorites | Month 5 |
| v3.0 | **PWA (Progressive Web App)** | Install on phone, offline menu browsing | Month 6 |
| v3.0 | **Analytics Dashboard** | Sales trends, popular products, peak hours | Month 6 |
| v3.5 | **Multi-language Support** | Tamil + English toggle | Month 7 |
| v4.0 | **Mobile App** | React Native app for iOS and Android | Month 9 |

---

## 19. Conclusion

This PRD transforms Kings Bakes from a bakery with fragmented online presence into a **digitally empowered brand** with a professional website, structured ordering system, and scalable backend infrastructure.

The project delivers:

- ✅ A blazing-fast, mobile-first website that converts visitors into customers
- ✅ A WhatsApp ordering system that eliminates friction from the buying process
- ✅ A backend API that enables dynamic content management without code changes
- ✅ An admin panel that puts the bakery owner in full control of their digital storefront
- ✅ An SEO strategy that captures local search traffic competitors are currently winning
- ✅ A scalable architecture ready for payments, delivery tracking, and a mobile app

**Kings Bakes deserves more than a social media page. This project gives them a digital empire.**

---

<div align="center">

**Built with 🔥 by Team Neural Nexus**

*"Every great bakery deserves a website as good as their cakes."*

</div>