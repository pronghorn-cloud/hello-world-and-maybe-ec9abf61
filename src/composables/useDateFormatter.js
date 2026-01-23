/**
 * Date Formatter Composable
 * 
 * Provides consistent date formatting across the application.
 * Follows Canadian date format standards.
 * 
 * @module composables/useDateFormatter
 */

/**
 * Creates a date formatter with Canadian locale defaults
 * @param {Object} options - Formatter options
 * @returns {Object} Formatting methods
 */
export function useDateFormatter(options = {}) {
  const {
    locale = 'en-CA',
    timezone = 'America/Edmonton'
  } = options

  /**
   * Format a date string to long format
   * Example: "Monday, January 1, 2024"
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Formatted date string
   */
  function formatLong(dateString) {
    if (!dateString) {
      return ''
    }

    try {
      // Add time component to avoid timezone issues
      const dateObj = new Date(dateString + 'T00:00:00')
      
      if (isNaN(dateObj.getTime())) {
        return dateString
      }

      return dateObj.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  /**
   * Format a date string to short format
   * Example: "Jan 1, 2024"
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Formatted date string
   */
  function formatShort(dateString) {
    if (!dateString) {
      return ''
    }

    try {
      const dateObj = new Date(dateString + 'T00:00:00')
      
      if (isNaN(dateObj.getTime())) {
        return dateString
      }

      return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  /**
   * Format a date string to ISO format
   * Example: "2024-01-01"
   * @param {string} dateString - Date in any parseable format
   * @returns {string} ISO formatted date string
   */
  function formatISO(dateString) {
    if (!dateString) {
      return ''
    }

    try {
      const dateObj = new Date(dateString)
      
      if (isNaN(dateObj.getTime())) {
        return dateString
      }

      return dateObj.toISOString().split('T')[0]
    } catch {
      return dateString
    }
  }

  /**
   * Get relative time description
   * Example: "2 days ago", "in 3 days"
   * @param {string} dateString - Date in YYYY-MM-DD format
   * @returns {string} Relative time description
   */
  function formatRelative(dateString) {
    if (!dateString) {
      return ''
    }

    try {
      const dateObj = new Date(dateString + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const diffTime = dateObj.getTime() - today.getTime()
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 0) {
        return 'Today'
      } else if (diffDays === 1) {
        return 'Tomorrow'
      } else if (diffDays === -1) {
        return 'Yesterday'
      } else if (diffDays > 1) {
        return `In ${diffDays} days`
      } else {
        return `${Math.abs(diffDays)} days ago`
      }
    } catch {
      return dateString
    }
  }

  return {
    formatLong,
    formatShort,
    formatISO,
    formatRelative
  }
}
