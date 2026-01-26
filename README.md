# HelloWorld Vue App

A Vue 3 application that displays a personalized greeting based on user input.

## Requirements Implementation

### E-001: HelloWorld Entry Form (WelcomePage)

| Requirement | Description | Status |
|-------------|-------------|--------|
| E-001-F-006 | Form validation (required fields for Name and Date) | ✅ Implemented |
| E-001-F-007 | Error handling and user feedback | ✅ Implemented |

### E-003: HelloWorld Response Page

| Requirement | Description | Status |
|-------------|-------------|--------|
| E-003-F-001 | Capture form data (Name, Date) from WelcomePage | ✅ Implemented |
| E-003-F-002 | Page header "HelloWorld Response" | ✅ Implemented |
| E-003-F-003 | Dynamic greeting "Hello [Name], the date is [Date]" | ✅ Implemented |
| E-003-F-004 | Back navigation button to return to form | ✅ Implemented |
| E-003-F-005 | Validation of retrieved data | ✅ Implemented |
| E-003-F-006 | Error handling (direct access, missing data, timeout) | ✅ Implemented |
| E-003-F-007 | Responsive layout for all screen sizes | ✅ Implemented |

### DS-XX3: H1 Component Standard

| Requirement | Description | Status |
|-------------|-------------|--------|
| DS-XX3 | Reusable H1Header component with consistent styling | ✅ Implemented |

## Tech Stack (TS-001)

| Technology | Version | Notes |
|------------|---------|-------|
| Vue | 3.5.24 | Composition API with `<script setup>` |
| Vite | 7.2.4 | Build tool and dev server |
| Vue Router | 4.3.0 | Client-side routing |
| JavaScript | ES6+ | No TypeScript |

## Features

- **WelcomePage**: Entry form with Name and Date fields
  - Real-time validation on blur
  - Input sanitization (XSS prevention)
  - Accessible form with ARIA attributes
  - Disabled submit until valid

- **ResponsePage**: Personalized greeting display
  - Dynamic greeting message
  - Session timeout handling (30 minutes)
  - Data summary display
  - Back navigation

- **Responsive Design**: Optimized for all screen sizes
  - Desktop (> 768px)
  - Tablet (481px - 768px)
  - Mobile (≤ 480px)

- **Accessibility**: WCAG compliant
  - Semantic HTML elements
  - ARIA labels and roles
  - Focus management
  - Error announcements

## Project Structure

```
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
└── src/
    ├── main.js                # App entry point
    ├── App.vue                # Root component
    ├── assets/
    │   └── styles.css         # Global styles (DS-XX3)
    ├── components/
    │   └── H1Header.vue       # DS-XX3 H1 component
    ├── router/
    │   └── index.js           # Vue Router config
    └── views/
        ├── WelcomePage.vue    # E-001 Entry form
        └── ResponsePage.vue   # E-003 Response page
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd helloworld-vue-app

# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Standards Compliance

This project adheres to:

- **TS-001**: Technology stack requirements
- **DS-XX3**: Design system H1 component standard
- **E-001**: HelloWorld Entry Form requirements
- **E-003**: HelloWorld Response Page requirements

## License

Private - All rights reserved
