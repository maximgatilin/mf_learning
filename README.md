# 🚀 Webpack + React Boilerplate with Microfrontends

A modern, production-ready boilerplate for building React applications with Webpack 5, featuring **Module Federation** for microfrontend architecture.

## ✨ Features

- ⚡ **Hot Module Replacement (HMR)** - Instant updates during development
- 🔧 **Webpack 5** - Latest webpack with modern configuration
- ⚛️ **React 18** - Latest React with hooks support
- 🎨 **Modern CSS** - CSS loaders with hot reloading
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Development Server** - Built-in dev server with auto-reload
- 🏗️ **Production Build** - Optimized builds for production
- 🧩 **Microfrontends** - Module Federation for distributed frontend architecture

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or download this project**
2. **Install dependencies for both host and remote:**
   ```bash
   npm run install:all
   ```
   
   This will install dependencies for:
   - The host application (main app)
   - The remote microfrontend (remote-character)

### Development

#### Running with Microfrontends

**Start both host and remote microfrontends:**
```bash
npm run start:all
```

This will:
- Start the host application on `http://localhost:3000`
- Start the remote microfrontend on `http://localhost:3001`
- Enable hot module replacement for both
- The host will consume the Character component from the remote

**Start only the host application:**
```bash
npm run start:host
```

**Start only the remote microfrontend:**
```bash
npm run start:remote
```

**Note:** For the microfrontend architecture to work, you need both servers running. The host application will load the Character component from the remote microfrontend at `http://localhost:3001`.

### Production Build

**Build both host and remote for production:**
```bash
npm run build:all
```

This creates optimized `dist` folders for both:
- Host application: `./dist`
- Remote microfrontend: `./remote-character/dist`

**Build only the host:**
```bash
npm run build
```

**Build only the remote:**
```bash
npm run build:remote
```

## 📁 Project Structure

```
project_1/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main React component (Host)
│   ├── index.js            # React entry point
│   └── styles.css          # Global styles
├── remote-character/       # Remote Microfrontend
│   ├── public/
│   │   └── index.html      # Remote HTML template
│   ├── src/
│   │   ├── Character.js    # Character component (exposed as remote)
│   │   └── index.js        # Remote entry point
│   ├── package.json        # Remote dependencies
│   └── webpack.config.js   # Remote webpack config with Module Federation
├── .babelrc                # Babel configuration
├── package.json            # Host dependencies and scripts
├── webpack.config.js       # Host webpack config with Module Federation
└── README.md               # This file
```

## 🧩 Microfrontend Architecture

This project demonstrates **Webpack Module Federation**, a powerful feature that allows you to build distributed frontend applications where different parts can be developed, deployed, and run independently.

### How It Works

1. **Host Application** (Main App)
   - Runs on `http://localhost:3000`
   - Consumes components from remote microfrontends
   - Configured in `webpack.config.js` with `ModuleFederationPlugin`
   - Declares remotes it wants to consume

2. **Remote Microfrontend** (remote-character)
   - Runs on `http://localhost:3001`
   - Exposes the `Character` component
   - Can be developed and deployed independently
   - Configured in `remote-character/webpack.config.js`

### Module Federation Configuration

#### Host Configuration (`webpack.config.js`)
```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    remoteCharacter: 'remoteCharacter@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
  },
})
```

#### Remote Configuration (`remote-character/webpack.config.js`)
```javascript
new ModuleFederationPlugin({
  name: 'remoteCharacter',
  filename: 'remoteEntry.js',
  exposes: {
    './Character': './src/Character',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
  },
})
```

### Using Remote Components

In the host application (`src/App.js`), the remote component is imported using React.lazy:

```javascript
const Character = React.lazy(() => import('remoteCharacter/Character'));

// Used with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Character {...props} />
</Suspense>
```

### Benefits of Microfrontends

- ✅ **Independent Development** - Teams can work on different microfrontends independently
- ✅ **Independent Deployment** - Deploy updates to one microfrontend without affecting others
- ✅ **Technology Flexibility** - Different microfrontends can use different frameworks (though this example uses React)
- ✅ **Code Sharing** - Shared dependencies (React, React-DOM) are loaded once
- ✅ **Scalability** - Easier to scale teams and applications

## 🛠️ Configuration

### Webpack Configuration

The webpack configuration includes:
- **Module Federation Plugin** - Enables microfrontend architecture
- Babel loader for JS/JSX files
- CSS loader for styling
- HTML webpack plugin for HTML generation
- Development server configuration
- Hot module replacement
- CORS headers for cross-origin module loading

### Babel Configuration

Babel is configured to support:
- Modern JavaScript features
- React JSX syntax
- Latest browser compatibility

## 🎨 Customization

### Adding New Components

1. Create new `.js` or `.jsx` files in the `src` directory
2. Import and use them in `App.js` or other components
3. The development server will automatically reload

### Styling

- Global styles go in `src/styles.css`
- Component-specific styles can be imported directly
- CSS modules are supported out of the box

### Adding Dependencies

```bash
npm install package-name
```

## 📱 Browser Support

This boilerplate supports all modern browsers and includes:
- ES6+ features
- CSS Grid and Flexbox
- Modern CSS properties

## 🚀 Deployment

### Host Application
After building with `npm run build`, the `dist` folder contains:
- Optimized JavaScript bundle
- Minified CSS
- HTML file ready for deployment

### Remote Microfrontend
After building with `npm run build:remote`, the `remote-character/dist` folder contains:
- `remoteEntry.js` - The entry point for Module Federation
- Optimized JavaScript bundle
- HTML file (for standalone testing)

### Deployment Strategy

1. **Deploy Remote First**: Deploy the remote microfrontend to its own server/domain
2. **Update Host Configuration**: Update the remote URL in `webpack.config.js` to point to the production URL
3. **Deploy Host**: Deploy the host application

Example production configuration:
```javascript
remotes: {
  remoteCharacter: 'remoteCharacter@https://your-cdn.com/remote-character/remoteEntry.js',
}
```

Both applications can be deployed to:
- Static hosting services (Netlify, Vercel, AWS S3)
- CDN services
- Traditional web servers

## 🤝 Contributing

Feel free to customize this boilerplate for your needs:
- Modify the webpack configuration
- Add new loaders or plugins
- Update the React components
- Customize the styling

## 📄 License

MIT License - feel free to use this boilerplate for any project.

---

**Happy coding! 🎉**
