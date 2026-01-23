# HelloWorld Application

A Vue 3 application built with Government of Alberta Design System standards, featuring form validation, accessibility compliance (WCAG 2.1 AA), and comprehensive testing.

## Tech Stack

- **Framework**: Vue 3.5.24 (Composition API)
- **Build Tool**: Vite 6.0
- **Routing**: Vue Router 4.4
- **HTTP Client**: Axios 1.7
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint with Vue 3 recommended rules
- **Formatting**: Prettier
- **Language**: JavaScript (ES2022+)

## Features

### Welcome Page
- Name input field (required, min 2 characters)
- Date input field (required)
- Real-time form validation with accessible error messages
- Submit button with loading state

### Response Page
- Personalized greeting message
- Formatted date display (Canadian locale)
- Back navigation button
- Empty state handling with redirect

### Standards Compliance
- **WCAG 2.1 AA** accessibility compliance
- **Alberta Design System** color tokens and components
- **Semantic HTML** structure
- **Keyboard navigation** support
- **Screen reader** optimized

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run tests

```bash
npm run test
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Lint code

```bash
npm run lint
```

### Format code

```bash
npm run format
```

## Project Structure

```
src/
├── __tests__/                    # Test files
│   ├── components/
│   │   ├── BaseButton.test.js
│   │   └── BaseInput.test.js
│   └── composables/
│       ├── useDateFormatter.test.js
│       └── useFormValidation.test.js
├── components/                   # Reusable components
│   ├── index.js                  # Barrel export
│   ├── layout/
│   │   ├── index.js
│   │   ├── AppHeader.vue         # Application header
│   │   ├── AppFooter.vue         # Application footer
│   │   └── SkipLink.vue          # Accessibility skip link
│   └── ui/
│       ├── index.js
│       ├── BaseButton.vue        # Button component
│       ├── BaseCard.vue          # Card container
│       └── BaseInput.vue         # Form input component
├── composables/                  # Vue composition functions
│   ├── index.js
│   ├── useDateFormatter.js       # Date formatting utilities
│   └── useFormValidation.js      # Form validation logic
├── constants/
│   └── index.js                  # App constants & config
├── router/
│   └── index.js                  # Vue Router configuration
├── views/
│   ├── WelcomePage.vue           # Entry form page
│   └── ResponsePage.vue          # Greeting display page
├── App.vue                       # Root component
├── main.js                       # Application entry point
└── style.css                     # Global styles
```

## Alberta Design System Colors

| Token | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| GOA Blue | #0070C4 | `--goa-blue` | Primary actions, links |
| GOA Blue Dark | #004F84 | `--goa-blue-dark` | Headings, hover states |
| GOA Gold | #F1B434 | `--goa-gold` | Accents, highlights |
| GOA Red | #E31C3D | `--goa-red` | Errors, required indicators |
| GOA Grey Dark | #333333 | `--goa-grey-dark` | Body text |
| GOA Grey | #666666 | `--goa-grey` | Secondary text |
| GOA Grey Light | #F1F1F1 | `--goa-grey-light` | Backgrounds |

## Accessibility Features

- **Skip Navigation**: Skip link for keyboard users (WCAG 2.4.1)
- **Focus Management**: Visible focus indicators on all interactive elements
- **Error Handling**: ARIA live regions for form validation errors
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Touch Targets**: Minimum 48px touch targets for mobile
- **Color Contrast**: WCAG AA compliant color combinations
- **Screen Reader Support**: Proper ARIA labels and descriptions

## Component Usage

### BaseButton

```vue
<BaseButton variant="primary" @click="handleClick">
  Submit
</BaseButton>

<BaseButton variant="secondary" :loading="isLoading">
  Save
</BaseButton>
```

### BaseInput

```vue
<BaseInput
  v-model="name"
  label="Full Name"
  required
  :error="errors.name"
  @blur="validateName"
/>
```

### BaseCard

```vue
<BaseCard title="Welcome" padding="large">
  <p>Card content goes here</p>
</BaseCard>
```

## Testing

The project uses Vitest for unit testing with Vue Test Utils for component testing.

### Test Coverage

- Composables: Form validation, date formatting
- Components: BaseButton, BaseInput
- Integration: Form submission flow

## Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new features
3. Ensure WCAG 2.1 AA compliance
4. Use Alberta Design System tokens

## License

© Government of Alberta. All rights reserved.

| goa-gold | #F1B434 | Accents |
| goa-red | #E31C3D | Errors |
| goa-grey-dark | #333333 | Body text |
| goa-grey | #666666 | Secondary text |
| goa-grey-light | #F1F1F1 | Backgrounds |

## License

© Government of Alberta. All rights reserved.
