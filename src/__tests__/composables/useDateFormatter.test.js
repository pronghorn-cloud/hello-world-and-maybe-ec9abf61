/**
 * useDateFormatter Composable Tests
 * 
 * Unit tests for date formatting logic.
 * @module tests/composables/useDateFormatter
 */
import { describe, it, expect } from 'vitest'
import { useDateFormatter } from '@/composables/useDateFormatter'

describe('useDateFormatter', () => {
  const { formatLong, formatShort, formatISO, formatRelative } = useDateFormatter()

  describe('formatLong', () => {
    it('should format date to long format', () => {
      const result = formatLong('2024-01-15')
      
      expect(result).toContain('January')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('should return empty string for empty input', () => {
      expect(formatLong('')).toBe('')
      expect(formatLong(null)).toBe('')
      expect(formatLong(undefined)).toBe('')
    })

    it('should return original string for invalid date', () => {
      const result = formatLong('invalid')
      expect(result).toBe('invalid')
    })
  })

  describe('formatShort', () => {
    it('should format date to short format', () => {
      const result = formatShort('2024-01-15')
      
      expect(result).toContain('Jan')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('should return empty string for empty input', () => {
      expect(formatShort('')).toBe('')
    })
  })

  describe('formatISO', () => {
    it('should format date to ISO format', () => {
      const result = formatISO('January 15, 2024')
      
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('should return empty string for empty input', () => {
      expect(formatISO('')).toBe('')
    })
  })

  describe('formatRelative', () => {
    it('should return "Today" for today\'s date', () => {
      const today = new Date().toISOString().split('T')[0]
      const result = formatRelative(today)
      
      expect(result).toBe('Today')
    })

    it('should return "Yesterday" for yesterday', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const result = formatRelative(yesterday.toISOString().split('T')[0])
      
      expect(result).toBe('Yesterday')
    })

    it('should return "Tomorrow" for tomorrow', () => {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      const result = formatRelative(tomorrow.toISOString().split('T')[0])
      
      expect(result).toBe('Tomorrow')
    })

    it('should return empty string for empty input', () => {
      expect(formatRelative('')).toBe('')
    })
  })
})
