# AGENTS.md - Government of Alberta Design System Compliance Guide

This document defines strict compliance requirements for all development work on this project. **No external references are permitted.** All implementations must adhere exclusively to the 10 Alberta Design System (ADS) standards defined below.

---

## Table of Contents

1. [ADS-001 - Accessibility Audit](#ads-001---accessibility-audit)
2. [ADS-002 - Compliance Review](#ads-002---compliance-review)
3. [ADS-003 - Content Design](#ads-003---content-design)
4. [ADS-004 - Design Tokens](#ads-004---design-tokens)
5. [ADS-005 - GOA Design System](#ads-005---goa-design-system)
6. [ADS-006 - HTML Structure](#ads-006---html-structure)
7. [ADS-007 - Information Architecture](#ads-007---information-architecture)
8. [ADS-008 - Interactivity](#ads-008---interactivity)
9. [ADS-009 - Orchestration](#ads-009---orchestration)
10. [ADS-010 - Styling](#ads-010---styling)

---

## Critical Compliance Rules

⚠️ **MANDATORY**: All code must comply with these standards. No exceptions.

- **DO NOT** use external CSS frameworks (Bootstrap, Tailwind, etc.)
- **DO NOT** use external JavaScript libraries without explicit approval
- **DO NOT** reference external design systems or component libraries
- **DO NOT** use custom styling when GOA components provide the functionality
- **ALWAYS** use GOA web components for standard UI patterns
- **ALWAYS** follow the orchestration order defined in ADS-009

---

## ADS-001 - Accessibility Audit

### Purpose
Validate and enhance components against WCAG 2.2 AA standards. Ensure all users can access and interact with the interface.

### Requirements

#### Perceivable
- All images must have meaningful `alt` text or `alt=""` for decorative images
- Color contrast ratio must be at least 4.5:1 for normal text, 3:1 for large text
- Text must be resizable up to 200% without loss of functionality
- All form inputs must have visible labels

#### Operable
- All interactive elements must be keyboard accessible
- Focus must be visible with a minimum 3px outline using `--goa-color-focus: #ffc107`
- Skip links must be provided for main content navigation
- No keyboard traps - users must be able to navigate away from any element
- Focus order must follow logical reading sequence

#### Understandable
- Language must be declared with `lang="en"` attribute
- Form error messages must be clear and associated with inputs
- Instructions must not rely solely on sensory characteristics

#### Robust
- Valid HTML5 markup required
- ARIA attributes must be used correctly when native HTML is insufficient
- All custom components must expose appropriate roles and states

### Required ARIA Patterns

```html
<!-- Required document structure -->
<html lang="en">
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <header role="banner">...</header>
  <main id="main-content" role="main">...</main>
  <footer role="contentinfo">...</footer>
</body>

<!-- Form field pattern -->
<label for="field-id" class="goa-label">
  Field Name
  <span class="required" aria-hidden="true">*</span>
</label>
<span id="field-hint" class="goa-hint">Helper text</span>
<input 
  id="field-id" 
  aria-required="true" 
  aria-describedby="field-hint"
  aria-invalid="false"
>
<span id="field-error" role="alert" aria-live="polite">Error message</span>

<!-- Button pattern -->
<button type="submit" class="goa-button goa-button--primary">
  Action Text
</button>

<!-- Link styled as button -->
<a href="page.html" class="goa-button goa-button--secondary">
  <span aria-hidden="true">←</span>
  Link Text
</a>
```

### Media Query Support

```css
/* High contrast mode */
@media (prefers-contrast: high) {
  .goa-input, .goa-button {
    border-width: 3px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

---

## ADS-002 - Compliance Review

### Purpose
Perform final quality validation across all output. Ensure the complete component meets all standards and uses GOA design system components correctly.

### Checklist

#### Structure Validation
- [ ] HTML5 doctype declared
- [ ] Language attribute present
- [ ] Viewport meta tag configured correctly
- [ ] Skip link implemented
- [ ] Semantic landmark regions used (header, main, footer)
- [ ] Heading hierarchy is logical (h1 → h2 → h3)

#### Component Validation
- [ ] All UI elements use GOA web components
- [ ] No custom components where GOA components exist
- [ ] Design tokens used for all visual values
- [ ] No inline styles (except dynamically set via JavaScript)

#### Accessibility Validation
- [ ] All form fields have labels
- [ ] Error messages use role="alert" and aria-live
- [ ] Focus states are visible
- [ ] Keyboard navigation works completely
- [ ] Color is not the only means of conveying information

#### Content Validation
- [ ] Text is clear and user-centered
- [ ] Instructions are actionable
- [ ] Error messages explain how to fix the problem
- [ ] Button text describes the action

#### Code Quality
- [ ] No JavaScript errors in console
- [ ] No deprecated HTML elements
- [ ] CSS variables used for theming
- [ ] XSS prevention implemented for dynamic content

---

## ADS-003 - Content Design

### Purpose
Ensure all interface text is clear, human-centered, and effective. Provide content patterns during generation and validate content quality before delivery.

### Principles

1. **Plain Language**: Write at a Grade 8 reading level
2. **Active Voice**: Use active voice over passive
3. **Action-Oriented**: Tell users what to do, not what they can't do
4. **Consistent**: Use the same terms throughout
5. **Concise**: Remove unnecessary words

### Content Patterns

#### Page Titles
- Format: `[Page Purpose] - [Application Name]`
- Example: `Hello World App - Form`

#### Headings
- Use sentence case
- Be descriptive and specific
- Keep under 8 words when possible

#### Form Labels
- Use sentence case
- Be specific about what's needed
- Include format hints in helper text

```html
<label for="date-input" class="goa-label">
  Select a Date
  <span class="required" aria-hidden="true">*</span>
</label>
<span id="date-hint" class="goa-hint">Choose a date for your greeting (YYYY-MM-DD)</span>
```

#### Button Text
- Use verbs that describe the action
- Keep to 1-3 words
- Be specific: "Submit application" not just "Submit"

| Do | Don't |
|----|-------|
| Submit | OK |
| Save changes | Save |
| Back to Form | Back |
| Continue | Next |

#### Error Messages
- State what went wrong
- Tell the user how to fix it
- Be specific, not generic

| Do | Don't |
|----|-------|
| Please enter your name | Invalid input |
| Please select a date | Required field |

#### Helper Text
- Provide format examples
- Explain any constraints
- Use parentheses for format hints

---

## ADS-004 - Design Tokens

### Purpose
Provide the Government of Alberta design token values that all other skills consume. Tokens are the single source of truth for visual and spacing decisions.

### Color Tokens

```css
:root {
  /* Primary Colors */
  --goa-color-primary: #0070c4;
  --goa-color-primary-dark: #004f84;
  
  /* Neutral Colors */
  --goa-color-secondary: #333333;
  --goa-color-background: #f1f1f1;
  --goa-color-white: #ffffff;
  --goa-color-border: #666666;
  
  /* Semantic Colors */
  --goa-color-error: #d93e21;
  --goa-color-success: #2e8540;
  --goa-color-success-light: #e8f5e9;
  --goa-color-focus: #ffc107;
}
```

### Spacing Tokens

```css
:root {
  --goa-spacing-xs: 0.25rem;  /* 4px */
  --goa-spacing-sm: 0.5rem;   /* 8px */
  --goa-spacing-md: 1rem;     /* 16px */
  --goa-spacing-lg: 1.5rem;   /* 24px */
  --goa-spacing-xl: 2rem;     /* 32px */
}
```

### Typography Tokens

```css
:root {
  --goa-font-family: 'Acumin Pro Semi Condensed', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  --goa-font-size-base: 18px;
  --goa-line-height: 1.6;
}
```

### Border Tokens

```css
:root {
  --goa-border-radius: 4px;
  --goa-border-width: 2px;
  --goa-border-width-thick: 3px;
}
```

### Usage Rules

- **ALWAYS** use token variables, never hardcoded values
- **ALWAYS** reference tokens from :root
- **NEVER** create new tokens without approval
- **NEVER** use magic numbers for spacing or colors

---

## ADS-005 - GOA Design System

### Purpose
Ensure all generated interfaces use Government of Alberta approved UI components and follow design system standards. This standard acts as the authoritative reference.

### Approved Components

#### Header
```html
<header class="goa-header" role="banner">
  <h1>Application Name</h1>
</header>
```

```css
.goa-header {
  background-color: var(--goa-color-primary);
  color: var(--goa-color-white);
  padding: var(--goa-spacing-md) var(--goa-spacing-xl);
}

.goa-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
```

#### Footer
```html
<footer class="goa-footer" role="contentinfo">
  <p>&copy; 2024 Application Name. Built with GOA Design System standards.</p>
</footer>
```

```css
.goa-footer {
  background-color: var(--goa-color-secondary);
  color: var(--goa-color-white);
  padding: var(--goa-spacing-lg) var(--goa-spacing-xl);
  text-align: center;
  margin-top: var(--goa-spacing-xl);
}

.goa-footer p {
  margin: 0;
  font-size: 0.875rem;
}
```

#### Form Group
```html
<div class="goa-form-group">
  <label for="field-id" class="goa-label">...</label>
  <span id="field-hint" class="goa-hint">...</span>
  <input id="field-id" class="goa-input" ...>
  <span class="goa-error-message" id="field-error">...</span>
</div>
```

#### Input Field
```css
.goa-input {
  width: 100%;
  padding: var(--goa-spacing-sm) var(--goa-spacing-md);
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid var(--goa-color-border);
  border-radius: var(--goa-border-radius);
  background-color: var(--goa-color-white);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.goa-input:hover {
  border-color: var(--goa-color-primary);
}

.goa-input:focus {
  outline: none;
  border-color: var(--goa-color-primary);
  box-shadow: 0 0 0 3px var(--goa-color-focus);
}
```

#### Date Input
```css
.goa-date-input {
  width: 100%;
  max-width: 200px;
  padding: var(--goa-spacing-sm) var(--goa-spacing-md);
  font-size: 1rem;
  font-family: inherit;
  border: 2px solid var(--goa-color-border);
  border-radius: var(--goa-border-radius);
  background-color: var(--goa-color-white);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
```

#### Primary Button
```html
<button type="submit" class="goa-button goa-button--primary">
  Submit
</button>
```

```css
.goa-button {
  display: inline-block;
  padding: var(--goa-spacing-sm) var(--goa-spacing-xl);
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  text-decoration: none;
  border: 2px solid transparent;
  border-radius: var(--goa-border-radius);
  cursor: pointer;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.goa-button--primary {
  background-color: var(--goa-color-primary);
  color: var(--goa-color-white);
  border-color: var(--goa-color-primary);
}

.goa-button--primary:hover {
  background-color: var(--goa-color-primary-dark);
  border-color: var(--goa-color-primary-dark);
}

.goa-button--primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--goa-color-focus);
}
```

#### Secondary Button
```css
.goa-button--secondary {
  background-color: var(--goa-color-white);
  color: var(--goa-color-primary);
  border-color: var(--goa-color-primary);
}

.goa-button--secondary:hover {
  background-color: var(--goa-color-primary);
  color: var(--goa-color-white);
}

.goa-button--secondary:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--goa-color-focus);
}
```

#### Callout/Card (Success)
```html
<div class="goa-greeting-card" role="status" aria-live="polite">
  <div class="goa-greeting-card__icon" aria-hidden="true">👋</div>
  <p class="goa-greeting-card__message">Message</p>
  <p class="goa-greeting-card__details">Details</p>
</div>
```

```css
.goa-greeting-card {
  background-color: var(--goa-color-success-light);
  border: 2px solid var(--goa-color-success);
  border-radius: var(--goa-border-radius);
  padding: var(--goa-spacing-lg);
  margin-bottom: var(--goa-spacing-xl);
}
```

#### Summary List
```html
<div class="goa-summary">
  <p class="goa-summary__title">Section Title</p>
  <ul class="goa-summary__list">
    <li class="goa-summary__item">
      <span class="goa-summary__label">Label:</span>
      <span class="goa-summary__value">Value</span>
    </li>
  </ul>
</div>
```

---

## ADS-006 - HTML Structure

### Purpose
Generate interfaces using Government of Alberta web components and semantic HTML. Output must use GOA components for all standard UI patterns—custom HTML is only permitted when no GOA component exists.

### Document Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] - [App Name]</title>
  <style>
    /* Design tokens */
    :root { ... }
    
    /* Reset */
    *, *::before, *::after { box-sizing: border-box; }
    
    /* Base styles */
    body { ... }
    
    /* Component styles */
    ...
    
    /* Responsive styles */
    @media (max-width: 768px) { ... }
    
    /* Accessibility styles */
    @media (prefers-contrast: high) { ... }
    @media (prefers-reduced-motion: reduce) { ... }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header class="goa-header" role="banner">
    <h1>[App Name]</h1>
  </header>
  
  <main id="main-content" role="main">
    <h2>[Page Heading]</h2>
    <!-- Page content -->
  </main>
  
  <footer class="goa-footer" role="contentinfo">
    <p>&copy; [Year] [App Name]. Built with GOA Design System standards.</p>
  </footer>
  
  <script>
    (function() {
      'use strict';
      // JavaScript code
    })();
  </script>
</body>
</html>
```

### Semantic Requirements

| Element | Usage |
|---------|-------|
| `<header>` | Page header, must have role="banner" |
| `<main>` | Primary content, must have role="main" and id="main-content" |
| `<footer>` | Page footer, must have role="contentinfo" |
| `<nav>` | Navigation sections, must have aria-label |
| `<section>` | Thematic groupings with headings |
| `<article>` | Self-contained content |
| `<aside>` | Tangentially related content |
| `<form>` | Form containers |
| `<fieldset>` | Groups of related form fields |
| `<label>` | Form field labels, must use `for` attribute |

### Heading Hierarchy

- Only one `<h1>` per page (in header)
- Main content starts with `<h2>`
- Never skip heading levels
- Use headings for structure, not styling

---

## ADS-007 - Information Architecture

### Purpose
Define and validate the structural organization of content, ensuring users can find, understand, and navigate information effectively.

### Page Structure

1. **Skip Link** - First focusable element
2. **Header** - Application branding and navigation
3. **Main Content** - Primary page content
4. **Footer** - Secondary information and links

### Content Hierarchy

```
Page
├── Header (h1: App Name)
└── Main
    ├── Section Heading (h2)
    │   ├── Introductory content
    │   ├── Form/Interactive elements
    │   └── Actions (buttons)
    └── Navigation (if needed)
```

### User Flow Considerations

- Present information in order of importance
- Group related items together
- Provide clear calls to action
- Ensure logical tab order matches visual order
- Include clear navigation back to previous steps

### Form Organization

1. Page heading explaining purpose
2. Brief instructions (if needed)
3. Form fields in logical order
4. Required fields marked consistently
5. Submit button at the end
6. Error summary (when applicable)

---

## ADS-008 - Interactivity

### Purpose
Add behavior, state management, and event handling to styled components. Transform static markup into dynamic, functional interfaces.

### JavaScript Standards

- Use strict mode: `'use strict';`
- Wrap in IIFE to avoid global pollution
- Use `var` for IE11 compatibility (if required) or `const`/`let` for modern browsers
- Cache DOM references
- Use event delegation where appropriate

### Form Validation Pattern

```javascript
(function() {
  'use strict';
  
  // Cache DOM elements
  var form = document.getElementById('form-id');
  var input = document.getElementById('input-id');
  var error = document.getElementById('error-id');
  
  // Show error
  function showError(inputEl, errorEl, message) {
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    inputEl.style.borderColor = 'var(--goa-color-error)';
  }
  
  // Hide error
  function hideError(inputEl, errorEl) {
    inputEl.setAttribute('aria-invalid', 'false');
    errorEl.style.display = 'none';
    inputEl.style.borderColor = '';
  }
  
  // Validate field
  function validateField() {
    if (!input.value.trim()) {
      showError(input, error, 'Please enter a value');
      return false;
    }
    hideError(input, error);
    return true;
  }
  
  // Event listeners
  input.addEventListener('blur', validateField);
  input.addEventListener('input', function() {
    if (input.value.trim()) {
      hideError(input, error);
    }
  });
  
  // Form submission
  form.addEventListener('submit', function(event) {
    if (!validateField()) {
      event.preventDefault();
      input.focus();
    }
  });
})();
```

### Security Requirements

#### XSS Prevention

```javascript
// Always escape HTML when inserting user content
function escapeHtml(text) {
  if (!text) return '';
  var div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Use textContent instead of innerHTML when possible
element.textContent = userInput;

// When innerHTML is necessary, escape first
element.innerHTML = '<span>' + escapeHtml(userInput) + '</span>';
```

#### URL Parameter Handling

```javascript
function getUrlParams() {
  var params = {};
  var searchParams = new URLSearchParams(window.location.search);
  params.fieldName = searchParams.get('fieldName');
  return params;
}
```

### State Management

- Use ARIA attributes to communicate state
- Update `aria-invalid` on validation
- Use `aria-live` regions for dynamic updates
- Manage focus appropriately after interactions

---

## ADS-009 - Orchestration

### Purpose
Coordinate the execution of all interface-building skills for Government of Alberta applications. Manage dependencies, pass context between skills, and enforce GOA standards.

### Execution Order

When building or modifying interfaces, follow this order:

1. **ADS-004 Design Tokens** - Establish visual foundation
2. **ADS-007 Information Architecture** - Plan content structure
3. **ADS-006 HTML Structure** - Build semantic markup
4. **ADS-005 GOA Design System** - Apply component patterns
5. **ADS-010 Styling** - Add supplementary CSS
6. **ADS-003 Content Design** - Validate/refine text
7. **ADS-008 Interactivity** - Add JavaScript behavior
8. **ADS-001 Accessibility Audit** - Verify WCAG compliance
9. **ADS-002 Compliance Review** - Final validation

### Implementation Checklist

```
□ Step 1: Define CSS custom properties with design tokens
□ Step 2: Plan page layout and content hierarchy
□ Step 3: Write semantic HTML structure
□ Step 4: Apply GOA component classes and patterns
□ Step 5: Add layout CSS (margins, padding, responsive)
□ Step 6: Review and refine all text content
□ Step 7: Implement form validation and interactions
□ Step 8: Test keyboard navigation and screen readers
□ Step 9: Run final compliance check against all standards
```

### Component Implementation Pattern

When implementing any component:

1. Check if a GOA component exists (ADS-005)
2. If yes, use the approved pattern exactly
3. If no, create custom component following:
   - Design tokens (ADS-004)
   - Accessibility requirements (ADS-001)
   - Content guidelines (ADS-003)
4. Document any custom components

### File Organization

```
project/
├── index.html          # Entry point
├── response.html       # Response/confirmation page
├── AGENTS.md           # This compliance guide
└── [additional pages as needed]
```

---

## ADS-010 - Styling

### Purpose
Provide supplementary CSS for layout and content styling. GOA web components are pre-styled—this standard handles only custom layout needs and content typography.

### When to Use Custom Styling

| Scenario | Approach |
|----------|----------|
| Component exists in ADS-005 | Use GOA component styles |
| Layout spacing | Use spacing tokens |
| Custom layout | Write custom CSS with tokens |
| Typography | Use font tokens |
| Colors | Always use color tokens |

### Base Styles

```css
/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Base body */
body {
  margin: 0;
  padding: 0;
  font-family: var(--goa-font-family);
  font-size: 18px;
  line-height: 1.6;
  color: var(--goa-color-secondary);
  background-color: var(--goa-color-background);
}
```

### Layout Patterns

#### Centered Container
```css
main {
  max-width: 600px;
  margin: var(--goa-spacing-xl) auto;
  padding: var(--goa-spacing-xl);
  background-color: var(--goa-color-white);
  border-radius: var(--goa-border-radius);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

#### Skip Link
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--goa-color-primary);
  color: var(--goa-color-white);
  padding: var(--goa-spacing-sm) var(--goa-spacing-md);
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 0;
}
```

### Responsive Design

```css
/* Mobile breakpoint */
@media (max-width: 768px) {
  main {
    margin: var(--goa-spacing-md);
    padding: var(--goa-spacing-md);
  }
  
  .goa-header {
    padding: var(--goa-spacing-md);
  }
}
```

### Prohibited Practices

- ❌ Using `!important` (except for accessibility overrides)
- ❌ Hardcoded color values
- ❌ Hardcoded spacing values
- ❌ External fonts not in the token list
- ❌ Overriding GOA component styles
- ❌ Using CSS frameworks

---

## Quick Reference

### Design Token Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--goa-color-primary` | #0070c4 | Primary actions, links |
| `--goa-color-primary-dark` | #004f84 | Hover states |
| `--goa-color-secondary` | #333333 | Text, footer |
| `--goa-color-background` | #f1f1f1 | Page background |
| `--goa-color-white` | #ffffff | Cards, inputs |
| `--goa-color-error` | #d93e21 | Error states |
| `--goa-color-success` | #2e8540 | Success states |
| `--goa-color-focus` | #ffc107 | Focus rings |
| `--goa-spacing-xs` | 0.25rem | Tight spacing |
| `--goa-spacing-sm` | 0.5rem | Small spacing |
| `--goa-spacing-md` | 1rem | Medium spacing |
| `--goa-spacing-lg` | 1.5rem | Large spacing |
| `--goa-spacing-xl` | 2rem | Extra large spacing |

### Component Quick Reference

| Component | Class | Notes |
|-----------|-------|-------|
| Header | `.goa-header` | role="banner" |
| Footer | `.goa-footer` | role="contentinfo" |
| Main | `#main-content` | role="main" |
| Form Group | `.goa-form-group` | Container for form fields |
| Label | `.goa-label` | Always with `for` attribute |
| Hint | `.goa-hint` | Helper text |
| Input | `.goa-input` | Text inputs |
| Date Input | `.goa-date-input` | Date picker |
| Button Primary | `.goa-button--primary` | Main actions |
| Button Secondary | `.goa-button--secondary` | Secondary actions |
| Error | `.goa-error-message` | Validation errors |
| Skip Link | `.skip-link` | Accessibility |

---

## Validation Command

Before any code is committed, verify:

1. ✅ All design tokens used (no hardcoded values)
2. ✅ All GOA components used where applicable
3. ✅ Semantic HTML with proper landmarks
4. ✅ ARIA attributes correctly applied
5. ✅ Keyboard navigation functional
6. ✅ Content is clear and user-centered
7. ✅ No external dependencies
8. ✅ Responsive design implemented
9. ✅ Accessibility media queries included
10. ✅ XSS prevention in JavaScript

---

**Document Version**: 1.0  
**Last Updated**: 2024  
**Compliance**: Government of Alberta Design System Standards