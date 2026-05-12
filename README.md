# 🌺 Hoku Hana Drinks

> [!TIP]
> This project is ✨ **vibe coded** ✨ and deployed using the [heredotnow](https://github.com/Antigravity-AI/heredotnow) skill.

Hoku Hana Drinks is a premium, tropical-themed Hawaiian drink ordering experience. Built with a focus on rich aesthetics, vibrant gradients, and fluid interactions, it captures the "sun-bright flavors, moon-cool sips" energy of an island adventure.

The application is engineered for a seamless experience across all devices, with dedicated optimizations for ultra-mobile screens (down to 320px), and features a sophisticated cart system allowing for complex, multi-item customizations.

---

## ✨ Key Features

- **🏝️ Tropical Catalog**: Explore a curated list of illustrated island coolers, each inspired by specific Hawaiian islands and flavors.
- **🥤 Sophisticated Customization**:
  - Fine-tune every drink: Size, ice levels, sweetness, and milk alternatives.
  - Layer your experience with multiple toppings and premium add-ons.
  - **Duplicate & Branch**: Add the same drink multiple times and use the "Duplicate" feature to create independent variations for different tastes.
- **💸 Real-time Pricing Engine**: Instant calculation of unit prices, line-item subtotals, service fees, and promotional discounts.
- **🎟️ Promotion System**: Robust support for varied promo codes, including percentage discounts, fixed-amount savings, and service fee waivers.
- **🧾 Receipt-Style History**: A playful, receipt-inspired order history that tracks every customization and payment detail.
- **📱 Ultra-Responsive UX**: Hand-crafted media queries ensure a premium feel on everything from wide desktops to the narrowest mobile devices (320px+).
- **💾 Local Persistence**: Your island journey is saved; cart items and order history persist across sessions using `localStorage`.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & Static Export)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type-safe island logic
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & Modern CSS Media Queries
- **State Management**: React Context API for a unified order store
- **Architecture**: Component-based design with a focus on reusability and performance
- **Deployment**: Automated via the `heredotnow` skill to [here.now](https://here.now)

---

## 🚀 Getting Started

### Local Development

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the dev server**:

   ```bash
   npm run dev
   ```

3. **Visit the island**:
   Open `http://localhost:3000` in your browser.

### Deployment

This project is deployed to **here.now** using the `heredotnow` skill. You can deploy the project manually with the following command:

```bash
npm run deploy
```

This script automatically builds the static site and publishes the `out` directory using the `publish-herenow.js` script:

```bash
# The underlying steps are:
npm run build
npm run publish
```

