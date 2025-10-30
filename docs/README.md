# AuraArbora - Lifestyle Blog Website

A beautiful, soft-toned lifestyle blog featuring curated content across six categories: Fashion & Accessories, Health & Beauty, Home & Garden, Travel & Accommodation, Finance & Insurance, and Food & Beverage.

## 🌸 Design Features

- **Morandi Color Palette**: Soft, low-saturation colors creating a warm and cozy atmosphere
- **Rounded Corners**: Gentle, friendly design with rounded elements
- **Smooth Animations**: Delicate transitions and hover effects
- **Fully Responsive**: Mobile-first design that works on all devices

## 📁 Project Structure

```
AuraArbora/
├── index.html              # Home page
├── article.html            # Article detail page
├── category.html           # Category listing page
├── about.html              # About page
├── contact.html            # Contact page
├── privacy.html            # Privacy Policy page
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── article.css         # Article page styles
│   └── page.css            # About & Contact page styles
├── js/
│   ├── main.js             # Main JavaScript
│   └── article.js          # Article page JavaScript
├── data/
│   └── articles.json       # Article content data
└── README.md               # This file
```

## 🚀 Getting Started

### Local Development

1. **Clone or download this repository**

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Access the website**
   - Direct: Open `index.html` in your browser
   - Local server: Navigate to `http://localhost:8000`

### No Build Process Required

This is a static website that requires no build process or dependencies. All files are ready to use out of the box!

## 📚 Features

### Home Page (`index.html`)
- Hero section with AuraArbora branding
- Category cards for easy navigation
- Latest articles display with pagination
- Newsletter subscription form
- Footer with social media links

### Article Pages (`article.html`)
- Full article content with images
- Product recommendations with details
- Social sharing buttons
- Related articles section

### Category Pages (`category.html`)
- Filtered articles by category
- Category-specific descriptions
- All standard blog features (search, pagination)

### About Page (`about.html`)
- Brand story and mission
- Core values showcase
- Team member profiles
- Call-to-action sections

### Contact Page (`contact.html`)
- Contact form with validation
- Contact information cards
- FAQ section
- Social media links

### Privacy Policy Page (`privacy.html`)
- Comprehensive privacy policy
- Information collection practices
- Cookie policy
- User rights and choices
- GDPR compliance information

## 🎨 Color Palette

```css
Primary: #E8D5D3 (Soft Pink)
Secondary: #D4C4C0 (Dusty Mauve)
Accent: #C4A29E (Rose Taupe)
Sage Green: #B8C4B8
Dusty Blue: #C4D4D9
Soft Peach: #EDD5CC
```

## 📝 Content

The website includes 6 sample articles covering all categories:

1. **Food & Beverage**: Artisan Coffee Culture Guide (January 2025)
2. **Fashion**: Essential Wardrobe Staples for Spring 2025 (March 2025)
3. **Home & Garden**: Creating Your Dream Garden (April 2025)
4. **Beauty**: Natural Skincare Routines (May 2025)
5. **Travel**: Boutique Hotels Worth Discovering (June 2025)
6. **Finance**: Building Wealth in Your 30s (August 2025)

Each article features:
- High-quality images from Unsplash
- Detailed content (1500+ words)
- Product recommendations
- Professional photography

## 🔧 Customization

### Adding New Articles

Edit `data/articles.json` and add a new article object:

```json
{
  "id": 6,
  "title": "Your Article Title",
  "slug": "your-article-slug",
  "category": "fashion",
  "date": "2025-09-15",
  "author": "Author Name",
  "image": "https://images.unsplash.com/...",
  "excerpt": "Short description...",
  "content": "<p>Full HTML content...</p>",
  "products": [...]
}
```

### Changing Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
  --primary-color: #E8D5D3;
  --accent-color: #C4A29E;
  /* ... other colors */
}
```

### Modifying Content

- **Logo**: Edit the SVG in the header section of HTML files
- **Contact Info**: Update footer sections in all HTML files
- **Social Links**: Modify social media URLs in the footer

## 🌐 Deployment

### GitHub Pages

1. Create a repository on GitHub
2. Upload all files
3. Go to Settings > Pages
4. Select main branch as source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

### Netlify

1. Drag and drop the entire folder to Netlify
2. Your site will be live instantly

### Other Static Hosts

This website works with any static file hosting service:
- Vercel
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is free to use for personal and commercial purposes.

## 🙏 Credits

- **Fonts**: Google Fonts (Poppins, Playfair Display)
- **Icons**: Font Awesome 6
- **Images**: Unsplash
- **Design**: Custom Morandi-inspired color palette

## 📧 Support

For questions or suggestions, visit the contact page or email: hello@auraarbora.com

---

**AuraArbora** - Your cozy corner for lifestyle inspiration 🌸

