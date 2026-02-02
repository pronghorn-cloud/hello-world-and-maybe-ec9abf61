# Alberta Design System Application

A Vue 3 application built with strict compliance to the Alberta Design System (ADS) standards.

## Tech Stack

- **Vue**: ^3.4.27
- **Vite**: ^5.2.11
- **Vue Router**: ^4.3.2
- **Language**: JavaScript (no TypeScript)

## ADS Compliance

This application strictly adheres to the Alberta Design System specification (ABD-001):

### ABD-001-001: Focus States
- All interactive elements have visible focus indicators
- Focus color: `#FEBA35`
- Focus ring: 3px solid with 2px offset

### ABD-001-002: Typography
- Font family: Acumin Pro Semi Condensed
- H1 is exclusive to page title (only ONE per page)
- Consistent heading hierarchy

### ABD-001-003: Spacing
- 8px grid system for all spacing
- CSS custom properties for consistent spacing values

### ABD-001-004: Responsive Design
- Tablet breakpoint: 768px
- Mobile breakpoint: 480px
- Mobile-first responsive approach

### WCAG 2.1 AA Compliance
- Skip links for keyboard navigation
- Proper ARIA labels and roles
- Minimum touch targets (44x44px)
- Color contrast compliance
- Reduced motion support
- High contrast mode support

## Features

### E-001: Welcome Page
- E-001-001: Welcome message for users
- E-001-002: Brief description of application purpose
- E-001-003: Primary action button to continue

### E-003: Response Page
- E-003-001: Display confirmation message
- E-003-002: Show summary of submitted information
- E-003-003: Provide next steps or actions

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── main.js             # Vue app entry point
│   ├── App.vue             # Root component
│   ├── assets/
│   │   └── styles.css      # ADS global styles
│   ├── components/
│   │   └── H1Header.vue    # Reusable H1 component
│   ├── router/
│   │   └── index.js        # Vue Router configuration
│   └── views/
│       ├── WelcomePage.vue # E-001 Welcome page
│       └── ResponsePage.vue # E-003 Response page
```

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Blue | #0070C4 | Primary actions, links |
| Circle Blue | #005A9C | Hover states, icons |
| Divider | #6A6D70 | Borders, secondary text |
| Focus | #FEBA35 | Focus indicators |

## License

Government of Alberta
