<template>
  <!--
    Welcome Page (E-001)
    Requirements:
    - E-001-001: Welcome message for users
    - E-001-002: Brief description of application purpose
    - E-001-003: Primary action button to continue
    - ABD-001 Compliant: Focus states, H1 exclusive, 8px grid, responsive
  -->
  <main id="main-content" class="welcome-page" role="main">
    <div class="ads-container">
      <section class="welcome-content ads-section" aria-labelledby="page-title">
        <!-- H1 Header - Only ONE per page (ABD-001-002) -->
        <H1Header
          title="Welcome to Alberta Services"
          subtitle="Your gateway to provincial services"
          header-id="page-title"
        />
        
        <!-- E-001-002: Brief description of application purpose -->
        <div class="welcome-description">
          <p>
            This application provides easy access to Alberta government services.
            We are committed to making your experience simple, accessible, and efficient.
          </p>
          <p>
            Our platform is designed following the Alberta Design System standards,
            ensuring accessibility for all Albertans.
          </p>
        </div>
        
        <!-- E-001-003: Primary action button to continue -->
        <div class="welcome-actions">
          <button
            type="button"
            class="ads-btn ads-btn-primary"
            @click="handleContinue"
            aria-describedby="continue-description"
          >
            Continue to Application
          </button>
          <span id="continue-description" class="visually-hidden">
            Proceed to the main application response page
          </span>
        </div>
        
        <!-- Additional information section -->
        <aside class="welcome-info" aria-label="Additional information">
          <h2>What you can do</h2>
          <ul class="feature-list">
            <li>Access government services online</li>
            <li>Submit applications and forms</li>
            <li>Track your requests</li>
            <li>Get support when you need it</li>
          </ul>
        </aside>
      </section>
    </div>
  </main>
</template>

<script>
import H1Header from '../components/H1Header.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'WelcomePage',
  components: {
    H1Header
  },
  setup() {
    const router = useRouter()
    
    const handleContinue = () => {
      router.push({ name: 'Response' })
    }
    
    return {
      handleContinue
    }
  }
}
</script>

<style scoped>
.welcome-page {
  min-height: 100vh;
  background-color: var(--ads-bg-primary);
}

.welcome-content {
  max-width: 800px;
  margin: 0 auto;
}

.welcome-description {
  margin-bottom: var(--ads-space-4);
}

.welcome-description p {
  font-size: var(--ads-font-size-body);
  line-height: var(--ads-line-height-relaxed);
  color: var(--ads-text-primary);
  margin-bottom: var(--ads-space-2);
}

.welcome-actions {
  margin-bottom: var(--ads-space-6);
}

.welcome-info {
  background-color: var(--ads-bg-secondary);
  padding: var(--ads-space-3);
  border-radius: var(--ads-radius-md);
  border-left: 4px solid var(--ads-blue);
}

.welcome-info h2 {
  font-size: var(--ads-font-size-h3);
  margin-bottom: var(--ads-space-2);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: var(--ads-space-3);
  margin-bottom: var(--ads-space-1);
  line-height: var(--ads-line-height-normal);
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 8px;
  height: 8px;
  background-color: var(--ads-blue);
  border-radius: 50%;
}

/* Responsive Styles (ABD-001-004) */
@media screen and (max-width: 768px) {
  .welcome-content {
    padding: 0 var(--ads-space-2);
  }
  
  .welcome-info {
    padding: var(--ads-space-2);
  }
}

@media screen and (max-width: 480px) {
  .welcome-actions {
    margin-bottom: var(--ads-space-4);
  }
  
  .welcome-info h2 {
    font-size: var(--ads-font-size-body);
    font-weight: 600;
  }
}
</style>
