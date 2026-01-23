/**
 * useFormValidation Composable Tests
 * 
 * Unit tests for form validation logic.
 * @module tests/composables/useFormValidation
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { useFormValidation } from '@/composables/useFormValidation'

describe('useFormValidation', () => {
  let validation

  beforeEach(() => {
    validation = useFormValidation({ name: '', date: '' })
  })

  describe('validateName', () => {
    it('should return false and set error for empty name', () => {
      const result = validation.validateName('')
      
      expect(result).toBe(false)
      expect(validation.errors.name).toBe('Name is required')
    })

    it('should return false and set error for name less than 2 characters', () => {
      const result = validation.validateName('A')
      
      expect(result).toBe(false)
      expect(validation.errors.name).toBe('Name must be at least 2 characters')
    })

    it('should return true and clear error for valid name', () => {
      const result = validation.validateName('John Doe')
      
      expect(result).toBe(true)
      expect(validation.errors.name).toBe('')
    })

    it('should trim whitespace when validating', () => {
      const result = validation.validateName('   ')
      
      expect(result).toBe(false)
      expect(validation.errors.name).toBe('Name is required')
    })

    it('should accept name with exactly 2 characters', () => {
      const result = validation.validateName('Jo')
      
      expect(result).toBe(true)
      expect(validation.errors.name).toBe('')
    })
  })

  describe('validateDate', () => {
    it('should return false and set error for empty date', () => {
      const result = validation.validateDate('')
      
      expect(result).toBe(false)
      expect(validation.errors.date).toBe('Date is required')
    })

    it('should return false and set error for invalid date', () => {
      const result = validation.validateDate('not-a-date')
      
      expect(result).toBe(false)
      expect(validation.errors.date).toBe('Please enter a valid date')
    })

    it('should return true and clear error for valid date', () => {
      const result = validation.validateDate('2024-01-15')
      
      expect(result).toBe(true)
      expect(validation.errors.date).toBe('')
    })
  })

  describe('clearError', () => {
    it('should clear specific field error', () => {
      validation.errors.name = 'Some error'
      
      validation.clearError('name')
      
      expect(validation.errors.name).toBe('')
    })

    it('should not affect other fields', () => {
      validation.errors.name = 'Name error'
      validation.errors.date = 'Date error'
      
      validation.clearError('name')
      
      expect(validation.errors.name).toBe('')
      expect(validation.errors.date).toBe('Date error')
    })
  })

  describe('clearAllErrors', () => {
    it('should clear all errors', () => {
      validation.errors.name = 'Name error'
      validation.errors.date = 'Date error'
      
      validation.clearAllErrors()
      
      expect(validation.errors.name).toBe('')
      expect(validation.errors.date).toBe('')
    })
  })

  describe('hasErrors', () => {
    it('should return false when no errors', () => {
      expect(validation.hasErrors.value).toBe(false)
    })

    it('should return true when there are errors', () => {
      validation.errors.name = 'Some error'
      
      expect(validation.hasErrors.value).toBe(true)
    })
  })

  describe('setError', () => {
    it('should set custom error message', () => {
      validation.setError('name', 'Custom error')
      
      expect(validation.errors.name).toBe('Custom error')
    })
  })
})
