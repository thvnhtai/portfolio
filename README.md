# Portfolio - Senior Frontend Engineer

Production-ready portfolio website for Senior Frontend Engineer with modern and professional UI/UX.

## 🚀 Quick Start

### First Time Setup

1. **Run setup script:**
   ```bash
   ./setup.sh
   ```

2. **Or follow manual setup:**
   - See [QUICK_START.md](./QUICK_START.md) for quick commands
   - See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Live Site

Your portfolio will be available at:
- **Custom Domain**: `https://thvnhtai.app` (after DNS configuration)
- **GitHub Pages**: `https://yourusername.github.io/portfolio/` (after setup)

## 📋 Setup Checklist

- [ ] Run `./setup.sh` or follow [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Enable GitHub Pages (Source: GitHub Actions)
- [ ] Configure DNS in Name.com (see [DOMAIN_SETUP.md](./DOMAIN_SETUP.md))
- [ ] Add custom domain in GitHub Pages settings
- [ ] Verify deployment at `https://thvnhtai.app`

## 🚀 Deployment

This portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Quick Setup

1. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select **Source**: **GitHub Actions**

2. **Push to main branch**:
   ```bash
   git push origin main
   ```

3. **Deployment happens automatically!**

Your site will be available at:
- **Custom Domain**: `https://thvnhtai.app` (after DNS configuration)
- **GitHub Pages**: `https://yourusername.github.io/portfolio/`

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

For custom domain setup with Name.com, see [DOMAIN_SETUP.md](./DOMAIN_SETUP.md)

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **CSS3** - Custom styling with CSS variables
- **Modern JavaScript** - ES6+ features

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Hero.jsx          # Hero section
│   │   ├── About.jsx         # About section
│   │   ├── Skills.jsx        # Skills section
│   │   ├── Projects.jsx      # Projects showcase
│   │   ├── Experience.jsx    # Work experience
│   │   ├── Contact.jsx       # Contact form
│   │   └── Navigation.jsx    # Navigation bar
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── index.css            # Global styles
│   └── main.jsx             # Entry point
├── public/
│   └── CNAME                # Custom domain configuration
├── .github/
│   └── workflows/
│       ├── deploy.yml        # Deployment workflow
│       └── ci.yml            # CI workflow
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
└── setup.sh                 # Setup script
```

## 🎨 Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --color-accent: #00d9ff;
  --color-bg: #0a0a0a;
  /* ... */
}
```

### Content

Update content in component files:
- `src/components/Hero.jsx` - Hero section content
- `src/components/About.jsx` - About section
- `src/components/Skills.jsx` - Skills and technologies
- `src/components/Projects.jsx` - Projects list
- `src/components/Experience.jsx` - Work experience
- `src/components/Contact.jsx` - Contact information

### Fonts

Change fonts in `index.html` and CSS variables.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 Documentation

- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup guide from scratch
- [QUICK_START.md](./QUICK_START.md) - Quick reference commands
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment details
- [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) - Custom domain configuration

## 📄 License

MIT License - feel free to use this template for your portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
