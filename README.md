# Matthew Muiter's Portfolio

A modern, responsive portfolio website built with React 18, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern React 18** with TypeScript for type safety
- **Responsive Design** that works on all devices
- **Smooth Animations** with Framer Motion
- **Image Gallery** with React Photo View for project showcases
- **Modern Build Tool** using Vite for fast development
- **Tailwind CSS** for utility-first styling
- **Accessibility** focused with proper ARIA labels and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Image Gallery**: React Photo View
- **Fonts**: Google Fonts (Hepta Slab, Muli)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/muiter/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Building for Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── img/               # Project images
│   └── vite.svg           # Favicon
├── src/
│   ├── components/        # React components
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Experience.tsx
│   │   ├── Navigation.tsx
│   │   └── Projects.tsx
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js` under the `colors.primary` section.

### Content
Update the content in the respective component files:
- `src/components/About.tsx` - Personal information
- `src/components/Experience.tsx` - Work experience
- `src/components/Projects.tsx` - Project showcases
- `src/components/Education.tsx` - Educational background

### Images
Add your project images to the `public/img/` directory and update the image paths in the Projects component.

## 📱 Responsive Design

The portfolio is fully responsive with:
- Mobile-first approach
- Collapsible navigation sidebar
- Responsive typography
- Flexible image galleries

## ♿ Accessibility

The application includes:
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly content

## 🚀 Deployment

### GitHub Pages (Recommended)

This portfolio is configured for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: Push to the `main` branch and GitHub Actions will automatically build and deploy
2. **Manual Deployment**: Run `./deploy.sh` to build locally, then push the changes
3. **Site URL**: https://muiter.github.io/portfolio/

### Other Hosting Services

The application can also be deployed to other static hosting services:

1. Build the application: `npm run build`
2. Upload the `dist/` folder to your hosting service

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## 📄 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

Matthew Muiter - Front-end Engineer passionate about creating delightful user experiences.