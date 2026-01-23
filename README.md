# Hello World Vue 3 Application

A responsive Vue 3 application demonstrating form handling, input validation, and dynamic content display using the Alberta Design System typography and styling guidelines.

## Features

### E-003: HelloWorld Response Page

- **E-003-F-001**: Form data capture with name input
- **E-003-F-002**: Page header display with clear titles and descriptions
- **E-003-F-003**: Dynamic greeting message personalized with user's name
- **E-003-F-004**: Back navigation button for seamless user flow
- **E-003-F-005**: Input validation and sanitization for security
- **E-003-F-006**: Comprehensive error handling with user feedback
- **E-003-F-007**: Responsive layout supporting mobile, tablet, and desktop

### E-002: UI Design Requirements

- Alberta Design System typography integration
- Consistent color palette using CSS custom properties
- Accessible focus states and keyboard navigation
- Reduced motion support for accessibility
- High contrast mode compatibility

## Tech Stack

- **Vue**: 3.5.24 (Composition API with `<script setup>`)
- **Vue Router**: 4.2.5
- **Vite**: 5.2.4
- **JavaScript**: ES6+ (No TypeScript)

## Project Structure

```
hello-world-app/
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.js             # Application entry point
│   ├── App.vue             # Root component
│   ├── assets/
│   │   └── styles.css      # Global styles (Alberta Design System)
│   ├── router/
│   │   └── index.js        # Vue Router configuration
│   └── views/
│       ├── WelcomePage.vue # Name input form page
│       └── ResponsePage.vue # Greeting display page
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

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

### Development Server

The development server runs on `http://localhost:3000` by default.

## Pages

### WelcomePage (`/`)

The landing page featuring:
- Welcome header with instructions
- Name input form with validation
- Real-time error feedback
- Submit button with loading state

**Validation Rules:**
- Name is required
- Minimum 2 characters
- Maximum 50 characters
- Only letters, spaces, hyphens, and apostrophes allowed

### ResponsePage (`/response`)

The greeting page featuring:
- Personalized greeting with animated wave icon
- Formatted display of entered name
- Timestamp of greeting
- Copy greeting to clipboard functionality
- Back navigation button

## Accessibility Features

- Skip link for keyboard navigation
- ARIA labels and descriptions
- Focus management
- Screen reader support
- Reduced motion media query support
- High contrast mode support
- Semantic HTML structure

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License.
