# HelloWorld Application

A simple Vue 3 application with a welcome form and response page.

## Tech Stack

- Vue 3.5.24 (Composition API)
- Vite
- Vue Router
- Axios
- JavaScript only

## Features

### Welcome Page
- Name input field (required)
- Date input field (required)
- Form validation with error messages
- Submit button

### Response Page
- Personalized greeting message
- Formatted date display
- Back navigation button
- Empty state handling

## Getting Started

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

## Project Structure

```
src/
├── App.vue           # Root component
├── main.js           # Application entry point
├── style.css         # Global styles
├── router/
│   └── index.js      # Vue Router configuration
└── views/
    ├── WelcomePage.vue   # Entry form
    └── ResponsePage.vue  # Greeting display
```

## Alberta Design System Colors

| Token | Hex | Usage |
|-------|-----|-------|
| goa-blue | #0070C4 | Primary actions |
| goa-blue-dark | #004F84 | Headings, hover |
| goa-gold | #F1B434 | Accents |
| goa-red | #E31C3D | Errors |
| goa-grey-dark | #333333 | Body text |
| goa-grey | #666666 | Secondary text |
| goa-grey-light | #F1F1F1 | Backgrounds |

## License

© Government of Alberta. All rights reserved.
