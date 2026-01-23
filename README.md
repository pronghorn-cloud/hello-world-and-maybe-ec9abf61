# HelloWorld App

A simple Vue 3 application with an entry form and response page.

## Tech Stack

- Vue 3.5.24a (Composition API)
- Vite 7.2.4
- Vue Router 4.x
- JavaScript (no TypeScript)

## Features

- **WelcomePage**: Entry form with name and date fields
  - Required field validation
  - Submit button to navigate to response page

- **ResponsePage**: Displays greeting with submitted data
  - Shows personalized greeting with name
  - Displays formatted date
  - Back button to return to form

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── assets/
│   │   └── styles.css
│   ├── router/
│   │   └── index.js
│   └── views/
│       ├── WelcomePage.vue
│       └── ResponsePage.vue
```
