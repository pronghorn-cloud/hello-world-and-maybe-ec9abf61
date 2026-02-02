<template>
  <!--
    AppHeader Component - Alberta Design System
    Government of Alberta official header
    ABD-001 Compliant: Focus states, accessibility, responsive
  -->
  <header class="ads-header" role="banner">
    <div class="ads-header-container">
      <!-- Government of Alberta Logo/Branding -->
      <div class="ads-header-branding">
        <a 
          href="/" 
          class="ads-header-logo-link"
          aria-label="Government of Alberta - Home"
        >
          <svg 
            class="ads-header-logo" 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <!-- Alberta Shield simplified -->
            <rect width="48" height="48" rx="4" fill="#005A9C"/>
            <path d="M12 12H36V36H12V12Z" fill="#FFFFFF" opacity="0.2"/>
            <path d="M24 14L32 20V32H16V20L24 14Z" fill="#FFFFFF"/>
            <path d="M20 26H28V32H20V26Z" fill="#005A9C"/>
          </svg>
          <span class="ads-header-title">Alberta.ca</span>
        </a>
      </div>
      
      <!-- Header Navigation -->
      <nav class="ads-header-nav" aria-label="Main navigation">
        <ul class="ads-header-nav-list">
          <li>
            <a href="/" class="ads-header-nav-link">Home</a>
          </li>
          <li>
            <a href="#services" class="ads-header-nav-link">Services</a>
          </li>
          <li>
            <a href="#contact" class="ads-header-nav-link">Contact</a>
          </li>
        </ul>
      </nav>
      
      <!-- Mobile Menu Button -->
      <button 
        type="button"
        class="ads-header-menu-btn"
        :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <svg 
          v-if="!isMobileMenuOpen"
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg 
          v-else
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    
    <!-- Mobile Navigation Menu -->
    <nav 
      v-if="isMobileMenuOpen" 
      id="mobile-menu"
      class="ads-header-mobile-nav" 
      aria-label="Mobile navigation"
    >
      <ul class="ads-header-mobile-nav-list">
        <li>
          <a href="/" class="ads-header-mobile-nav-link" @click="closeMobileMenu">Home</a>
        </li>
        <li>
          <a href="#services" class="ads-header-mobile-nav-link" @click="closeMobileMenu">Services</a>
        </li>
        <li>
          <a href="#contact" class="ads-header-mobile-nav-link" @click="closeMobileMenu">Contact</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const isMobileMenuOpen = ref(false)
    
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
    
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }
    
    return {
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
.ads-header {
  background-color: var(--ads-blue);
  color: var(--ads-text-inverse);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.ads-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--ads-space-2) var(--ads-space-2);
  min-height: 64px;
}

/* Branding */
.ads-header-branding {
  display: flex;
  align-items: center;
}

.ads-header-logo-link {
  display: flex;
  align-items: center;
  gap: var(--ads-space-1);
  color: var(--ads-text-inverse);
  text-decoration: none;
  border-radius: var(--ads-radius-sm);
  padding: var(--ads-space-1);
  margin: calc(var(--ads-space-1) * -1);
  transition: background-color var(--ads-transition-fast);
}

.ads-header-logo-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.ads-header-logo-link:focus {
  outline: var(--ads-focus-ring);
  outline-offset: var(--ads-focus-offset);
}

.ads-header-logo {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.ads-header-title {
  font-family: var(--ads-font-family);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* Desktop Navigation */
.ads-header-nav {
  display: none;
}

.ads-header-nav-list {
  display: flex;
  align-items: center;
  gap: var(--ads-space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.ads-header-nav-link {
  display: block;
  padding: var(--ads-space-1) var(--ads-space-2);
  color: var(--ads-text-inverse);
  text-decoration: none;
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  font-weight: 600;
  border-radius: var(--ads-radius-sm);
  transition: background-color var(--ads-transition-fast);
  min-height: 44px;
  display: flex;
  align-items: center;
}

.ads-header-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.ads-header-nav-link:focus {
  outline: var(--ads-focus-ring);
  outline-offset: var(--ads-focus-offset);
}

/* Mobile Menu Button */
.ads-header-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--ads-radius-sm);
  color: var(--ads-text-inverse);
  cursor: pointer;
  transition: background-color var(--ads-transition-fast);
}

.ads-header-menu-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.ads-header-menu-btn:focus {
  outline: var(--ads-focus-ring);
  outline-offset: var(--ads-focus-offset);
}

/* Mobile Navigation */
.ads-header-mobile-nav {
  background-color: var(--ads-circle-blue);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.ads-header-mobile-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ads-header-mobile-nav-link {
  display: block;
  padding: var(--ads-space-2);
  color: var(--ads-text-inverse);
  text-decoration: none;
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  font-weight: 600;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color var(--ads-transition-fast);
  min-height: 44px;
  display: flex;
  align-items: center;
}

.ads-header-mobile-nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.ads-header-mobile-nav-link:focus {
  outline: var(--ads-focus-ring);
  outline-offset: calc(var(--ads-focus-offset) * -1);
}

/* Responsive Styles (ABD-001-004) */
@media screen and (min-width: 769px) {
  .ads-header-nav {
    display: block;
  }
  
  .ads-header-menu-btn {
    display: none;
  }
  
  .ads-header-mobile-nav {
    display: none;
  }
}

@media screen and (max-width: 480px) {
  .ads-header-title {
    font-size: 1rem;
  }
  
  .ads-header-logo {
    width: 32px;
    height: 32px;
  }
}
</style>
