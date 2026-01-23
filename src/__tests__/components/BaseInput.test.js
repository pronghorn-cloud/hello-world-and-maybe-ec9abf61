/**
 * BaseInput Component Tests
 * 
 * Unit tests for the BaseInput component.
 * @module tests/components/BaseInput
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/ui/BaseInput.vue'

describe('BaseInput', () => {
  const defaultProps = {
    label: 'Test Label',
    modelValue: ''
  }

  it('renders label correctly', () => {
    const wrapper = mount(BaseInput, {
      props: defaultProps
    })

    expect(wrapper.find('label').text()).toContain('Test Label')
  })

  it('shows required indicator when required', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        required: true
      }
    })

    expect(wrapper.find('.base-input__required').exists()).toBe(true)
    expect(wrapper.find('.base-input__required').text()).toBe('*')
  })

  it('binds v-model correctly', async () => {
    const wrapper = mount(BaseInput, {
      props: defaultProps
    })

    const input = wrapper.find('input')
    await input.setValue('test value')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test value'])
  })

  it('displays error message when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        error: 'This field is required'
      }
    })

    expect(wrapper.find('.base-input__error').exists()).toBe(true)
    expect(wrapper.find('.base-input__error').text()).toBe('This field is required')
  })

  it('applies error class to input when error exists', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        error: 'Error message'
      }
    })

    expect(wrapper.find('input').classes()).toContain('base-input__field--error')
  })

  it('sets aria-invalid when error exists', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        error: 'Error message'
      }
    })

    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('displays help text when provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        helpText: 'Enter your full name'
      }
    })

    expect(wrapper.find('.base-input__help-text').exists()).toBe(true)
    expect(wrapper.find('.base-input__help-text').text()).toBe('Enter your full name')
  })

  it('hides help text when error is shown', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        helpText: 'Help text',
        error: 'Error message'
      }
    })

    expect(wrapper.find('.base-input__help-text').exists()).toBe(false)
    expect(wrapper.find('.base-input__error').exists()).toBe(true)
  })

  it('emits blur event', async () => {
    const wrapper = mount(BaseInput, {
      props: defaultProps
    })

    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('emits focus event', async () => {
    const wrapper = mount(BaseInput, {
      props: defaultProps
    })

    await wrapper.find('input').trigger('focus')

    expect(wrapper.emitted('focus')).toBeTruthy()
  })

  it('applies disabled state correctly', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        disabled: true
      }
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('input').classes()).toContain('base-input__field--disabled')
  })

  it('uses provided id for input', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        id: 'custom-id'
      }
    })

    expect(wrapper.find('input').attributes('id')).toBe('custom-id')
    expect(wrapper.find('label').attributes('for')).toBe('custom-id')
  })

  it('sets correct input type', () => {
    const wrapper = mount(BaseInput, {
      props: {
        ...defaultProps,
        type: 'email'
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('email')
  })
})
