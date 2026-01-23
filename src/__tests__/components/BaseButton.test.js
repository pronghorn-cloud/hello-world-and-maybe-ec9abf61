/**
 * BaseButton Component Tests
 * 
 * Unit tests for the BaseButton component.
 * @module tests/components/BaseButton
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me'
      }
    })

    expect(wrapper.text()).toContain('Click me')
  })

  it('applies primary variant class by default', () => {
    const wrapper = mount(BaseButton)

    expect(wrapper.classes()).toContain('base-button--primary')
  })

  it('applies secondary variant class when specified', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary'
      }
    })

    expect(wrapper.classes()).toContain('base-button--secondary')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      }
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies full-width class when prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        fullWidth: true
      }
    })

    expect(wrapper.classes()).toContain('base-button--full-width')
  })

  it('shows loading state with spinner', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true
      },
      slots: {
        default: 'Submit'
      }
    })

    expect(wrapper.find('.base-button__spinner').exists()).toBe(true)
    expect(wrapper.classes()).toContain('base-button--loading')
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  it('is disabled when loading', () => {
    const wrapper = mount(BaseButton, {
      props: {
        loading: true
      }
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('applies correct button type', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'submit'
      }
    })

    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('applies aria-label when provided', () => {
    const wrapper = mount(BaseButton, {
      props: {
        ariaLabel: 'Close dialog'
      }
    })

    expect(wrapper.attributes('aria-label')).toBe('Close dialog')
  })
})
