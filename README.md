# HelloWorld Vue App

A Vue 3 application with Vite that displays a personalized greeting.

## Features

- **WelcomePage**: Entry form with Name and Date fields with validation
- **ResponsePage**: Displays personalized greeting with error handling
- Responsive design for all screen sizes
- Form validation and sanitization
- Session management and error handling

## Tech Stack

- Vue 3.5.24 (Composition API)
- Vite 7.2.4
- Vue Router 4.x
- JavaScript (no TypeScript)

## Getting Started

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

## Project Structure

```
src/
├── main.js              # App entry point
├── App.vue              # Root component
├── assets/
│   └── styles.css       # Global styles
├── components/
│   └── H1Header.vue     # Reusable H1 component (DS-XX3)
├── router/
│   └── index.js         # Vue Router configuration
└── views/
    ├── WelcomePage.vue  # Entry form page
    └── ResponsePage.vue # Greeting response page
```