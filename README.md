# Hello World Vue 3 Application

A modern Vue 3 application featuring a name entry form with validation and a personalized greeting response page.

## Features

- **HelloWorld Entry Form (E-001)**: Interactive form with real-time validation
- **HelloWorld Response Page (E-003)**: Personalized greeting display
- Form validation with meaningful error messages
- Responsive design for mobile, tablet, and desktop
- Accessibility compliant (ARIA labels, keyboard navigation)
- Error handling with graceful fallbacks

## Tech Stack

- **Vue**: 3.5.24
- **Vite**: 7.2.4
- **Vue Router**: 4.2.5
- **Axios**: 1.6.2
- **Chart.js**: 4.4.1
- **Language**: JavaScript (ES6+)

## Project Structure

```
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.js             # Vue app initialization
│   ├── App.vue             # Root component
│   ├── assets/
│   │   └── styles.css      # Global styles
│   ├── components/
│   │   ├── HelloWorldForm.vue      # Entry form component
│   │   └── HelloWorldResponse.vue  # Response page component
│   └── router/
│       └── index.js        # Vue Router configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

## Usage

1. Open the application in your browser (default: http://localhost:3000)
2. Enter your name in the form
3. Click "Say Hello" to see your personalized greeting
4. Use "Enter Another Name" to return to the form

## Form Validation Rules

- Name is required
- Minimum 2 characters
- Maximum 50 characters
- Only letters, spaces, hyphens, and apostrophes allowed

## Accessibility

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management
- Reduced motion support
- High contrast mode support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

