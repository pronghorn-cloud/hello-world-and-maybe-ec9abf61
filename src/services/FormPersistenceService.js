/**
 * FormPersistenceService
 * Handles form data persistence using sessionStorage
 */

const STORAGE_KEY = 'helloWorldFormData';

/**
 * Saves form data to sessionStorage
 * @param {Object} data - The form data to save
 */
export const saveFormData = (data) => {
  try {
    const serialized = JSON.stringify(data);
    sessionStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Failed to save form data:', error);
  }
};

/**
 * Loads form data from sessionStorage
 * @returns {Object|null} - The saved form data or null if not found
 */
export const loadFormData = () => {
  try {
    const serialized = sessionStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized);
  } catch (error) {
    console.error('Failed to load form data:', error);
    return null;
  }
};

/**
 * Clears form data from sessionStorage
 */
export const clearFormData = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear form data:', error);
  }
};

/**
 * Checks if form data exists in sessionStorage
 * @returns {boolean} - True if data exists
 */
export const hasFormData = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    return false;
  }
};

export default {
  saveFormData,
  loadFormData,
  clearFormData,
  hasFormData,
};
