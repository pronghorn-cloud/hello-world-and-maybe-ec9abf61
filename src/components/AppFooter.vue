<template>
  <!--
    AppFooter Component - Alberta Design System
    Government of Alberta official footer
    ABD-001 Compliant: Focus states, accessibility, responsive
  -->
  <footer class="ads-footer" role="contentinfo">
    <div class="ads-footer-container">
      <!-- Footer Main Content -->
      <div class="ads-footer-main">
        <!-- Footer Branding -->
        <div class="ads-footer-branding">
          <svg 
            class="ads-footer-logo" 
            width="48" 
            height="48" 
            viewBox="0 0 48 48" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="48" height="48" rx="4" fill="#FFFFFF"/>
            <path d="M12 12H36V36H12V12Z" fill="#005A9C" opacity="0.2"/>
            <path d="M24 14L32 20V32H16V20L24 14Z" fill="#005A9C"/>
            <path d="M20 26H28V32H20V26Z" fill="#FFFFFF"/>
          </svg>
          <div class="ads-footer-branding-text">
            <span class="ads-footer-title">Government of Alberta</span>
            <span class="ads-footer-tagline">Building a stronger Alberta</span>
          </div>
        </div>
        
        <!-- Footer Links -->
        <nav class="ads-footer-nav" aria-label="Footer navigation">
          <div class="ads-footer-nav-section">
            <h2 class="ads-footer-nav-title">Quick Links</h2>
            <ul class="ads-footer-nav-list">
              <li><a href="#accessibility" class="ads-footer-link">Accessibility</a></li>
              <li><a href="#privacy" class="ads-footer-link">Privacy</a></li>
              <li><a href="#terms" class="ads-footer-link">Terms of Use</a></li>
            </ul>
          </div>
          
          <div class="ads-footer-nav-section">
            <h2 class="ads-footer-nav-title">Contact</h2>
            <ul class="ads-footer-nav-list">
              <li><a href="tel:310-0000" class="ads-footer-link">310-0000</a></li>
              <li><a href="mailto:contact@alberta.ca" class="ads-footer-link">contact@alberta.ca</a></li>
              <li><a href="#locations" class="ads-footer-link">Office Locations</a></li>
            </ul>
          </div>
        </nav>
      </div>
      
      <!-- Footer Bottom -->
      <div class="ads-footer-bottom">
        <p class="ads-footer-copyright">
          © {{ currentYear }} Government of Alberta
        </p>
        <p class="ads-footer-legal">
          This website is maintained by the Government of Alberta and follows 
          <a href="#wcag" class="ads-footer-inline-link">WCAG 2.1 AA</a> accessibility guidelines.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'AppFooter',
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    return {
      currentYear
    }
  }
}
</script>

<style scoped>
.ads-footer {
  background-color: var(--ads-circle-blue);
  color: var(--ads-text-inverse);
  margin-top: auto;
}

.ads-footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--ads-space-4) var(--ads-space-2);
}

/* Footer Main Content */
.ads-footer-main {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ads-space-4);
  padding-bottom: var(--ads-space-4);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Footer Branding */
.ads-footer-branding {
  display: flex;
  align-items: flex-start;
  gap: var(--ads-space-2);
  flex: 1;
  min-width: 250px;
}

.ads-footer-logo {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.ads-footer-branding-text {
  display: flex;
  flex-direction: column;
  gap: var(--ads-space-1);
}

.ads-footer-title {
  font-family: var(--ads-font-family);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: var(--ads-line-height-tight);
}

.ads-footer-tagline {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-small);
  opacity: 0.8;
}

/* Footer Navigation */
.ads-footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ads-space-4);
}

.ads-footer-nav-section {
  min-width: 150px;
}

.ads-footer-nav-title {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  font-weight: 700;
  margin: 0 0 var(--ads-space-2) 0;
  color: var(--ads-text-inverse);
}

.ads-footer-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ads-footer-nav-list li {
  margin-bottom: var(--ads-space-1);
}

.ads-footer-link {
  color: var(--ads-text-inverse);
  text-decoration: none;
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-small);
  opacity: 0.9;
  transition: opacity var(--ads-transition-fast);
  display: inline-block;
  padding: var(--ads-space-1) 0;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.ads-footer-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.ads-footer-link:focus {
  outline: var(--ads-focus-ring);
  outline-offset: var(--ads-focus-offset);
  opacity: 1;
}

/* Footer Bottom */
.ads-footer-bottom {
  padding-top: var(--ads-space-3);
  text-align: center;
}

.ads-footer-copyright {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-small);
  margin: 0 0 var(--ads-space-1) 0;
  font-weight: 600;
}

.ads-footer-legal {
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-small);
  margin: 0;
  opacity: 0.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.ads-footer-inline-link {
  color: var(--ads-text-inverse);
  text-decoration: underline;
}

.ads-footer-inline-link:hover {
  opacity: 0.9;
}

.ads-footer-inline-link:focus {
  outline: var(--ads-focus-ring);
  outline-offset: var(--ads-focus-offset);
}

/* Responsive Styles (ABD-001-004) */
@media screen and (max-width: 768px) {
  .ads-footer-main {
    flex-direction: column;
    gap: var(--ads-space-3);
  }
  
  .ads-footer-nav {
    width: 100%;
    justify-content: space-between;
  }
}

@media screen and (max-width: 480px) {
  .ads-footer-container {
    padding: var(--ads-space-3) var(--ads-space-2);
  }
  
  .ads-footer-nav {
    flex-direction: column;
    gap: var(--ads-space-3);
  }
  
  .ads-footer-branding {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .ads-footer-branding-text {
    align-items: center;
  }
}
</style>
