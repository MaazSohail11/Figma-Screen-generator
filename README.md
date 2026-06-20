<p align="center">
  <img src="https://img.shields.io/badge/Figma-Plugin-FF7262?style=for-the-badge&logo=figma&logoColor=white" alt="Figma Plugin" />
  <img src="https://img.shields.io/badge/Screens-200+-3D9B9B?style=for-the-badge" alt="200+ Screens" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Platform-Web%20%2B%20Mobile-F4B942?style=for-the-badge" alt="Platform" />
</p>

<h1 align="center">🍕 BasKhao — Figma Screen Generator</h1>

<p align="center">
  <b>A suite of Figma plugins that auto-generate complete, production-ready UI screens for the BasKhao food delivery platform — spanning mobile apps, desktop dashboards, wireframes, landing pages, and admin panels.</b>
</p>

<p align="center">
  <a href="#-architecture-overview">Architecture</a> •
  <a href="#-plugin-modules">Modules</a> •
  <a href="#-screen-catalog">Screens</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-design-system">Design System</a>
</p>

---

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "BasKhao Figma Plugin Suite"
        direction TB
        
        subgraph MOBILE["📱 Mobile Plugins (375×812)"]
            APP_HF["figma - app - high fid<br/>46+ Hi-Fi Screens<br/>265 KB"]
            APP_LF["app wireframes<br/>46+ Lo-Fi Wireframes<br/>176 KB"]
            APP_MID["figma - app<br/>Extended Features<br/>169 KB"]
        end
        
        subgraph DESKTOP["🖥️ Desktop Plugins (1440×900)"]
            PC_HF["figma - pc<br/>30+ Hi-Fi Screens<br/>110 KB + Backup"]
            PC_LF["pc wireframes<br/>64+ Lo-Fi Wireframes<br/>113 KB"]
            PC_PAGES["pages/<br/>29 HTML Screens<br/>Static Mirrors"]
        end
        
        subgraph LANDING["🌐 Landing Page"]
            LAND["figma - app - Copy<br/>Scrollable Landing Page<br/>21 KB"]
        end
    end
    
    APP_HF -->|"Same naming convention"| APP_LF
    PC_HF -->|"Same naming convention"| PC_LF
    PC_HF -->|"HTML mirrors"| PC_PAGES

    style MOBILE fill:#2C5F5F,color:#fff,stroke:#F4B942,stroke-width:2px
    style DESKTOP fill:#2C5F5F,color:#fff,stroke:#F4B942,stroke-width:2px
    style LANDING fill:#2C5F5F,color:#fff,stroke:#F4B942,stroke-width:2px
```

---

## 📂 Project Structure

```
working figma/
│
├── 📱 figma - app - high fid/     # HIGH-FIDELITY MOBILE APP (Primary)
│   ├── code.js                     # 6,967 lines — 46+ screens with real images
│   ├── ui.html                     # Plugin UI panel
│   ├── manifest.json               # Figma plugin manifest
│   └── dist/                       # Build output
│
├── 📱 figma - app/                 # EXTENDED MOBILE FEATURES
│   ├── code.js                     # 4,665 lines — Pickup, Group Orders, Split Pay
│   ├── ui.html                     # Plugin UI panel
│   ├── manifest.json               # Figma plugin manifest
│   └── dist/                       # Build output
│
├── 📱 app wireframes/              # LOW-FIDELITY MOBILE WIREFRAMES
│   ├── code.js                     # 5,303 lines — Wireframe versions of all screens
│   ├── ui.html                     # Plugin UI panel
│   ├── manifest.json               # Figma plugin manifest
│   └── dist/                       # Build output
│
├── 🖥️ figma - pc/                  # HIGH-FIDELITY DESKTOP DASHBOARD
│   ├── code.js                     # 2,465 lines — Business, Corporate, Merchant, Admin
│   ├── code - backup.js            # 3,757 lines — Full backup with images
│   ├── ui.html                     # Plugin UI panel
│   ├── manifest.json               # With networkAccess for Unsplash images
│   ├── pages/                      # 29 static HTML screen mirrors
│   │   ├── index.html              # Hub page linking all screens
│   │   ├── assets/style.css        # Shared CSS design system
│   │   ├── 101-admin-dashboard.html
│   │   ├── 120-analytics.html
│   │   ├── 135-corporate-discounts.html
│   │   ├── 142-membership.html
│   │   ├── 156-merchant-dashboard.html
│   │   └── ... (29 total screens)
│   └── dist/                       # Build output
│
├── 🖥️ pc wireframes/               # LOW-FIDELITY DESKTOP WIREFRAMES
│   ├── code.js                     # 2,979 lines — 64+ wireframe screens
│   ├── ui.html                     # Plugin UI panel
│   ├── manifest.json               # With networkAccess
│   └── dist/                       # Build output
│
├── 🌐 figma - app - Copy/          # LANDING PAGE GENERATOR
│   ├── code.js                     # 514 lines — Scrollable landing page
│   ├── ui.html                     # Plugin UI panel
│   ├── manifest.json               # Figma plugin manifest
│   └── dist/                       # Build output
│
├── .gitignore
└── README.md                       # ← You are here
```

---

## 🔌 Plugin Modules

### Module 1: 📱 High-Fidelity Mobile App (`figma - app - high fid`)

> **The flagship module** — Generates a complete, production-quality mobile app prototype directly inside Figma.

| Spec | Detail |
|------|--------|
| **Viewport** | 375 × 812 (iPhone X) |
| **Screens** | 46+ fully designed |
| **Features** | 92 features covered |
| **Images** | Real Unsplash photos via `figma.createImageAsync()` |
| **Colors** | Teal/Yellow brand theme with gradients |
| **Typography** | Inter (Regular, Bold, Semi Bold) |
| **Prototyping** | All buttons named with `-CLICK` suffix for Figma prototyping |

**Screen flow covered:**
```
Splash → Welcome → Login/Signup → OTP → Location → Home → Search →
Restaurant → Menu → Cart → Checkout → Tracking → Reviews → Profile →
Wallet → Notifications → Support → Offers → Settings → and more
```

---

### Module 2: 📱 Extended Mobile Features (`figma - app`)

> Adds advanced features that extend the core app — group ordering, split payments, pickup/takeaway flows.

**Key screens:**
- 🚗 Pickup/Takeaway Selection & Notifications
- ⚡ Delivery Type Selection (Standard, Express, Contactless, Curbside)
- 👥 Group Order (Start, Lobby, Finalize)
- 💳 Split Payment (Setup, Status tracking)

---

### Module 3: 📱 Mobile Wireframes (`app wireframes`)

> Low-fidelity wireframe versions of **every mobile screen**, using the **exact same element names** as the high-fidelity versions.

This enables Figma prototyping links to work identically between wireframe and high-fi screens.

**Wireframe Design Language:**
- White fills with black borders (buttons)
- Gray lines as text placeholders
- Gray boxes with X-cross for image placeholders
- Same layout coordinates as high-fidelity screens

---

### Module 4: 🖥️ Desktop Dashboard (`figma - pc`)

> Generates enterprise-grade desktop screens (1440×900) organized by **role-based categories**.

```mermaid
graph LR
    subgraph "Desktop Screen Categories"
        BIZ["💼 Business<br/>3 screens"]
        CORP["🏢 Corporate<br/>6 screens"]
        MERCH["🍽️ Merchant<br/>10 screens"]
        ADMIN["⚙️ Admin<br/>6+ screens"]
        DONATE["❤️ Donation<br/>4 screens"]
    end

    BIZ --> B1["121 - Registration"]
    BIZ --> B2["122 - Dashboard"]
    BIZ --> B3["142 - Membership"]

    CORP --> C1["135 - Discounts"]
    CORP --> C2["136 - Employees"]
    CORP --> C3["137 - Invoices"]
    CORP --> C4["138 - Setup"]
    CORP --> C5["135 Admin - Discounts"]
    CORP --> C6["139 Admin - Accounts"]

    MERCH --> M1["120 - Analytics"]
    MERCH --> M2["149 - Orders"]
    MERCH --> M3["150 - Menu"]
    MERCH --> M4["156 - Dashboard"]

    ADMIN --> A1["101 - Dashboard"]
    ADMIN --> A2["102 - Users"]
    ADMIN --> A3["103 - Approvals"]
    ADMIN --> A4["104 - Monitoring"]

    style BIZ fill:#3D9B9B,color:#fff
    style CORP fill:#F4B942,color:#333
    style MERCH fill:#3D9B9B,color:#fff
    style ADMIN fill:#2C5F5F,color:#fff
    style DONATE fill:#E84C3D,color:#fff
```

Plus, this module includes **29 static HTML pages** (`pages/`) that mirror the Figma screens for web previewing.

---

### Module 5: 🖥️ Desktop Wireframes (`pc wireframes`)

> **64+ wireframe screens** covering the full web application — the largest module by screen count.

| Category | Screens |
|----------|---------|
| Customer (Web) | 43 screens — Splash through Settings |
| Restaurant (Merchant) | 11 screens — Dashboard through Staff |
| Admin | 10 screens — Dashboard through Analytics |
| **Total** | **64 screens** |

---

### Module 6: 🌐 Landing Page (`figma - app - Copy`)

> Generates a scrollable, multi-section landing page with **real Unsplash images**.

**Sections (4800px total height):**
1. **Hero** (900px) — CTA, feature cards, customer badges
2. **How It Works** (600px) — 3-step flow cards
3. **Featured Restaurants** (650px) — Real food photos
4. **Popular Dishes** (700px) — Category tabs + dish cards
5. **Delivery Riders** (550px) — USP section
6. **Customer Reviews** (500px) — Testimonial cards
7. **Footer** (600px) — Newsletter, links, app badges

---

## 🎨 Design System

All plugins share a unified visual language:

```mermaid
graph TB
    subgraph "Color Palette"
        TEAL["🟢 Teal<br/>#3D9B9B<br/>Primary"]
        DTEAL["🟢 Dark Teal<br/>#2C5F5F<br/>Headers"]
        YELLOW["🟡 Yellow<br/>#F5B842<br/>CTAs & Accents"]
        RED["🔴 Red<br/>#E84A3D<br/>Errors"]
        GREEN["🟢 Green<br/>#33B34D<br/>Success"]
    end

    subgraph "Typography"
        INTER["Inter Font Family"]
        REG["Regular — Body text"]
        SEMI["Semi Bold — Labels"]
        BOLD["Bold — Headings & CTAs"]
    end

    subgraph "Component Patterns"
        BTN["btn() — Rounded buttons"]
        TXT["txt() — Text elements"]
        CARD["card() — Content cards"]
        IMG["img() / imgPlaceholder() — Images"]
        INPUT["inputField() — Form inputs"]
        HEADER["header() / topBar() — Navigation"]
        NAVBAR["navBar() — Bottom/Top navigation"]
    end
    
    style TEAL fill:#3D9B9B,color:#fff
    style DTEAL fill:#2C5F5F,color:#fff
    style YELLOW fill:#F5B842,color:#333
    style RED fill:#E84A3D,color:#fff
    style GREEN fill:#33B34D,color:#fff
```

### Shared Helper Functions

Every plugin reuses the same core helper API:

| Function | Purpose | Used In |
|----------|---------|---------|
| `btn(parent, name, x, y, w, h, color, text, fontSize)` | Create styled button with text | All modules |
| `txt(parent, text, x, y, size, color, style)` | Create text element | All modules |
| `card(parent, x, y, w, h, color)` | Create rounded rectangle card | Desktop modules |
| `inputField(parent, x, y, w, h, placeholder)` | Create form input with placeholder | Mobile modules |
| `img(parent, x, y, w, h, url)` | Load real image from URL | Hi-fi modules |
| `imgPlaceholder(parent, x, y, w, h, query)` | Gray box with label | Desktop modules |
| `imgWire(parent, x, y, w, h)` | Gray box with X-cross diagonal | Wireframe modules |
| `btnWire(parent, name, x, y, w, h)` | White button with black border | Wireframe modules |
| `header()` / `topBar()` / `navBar()` | Navigation bars | All modules |
| `notificationBar(parent)` | iPhone status bar (9:41, battery, signal) | Mobile modules |

---

## ⚡ How It Works

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant UI as 🖼️ Plugin UI (ui.html)
    participant JS as ⚙️ Plugin Code (code.js)
    participant F as 🎨 Figma Canvas

    U->>UI: Click "Generate Complete App"
    UI->>JS: postMessage({ type: 'generate' })
    JS->>F: Load fonts (Inter Regular/Bold/Semi Bold)
    JS->>F: Find or create target page ("test" / "App_HF" / "Web_HF")
    
    loop For each screen
        JS->>F: createFrame() with dimensions
        JS->>F: Add header, cards, buttons, text
        JS->>F: Load images via createImageAsync()
        JS->>F: Name interactive elements with "-CLICK" suffix
        JS->>F: Position with x += W + G spacing
    end
    
    JS->>F: notify("✅ Complete!")
    JS->>F: scrollAndZoomIntoView(screens)
```

### Plugin Communication Flow

```
┌─────────────────────┐     postMessage      ┌─────────────────────┐
│                     │    ──────────────►    │                     │
│      ui.html        │    { type: 'generate' }│      code.js        │
│   (Plugin Panel)    │                      │   (Figma Sandbox)   │
│                     │    ◄──────────────    │                     │
│  • "Generate" button│    figma.notify()     │  • Figma API calls  │
│  • Teal/Gold theme  │                      │  • Font loading     │
│  • Feature summary  │                      │  • Screen creation  │
└─────────────────────┘                      └─────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- [Figma Desktop App](https://www.figma.com/downloads/) (or web browser)
- A Figma account

### Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/MaazSohail11/Figma-Screen-generator.git
   ```

2. **Open Figma** and go to: `Plugins → Development → Import plugin from manifest...`

3. **Select a `manifest.json`** from any module folder:
   - `figma - app - high fid/manifest.json` for mobile hi-fi screens
   - `figma - pc/manifest.json` for desktop dashboard screens
   - `app wireframes/manifest.json` for mobile wireframes
   - `pc wireframes/manifest.json` for desktop wireframes
   - `figma - app - Copy/manifest.json` for landing page
   - `figma - app/manifest.json` for extended mobile features

4. **Run the plugin** → Click "🚀 Generate Complete App"

5. **Wait for generation** (may take 30-60 seconds for image-heavy modules)

### Quick Start: Which module to load first?

| Your Goal | Load This Module |
|-----------|-----------------|
| See the complete mobile app | `figma - app - high fid` |
| Design review with stakeholders | `app wireframes` → then `figma - app - high fid` |
| Build merchant/admin dashboards | `figma - pc` |
| Preview screens in browser | Open `figma - pc/pages/index.html` |
| Generate a marketing landing page | `figma - app - Copy` |

---

## 🗺️ Complete Screen Map

### Mobile App Screens (46+)

```mermaid
graph TD
    subgraph "Auth Flow"
        S01["01 Splash"] --> S02["02 Welcome"]
        S02 --> S03["03 Login"]
        S02 --> S08["08 Guest"]
        S03 --> S04["04 Signup"]
        S04 --> S05["05 OTP"]
        S03 --> S06["06 Forgot Password"]
        S06 --> S07["07 Reset Password"]
    end

    subgraph "Core Flow"
        S09["09 Location Permission"] --> S10["10 Location Selector"]
        S10 --> S11["11 Home Dashboard"]
        S11 --> S12["12 Search"]
        S12 --> S13["13 Search Results"]
        S11 --> S14["14 Filters"]
    end

    subgraph "Order Flow"
        S15["15 Restaurant"] --> S16["16 Menu Item"]
        S16 --> S17["17 Cart"]
        S17 --> S18["18 Checkout"]
        S18 --> S19["19 Payment"]
        S19 --> S20["20 Confirmation"]
        S20 --> S21["21 Tracking"]
    end

    subgraph "User Features"
        S30["30 Profile"]
        S31["31 Edit Profile"]
        S32["32 Addresses"]
        S33["33 Wallet"]
        S34["34 Notifications"]
        S35["35 Support"]
        S36["36 Reviews"]
        S37["37 Favorites"]
        S38["38 Settings"]
    end

    S02 --> S09
    S05 --> S09
    S08 --> S09
    S11 --> S15
    S11 --> S30

    style S01 fill:#2C5F5F,color:#fff
    style S11 fill:#F4B942,color:#333
    style S17 fill:#F4B942,color:#333
    style S20 fill:#33B34D,color:#fff
```

### Desktop Dashboard Screens (30+)

| # | Screen Name | Category | Key Features |
|---|-------------|----------|--------------|
| 101 | Admin Dashboard | Admin | Overview, metrics, quick actions |
| 102 | User Management | Admin | CRUD users, search, roles |
| 103 | Restaurant Approvals | Admin | Approve/reject applications |
| 104 | Order Monitoring | Admin | Live order tracking |
| 105 | Platform Settings | Admin | Config & preferences |
| 106 | Reports & Analytics | Admin | Charts, exports |
| 120 | Analytics Dashboard | Merchant | Revenue, orders, trends |
| 121 | Business Registration | Business | Multi-step form |
| 122 | Business Dashboard | Business | Overview, team, invoices |
| 135 | Corporate Discounts | Corporate | Discount rules, checkout preview |
| 136 | Employee Management | Corporate | Add/remove, search, filters |
| 137 | Invoice History | Corporate | Monthly invoices, export |
| 138 | Corporate Account Setup | Corporate | 3-step registration |
| 139 | Corporate Accounts (Admin) | Admin | Manage all corps |
| 142 | Membership & Subscription | Business | Silver/Gold plans |
| 149 | Order Management | Merchant | Active orders, status |
| 150 | Menu Management | Merchant | CRUD menu items |
| 151 | Staff Management | Merchant | Team members |
| 152 | Payouts & Earnings | Merchant | Revenue, withdrawals |
| 153 | Sales Reports | Merchant | Revenue analytics |
| 154 | Review Management | Merchant | Customer reviews |
| 156 | Merchant Dashboard | Merchant | Overview & stats |
| 157 | Restaurant Profile | Merchant | Edit profile |
| 158 | Promotions & Offers | Merchant | Create promos |
| 137 | Community Food Share | Donation | Donation hub |
| 138a | Donate Your Food | Donation | Confirm donation |
| 138b | Select Charity | Donation | Choose organization |
| 138c | Schedule Pickup | Donation | Pickup scheduling |

---

## 🔗 How Wireframes Connect to High-Fidelity

```mermaid
graph LR
    subgraph "Wireframe Layer"
        WF["Lo-Fi Wireframes<br/>Same element names<br/>Black & white"]
    end
    
    subgraph "High-Fidelity Layer"  
        HF["Hi-Fi Screens<br/>Same element names<br/>Full color + images"]
    end
    
    subgraph "HTML Layer"
        HTML["Static HTML Pages<br/>Browser-viewable<br/>Teal/Gold CSS"]
    end

    WF -->|"Identical -CLICK names<br/>Enables prototyping swap"| HF
    HF -->|"Visual mirror<br/>Same layout & data"| HTML

    style WF fill:#f0f0f0,color:#333,stroke:#333,stroke-width:2px
    style HF fill:#3D9B9B,color:#fff,stroke:#F4B942,stroke-width:2px
    style HTML fill:#2C5F5F,color:#fff,stroke:#F4B942,stroke-width:2px
```

**Key Design Decision:** All interactive elements across wireframe and high-fidelity modules share **identical names** (e.g., `LoginBtn-CLICK`, `SearchBar-CLICK`). This means prototyping links created in one layer transfer seamlessly to the other.

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Plugins** | 6 |
| **Total JS Lines** | ~27,000+ |
| **Total Screens (Hi-Fi)** | 76+ (mobile) + 30+ (desktop) |
| **Total Screens (Wireframe)** | 46+ (mobile) + 64+ (desktop) |
| **Total Screens (HTML)** | 29 |
| **Grand Total Screens** | **~200+ unique screens** |
| **Features Covered** | 92+ |
| **User Roles** | Customer, Merchant, Corporate, Admin |
| **Font** | Inter (3 weights) |
| **Color Theme** | Teal (#3D9B9B) + Yellow (#F4B942) |
| **Image Sources** | Unsplash (real images) |

---

## 🛠️ Technical Deep-Dive

### Plugin Manifest Structure

```json
{
  "name": "BasKhao Complete App",
  "id": "999999999",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "ui.html",
  "editorType": ["figma"],
  "networkAccess": {
    "allowedDomains": [
      "https://images.unsplash.com",
      "https://randomuser.me",
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com"
    ]
  }
}
```

### Image Loading Strategy

```javascript
// Hi-Fi: Real images from Unsplash
async function img(parent, x, y, w, h, url) {
  try {
    const image = await figma.createImageAsync(url);
    rect.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
  } catch {
    // Fallback: gray placeholder with emoji
    rect.fills = [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }];
  }
}

// Wireframe: Gray box with X-cross
function imgWire(parent, x, y, w, h) {
  // Gray rectangle + diagonal lines forming an X
}
```

### Screen Positioning Algorithm

```javascript
// Mobile: Linear horizontal layout
let x = 0;
const W = 375, H = 812, G = 100;
// Each screen: x += W + G

// Desktop: Grid layout with rows
let rowY = 0, colX = 0;
const W = 1440, H = 900, G = 150, ROW_GAP = 200;
// New row: colX = 0; rowY += H + ROW_GAP;
```

---

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/new-screen`)
3. Add your screen code to the appropriate `code.js`
4. Follow the naming convention: `ScreenName-CLICK` for interactive elements
5. Commit your changes (`git commit -m 'Add new screen: Feature Name'`)
6. Push to the branch (`git push origin feature/new-screen`)
7. Open a Pull Request

---

## 📄 License

This project is open source and available for educational and commercial use.

---

<p align="center">
  <b>BasKhao © 2025 — Food Delivery Platform</b><br/>
  <sub>Built with ❤️ using the Figma Plugin API</sub>
</p>
