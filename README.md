# Waqas Ahmad Portfolio - Vue.js SPA

A modern, responsive portfolio website built with Vue.js 3 and Vite, converted from the original HTML portfolio to a Single Page Application (SPA).

## 🚀 Features

- **Vue.js 3** with Composition API
- **Vue Router** for SPA navigation
- **Vite** for fast development and building
- **Responsive Design** with Bootstrap
- **Component-based Architecture** for maintainability
- **Modern CSS** with gradients and animations
- **SEO Optimized** with proper meta tags

## 📁 Project Structure

```
portfolio-vue/
├── public/
│   └── assets/
│       ├── img/          # Images and icons
│       └── vendor/       # Third-party libraries
├── src/
│   ├── components/       # Vue components
│   │   ├── Hero.vue
│   │   ├── About.vue
│   │   ├── Stats.vue
│   │   ├── Skills.vue
│   │   ├── Resume.vue
│   │   ├── Portfolio.vue
│   │   ├── Services.vue
│   │   ├── Testimonials.vue
│   │   ├── Contact.vue
│   │   ├── Navigation.vue
│   │   └── Footer.vue
│   ├── views/            # Page views
│   │   ├── Home.vue
│   │   ├── About.vue
│   │   ├── Portfolio.vue
│   │   ├── Services.vue
│   │   └── Contact.vue
│   ├── router/           # Vue Router configuration
│   │   └── index.js
│   ├── assets/           # CSS and other assets
│   │   └── css/
│   ├── App.vue           # Main app component
│   └── main.js           # App entry point
├── index.html            # Main HTML file
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── README.md
```

## 🛠️ Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd C:\inetpub\portfolio\portfolio-vue
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📱 Pages & Routes

- `/` - Home page (all sections)
- `/about` - About section only
- `/portfolio` - Portfolio section only
- `/services` - Services section only
- `/contact` - Contact section only

## 🎨 Components

### Main Components
- **Hero** - Landing section with animated text
- **About** - Personal information and profile
- **Stats** - Professional statistics with counters
- **Skills** - Technical skills with progress bars
- **Resume** - Work experience and education
- **Portfolio** - Project showcase
- **Services** - Offered services
- **Testimonials** - Client feedback
- **Contact** - Contact form and information

### Layout Components
- **Navigation** - Responsive navigation menu
- **Footer** - Footer with social links and contact info

## 🔧 Customization

### Adding New Sections
1. Create a new component in `src/components/`
2. Add it to the Home view in `src/views/Home.vue`
3. Update the navigation in `src/components/Navigation.vue`
4. Add route in `src/router/index.js` if needed

### Styling
- Main styles are in `src/assets/css/main.css`
- Component-specific styles use scoped CSS
- Bootstrap classes are available for layout

### Content Updates
- Update component data in respective Vue files
- Images are stored in `public/assets/img/`
- Icons use Bootstrap Icons

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Waqas Ahmad**
- Senior Software Engineer & Technical Lead
- Email: devwithwaqas@gmail.com
- Phone: +60146806067
- Location: Selangor, Malaysia

## 🚀 Deployment

The built files in the `dist/` directory can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- Azure Static Web Apps
- AWS S3 + CloudFront

---

*Built with ❤️ using Vue.js 3 and modern web technologies*
