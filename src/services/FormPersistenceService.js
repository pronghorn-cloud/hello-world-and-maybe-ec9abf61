const STORAGE_KEY = 'helloworld_form_data'

export const FormPersistenceService = {
  /**
   * Save form data to session storage
   * @param {Object} data - The form data to save
   */
  saveFormData(data) {
    try {
      const serializedData = JSON.stringify(data)
      sessionStorage.setItem(STORAGE_KEY, serializedData)
      return true
    } catch (error) {
      console.error('Error saving form data:', error)
      return false
    }
  },

  /**
   * Retrieve form data from session storage
   * @returns {Object|null} The stored form data or null if not found
   */
  getFormData() {
    try {
      const serializedData = sessionStorage.getItem(STORAGE_KEY)
      if (!serializedData) {
        return null
      }
      return JSON.parse(serializedData)
    } catch (error) {
      console.error('Error retrieving form data:', error)
      return null
    }
  },

  /**
   * Clear form data from session storage
   */
  clearFormData() {
    try {
      sessionStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing form data:', error)
      return false
    }
  },

  /**
   * Check if form data exists in storage
   * @returns {boolean} True if form data exists
   */
  hasFormData() {
    return sessionStorage.getItem(STORAGE_KEY) !== null
  }
}
