# Ceylonspizee Global - B2B Static Website

A publish-ready static website for Ceylonspizee Global, a premium Sri Lankan spice and Oud oil export company.

## Overview

This website showcases Ceylonspizee Global's B2B export services with 7 interconnected pages:

- **Home** (`index.html`) - Hero landing page with value propositions, product showcase, and contact form
- **Products** (`products.html`) - Export catalog with filtering and seasonal harvest calendar
- **Our Story** (`our-story.html`) - Heritage, mission, and ethical sourcing journey
- **Portal** (`digital-traceability-agricultural-exports.html`) - Digital partner portal features and traceability tools
- **Sustainability** (`sustainability.html`) - Regenerative agriculture and fair trade practices
- **Insights** (`insights.html`) - Market reports, technical briefings, and industry expertise
- **Contact** (`contact.html`) - B2B partnership inquiry form with FAQ section

## Website Structure

```
stitch_ceylonspizee_global_b2b_website/
├── index.html          # Homepage (entry point)
├── products.html       # Product catalog
├── our-story.html      # About / Heritage page
├── digital-traceability-agricultural-exports.html # Digital partner portal
├── sustainability.html # Sustainability & ethics
├── insights.html       # Market insights & reports
├── contact.html        # Contact & inquiry form
└── README.md           # This file
```

## Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Google Fonts** - Newsreader & Be Vietnam Pro typography
- **Material Symbols** - Icon system
- **No JavaScript dependencies** - Pure HTML/CSS for maximum performance

## Design System

### Colors
- **Primary**: `#603308` (Deep Cinnamon Brown)
- **Primary Container**: `#7c4a1e`
- **Tertiary**: `#004930` (Forest Green)
- **Background**: `#fcf9f8` (Organic Cream)
- **Surface**: `#fcf9f8`
- **On Surface**: `#1b1b1b` (Charcoal)

### Typography
- **Headlines**: Newsreader (serif, editorial feel)
- **Body/UI**: Be Vietnam Pro (clean, modern sans-serif)
- **Labels**: Be Vietnam Pro Bold

## Deployment

### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:

1. **Netlify**: Drag & drop the folder to [netlify.com](https://netlify.com)
2. **Vercel**: Use `vercel --prod` CLI or import from Git
3. **GitHub Pages**: Push to a repository and enable Pages
4. **AWS S3**: Upload files to an S3 bucket with static hosting
5. **Cloudflare Pages**: Connect Git repository or upload directly

### Option 2: Local Preview

Simply open `index.html` in any modern web browser:

```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Or use a local server for better development experience:

```bash
# Python 3
python -m http.server 8000

# Node.js (with npx)
npx serve .

# PHP
php -S localhost:8000
```

## Features

### Cross-Page Navigation
All pages include a consistent navigation header with:
- Logo linking to homepage
- Main navigation menu (Home, Products, Our Story, Portal, Sustainability, Insights)
- Contact/Partnership CTA button
- Mobile-responsive hamburger menu (CSS-based)

### SEO Optimizations
- Semantic HTML5 structure
- Meta descriptions for each page
- Alt text for all images
- Proper heading hierarchy (H1 → H2 → H3)

### Performance
- Single-file architecture (no external CSS/JS files)
- Tailwind CSS via CDN with specific configuration
- Optimized image loading (Google hosted images)
- No render-blocking resources

### Accessibility
- ARIA labels on interactive elements
- Keyboard-navigable forms and links
- Sufficient color contrast ratios
- Focus indicators on interactive elements

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Customization

### Changing Colors
Edit the Tailwind config in each HTML file:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: "#603308",
                // ... other colors
            }
        }
    }
}
```

### Updating Contact Information
Edit the contact details in:
- `index.html` (footer contact section)
- `contact.html` (contact cards and form)
- All page footers

### Adding New Products
Edit `products.html` and add new product cards following the existing pattern:

```html
<article class="spice-grid-item bg-white flex flex-col group overflow-hidden">
    <!-- Product content -->
</article>
```

## Credits

- **Design System**: Material Design 3 (Material You)
- **Typography**: Google Fonts (Newsreader, Be Vietnam Pro)
- **Icons**: Material Symbols by Google
- **Images**: AI-generated product photography

## License

© 2024 Ceylonspizee Global. All rights reserved.

This website is proprietary and confidential. Unauthorized copying, distribution, or modification is prohibited.

## Support

For technical support or feature requests, contact:
- Email: export@ceylonspizee.com
- WhatsApp: +94 77 123 4567
