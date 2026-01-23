/**
 * Application Constants
 * 
 * Centralized configuration values following Government of Alberta standards.
 * @module constants
 */

/**
 * Application metadata
 * @constant {Object}
 */
export const APP_CONFIG = {
  name: 'HelloWorld',
  version: '1.0.0',
  organization: 'Government of Alberta',
  copyright: `© ${new Date().getFullYear()} Government of Alberta. All rights reserved.`
}

/**
 * Alberta Design System color tokens
 * Reference: Alberta Design System Guidelines
 * @constant {Object}
 */
export const COLORS = {
  // Primary Colors
  GOA_BLUE: '#0070C4',
  GOA_BLUE_DARK: '#004F84',
  GOA_GOLD: '#F1B434',
  
  // Feedback Colors
  GOA_RED: '#E31C3D',
  GOA_GREEN: '#00853E',
  
  // Neutral Colors
  GOA_GREY_DARK: '#333333',
  GOA_GREY: '#666666',
  GOA_GREY_LIGHT: '#F1F1F1',
  WHITE: '#FFFFFF'
}

/**
 * Route names for type-safe navigation
 * @constant {Object}
 */
export const ROUTES = {
  WELCOME: 'Welcome',
  RESPONSE: 'Response'
}

/**
 * Form validation rules
 * @constant {Object}
 */
export const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100
}

/**
 * Accessibility labels and messages
 * @constant {Object}
 */
export const A11Y = {
  REQUIRED_FIELD: '(required)',
  SKIP_TO_CONTENT: 'Skip to main content',
  LOADING: 'Loading...',
  ERROR_PREFIX: 'Error:'
}

/**
 * Error messages for form validation
 * @constant {Object}
 */
export const ERROR_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`,
  NAME_MAX_LENGTH: `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`,
  DATE_REQUIRED: 'Date is required',
  DATE_INVALID: 'Please enter a valid date'
}
