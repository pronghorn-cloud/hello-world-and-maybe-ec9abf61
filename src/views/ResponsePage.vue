<template>
  <!--
    Response Page (E-003)
    Requirements:
    - E-003-001: Display confirmation message
    - E-003-002: Show summary of submitted information
    - E-003-003: Provide next steps or actions
    - ABD-001 Compliant: Focus states, H1 exclusive, 8px grid, responsive
  -->
  <main id="main-content" class="response-page" role="main">
    <div class="ads-container">
      <section class="response-content ads-section" aria-labelledby="page-title">
        <!-- H1 Header - Only ONE per page (ABD-001-002) -->
        <H1Header
          title="Response Received"
          subtitle="Thank you for your submission"
          header-id="page-title"
        />
        
        <!-- E-003-001: Display confirmation message -->
        <div class="confirmation-message" role="status" aria-live="polite">
          <div class="confirmation-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#005A9C"/>
              <path d="M20 24L23 27L28 21" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="confirmation-text">
            Your information has been successfully submitted. A confirmation has been sent to your email address.
          </p>
        </div>
        
        <!-- E-003-002: Show summary of submitted information -->
        <div class="submission-summary">
          <h2>Submission Summary</h2>
          <dl class="summary-list">
            <div class="summary-item">
              <dt>Reference Number</dt>
              <dd>{{ referenceNumber }}</dd>
            </div>
            <div class="summary-item">
              <dt>Submission Date</dt>
              <dd>{{ submissionDate }}</dd>
            </div>
            <div class="summary-item">
              <dt>Status</dt>
              <dd>
                <span class="status-badge status-received">Received</span>
              </dd>
            </div>
          </dl>
        </div>
        
        <!-- E-003-003: Provide next steps or actions -->
        <div class="next-steps">
          <h2>Next Steps</h2>
          <ol class="steps-list">
            <li>
              <strong>Confirmation Email:</strong> Check your inbox for a detailed confirmation email.
            </li>
            <li>
              <strong>Processing Time:</strong> Your submission will be reviewed within 5 business days.
            </li>
            <li>
              <strong>Updates:</strong> You will receive email notifications about the status of your submission.
            </li>
          </ol>
        </div>
        
        <!-- Action buttons -->
        <div class="response-actions">
          <button
            type="button"
            class="ads-btn ads-btn-primary"
            @click="handlePrint"
          >
            Print Confirmation
          </button>
          <button
            type="button"
            class="ads-btn ads-btn-secondary"
            @click="handleReturnHome"
          >
            Return to Home
          </button>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import H1Header from '../components/H1Header.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

export default {
  name: 'ResponsePage',
  components: {
    H1Header
  },
  setup() {
    const router = useRouter()
    const referenceNumber = ref('')
    const submissionDate = ref('')
    
    const generateReferenceNumber = () => {
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 6).toUpperCase()
      return `AB-${timestamp}-${random}`
    }
    
    const formatDate = () => {
      return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date())
    }
    
    const handlePrint = () => {
      window.print()
    }
    
    const handleReturnHome = () => {
      router.push({ name: 'Welcome' })
    }
    
    onMounted(() => {
      referenceNumber.value = generateReferenceNumber()
      submissionDate.value = formatDate()
    })
    
    return {
      referenceNumber,
      submissionDate,
      handlePrint,
      handleReturnHome
    }
  }
}
</script>

<style scoped>
.response-page {
  min-height: 100vh;
  background-color: var(--ads-bg-primary);
}

.response-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Confirmation Message (E-003-001) */
.confirmation-message {
  display: flex;
  align-items: flex-start;
  gap: var(--ads-space-2);
  background-color: #E8F4FD;
  border: 2px solid var(--ads-blue);
  border-radius: var(--ads-radius-md);
  padding: var(--ads-space-3);
  margin-bottom: var(--ads-space-4);
}

.confirmation-icon {
  flex-shrink: 0;
}

.confirmation-text {
  font-size: var(--ads-font-size-body);
  line-height: var(--ads-line-height-relaxed);
  color: var(--ads-text-primary);
  margin: 0;
  padding-top: var(--ads-space-1);
}

/* Submission Summary (E-003-002) */
.submission-summary {
  background-color: var(--ads-bg-secondary);
  border-radius: var(--ads-radius-md);
  padding: var(--ads-space-3);
  margin-bottom: var(--ads-space-4);
}

.submission-summary h2 {
  font-size: var(--ads-font-size-h3);
  margin-bottom: var(--ads-space-2);
}

.summary-list {
  display: grid;
  gap: var(--ads-space-2);
  margin: 0;
}

.summary-item {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ads-space-1);
  padding-bottom: var(--ads-space-2);
  border-bottom: 1px solid var(--ads-divider);
}

.summary-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.summary-item dt {
  font-weight: 600;
  color: var(--ads-text-secondary);
  min-width: 160px;
}

.summary-item dd {
  margin: 0;
  color: var(--ads-text-primary);
}

.status-badge {
  display: inline-block;
  padding: var(--ads-space-1) var(--ads-space-2);
  border-radius: var(--ads-radius-sm);
  font-size: var(--ads-font-size-small);
  font-weight: 600;
}

.status-received {
  background-color: #D4EDDA;
  color: #155724;
}

/* Next Steps (E-003-003) */
.next-steps {
  margin-bottom: var(--ads-space-4);
}

.next-steps h2 {
  font-size: var(--ads-font-size-h3);
  margin-bottom: var(--ads-space-2);
}

.steps-list {
  padding-left: var(--ads-space-3);
  margin: 0;
}

.steps-list li {
  margin-bottom: var(--ads-space-2);
  line-height: var(--ads-line-height-relaxed);
}

.steps-list li strong {
  color: var(--ads-blue);
}

/* Action Buttons */
.response-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--ads-space-2);
}

/* Responsive Styles (ABD-001-004) */
@media screen and (max-width: 768px) {
  .response-content {
    padding: 0 var(--ads-space-2);
  }
  
  .confirmation-message {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .summary-item {
    flex-direction: column;
    gap: 0;
  }
  
  .summary-item dt {
    min-width: auto;
  }
}

@media screen and (max-width: 480px) {
  .response-actions {
    flex-direction: column;
  }
  
  .response-actions .ads-btn {
    width: 100%;
  }
}

/* Print Styles */
@media print {
  .response-actions {
    display: none;
  }
  
  .response-page {
    min-height: auto;
  }
}
</style>
