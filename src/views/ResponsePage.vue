<template>
  <!--
    Response Page (E-003)
    Requirements:
    - E-003-F-001: Form Data Capture and Processing
    - E-003-F-002: Page Header Display
    - E-003-F-003: Dynamic Greeting Message Display
    - E-003-F-004: Back Navigation Button
    - E-003-F-005: Input Data Validation and Sanitization
    - E-003-F-006: Error Handling and Empty Statement Management
    - E-003-F-007: Responsive Page Layout and Styling
    - ABD-001 Compliant: Focus states, H1 exclusive, 8px grid, responsive
  -->
  <main id="main-content" class="response-page" role="main">
    <div class="ads-container">
      <section class="response-content ads-section" aria-labelledby="page-title">
        <!-- E-003-F-004: Back Navigation Button -->
        <nav class="back-navigation" aria-label="Page navigation">
          <button
            type="button"
            class="back-btn"
            @click="handleBack"
            aria-describedby="back-description"
          >
            <svg 
              class="back-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M12.5 15L7.5 10L12.5 5" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              />
            </svg>
            <span>Back to Welcome</span>
          </button>
          <span id="back-description" class="visually-hidden">
            Return to the welcome page to edit your information
          </span>
        </nav>
        
        <!-- E-003-F-002: Page Header Display -->
        <H1Header
          :title="pageTitle"
          :subtitle="pageSubtitle"
          header-id="page-title"
        />
        
        <!-- E-003-F-006: Error Handling - No Data State -->
        <div v-if="hasError" class="error-state" role="alert">
          <div class="error-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="#D91E18"/>
              <path d="M24 14V26" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <circle cx="24" cy="32" r="2" fill="white"/>
            </svg>
          </div>
          <h2 class="error-title">Missing Information</h2>
          <p class="error-message">{{ errorMessage }}</p>
          <button
            type="button"
            class="ads-btn ads-btn-primary"
            @click="handleBack"
          >
            Go Back and Complete Form
          </button>
        </div>
        
        <!-- Main Content - Only shown when data is valid -->
        <template v-else>
          <!-- E-003-F-003: Dynamic Greeting Message Display -->
          <div class="greeting-message" role="status" aria-live="polite">
            <div class="greeting-icon" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#005A9C"/>
                <path d="M20 24L23 27L28 21" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="greeting-content">
              <p class="greeting-text">
                Hello, <strong>{{ sanitizedName }}</strong>! Thank you for submitting your information.
              </p>
              <p class="greeting-subtext">
                Your submission has been received and is being processed.
              </p>
            </div>
          </div>
          
          <!-- E-003-F-001: Form Data Capture and Processing -->
          <div class="submission-summary">
            <h2>Submission Details</h2>
            <dl class="summary-list">
              <div class="summary-item">
                <dt>Name</dt>
                <dd>{{ sanitizedName }}</dd>
              </div>
              <div class="summary-item">
                <dt>Selected Date</dt>
                <dd>{{ formattedDate }}</dd>
              </div>
              <div class="summary-item">
                <dt>Reference Number</dt>
                <dd>{{ referenceNumber }}</dd>
              </div>
              <div class="summary-item">
                <dt>Submission Time</dt>
                <dd>{{ submissionTime }}</dd>
              </div>
              <div class="summary-item">
                <dt>Status</dt>
                <dd>
                  <span class="status-badge status-received">Received</span>
                </dd>
              </div>
            </dl>
          </div>
          
          <!-- Next Steps Section -->
          <div class="next-steps">
            <h2>What Happens Next</h2>
            <ol class="steps-list">
              <li>
                <strong>Confirmation:</strong> A confirmation has been recorded with the details above.
              </li>
              <li>
                <strong>Processing:</strong> Your information will be reviewed within 5 business days.
              </li>
              <li>
                <strong>Follow-up:</strong> You may be contacted if additional information is required.
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
              @click="handleStartNew"
            >
              Start New Submission
            </button>
          </div>
        </template>
      </section>
    </div>
  </main>
</template>

<script>
import H1Header from '../components/H1Header.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'ResponsePage',
  components: {
    H1Header
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // Form data from query params
    const name = ref('')
    const date = ref('')
    
    // Page state
    const referenceNumber = ref('')
    const submissionTime = ref('')
    const hasError = ref(false)
    const errorMessage = ref('')
    
    // E-003-F-005: Input Data Validation and Sanitization
    const sanitizeInput = (input) => {
      if (!input || typeof input !== 'string') return ''
      // Remove HTML tags and trim whitespace
      return input
        .replace(/<[^>]*>/g, '')
        .replace(/[<>"'&]/g, '')
        .trim()
        .substring(0, 100) // Limit length
    }
    
    const sanitizedName = computed(() => {
      return sanitizeInput(name.value)
    })
    
    const formattedDate = computed(() => {
      if (!date.value) return 'Not provided'
      try {
        const dateObj = new Date(date.value + 'T00:00:00')
        if (isNaN(dateObj.getTime())) return 'Invalid date'
        return new Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(dateObj)
      } catch {
        return 'Invalid date'
      }
    })
    
    // Dynamic page content based on data state
    const pageTitle = computed(() => {
      if (hasError.value) return 'Submission Incomplete'
      return 'Submission Received'
    })
    
    const pageSubtitle = computed(() => {
      if (hasError.value) return 'Please complete the required information'
      return 'Thank you for your submission'
    })
    
    // Generate reference number
    const generateReferenceNumber = () => {
      const timestamp = Date.now().toString(36).toUpperCase()
      const random = Math.random().toString(36).substring(2, 6).toUpperCase()
      return `AB-${timestamp}-${random}`
    }
    
    // Format current time
    const formatSubmissionTime = () => {
      return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date())
    }
    
    // E-003-F-001: Form Data Capture and Processing
    const processFormData = () => {
      // Get data from query params
      const queryName = route.query.name
      const queryDate = route.query.date
      
      // Validate and sanitize
      name.value = sanitizeInput(queryName)
      date.value = queryDate || ''
      
      // E-003-F-006: Error Handling and Empty Statement Management
      if (!name.value) {
        hasError.value = true
        errorMessage.value = 'Your name was not provided. Please go back and complete the form.'
        return
      }
      
      if (!date.value) {
        hasError.value = true
        errorMessage.value = 'A date was not selected. Please go back and complete the form.'
        return
      }
      
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (!dateRegex.test(date.value)) {
        hasError.value = true
        errorMessage.value = 'The date format is invalid. Please go back and select a valid date.'
        return
      }
      
      // All validations passed
      hasError.value = false
      referenceNumber.value = generateReferenceNumber()
      submissionTime.value = formatSubmissionTime()
    }
    
    // E-003-F-004: Back Navigation
    const handleBack = () => {
      router.push({ name: 'Welcome' })
    }
    
    const handlePrint = () => {
      window.print()
    }
    
    const handleStartNew = () => {
      router.push({ name: 'Welcome' })
    }
    
    onMounted(() => {
      processFormData()
    })
    
    return {
      sanitizedName,
      formattedDate,
      referenceNumber,
      submissionTime,
      hasError,
      errorMessage,
      pageTitle,
      pageSubtitle,
      handleBack,
      handlePrint,
      handleStartNew
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

/* E-003-F-004: Back Navigation Button */
.back-navigation {
  margin-bottom: var(--ads-space-3);
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--ads-space-1);
  padding: var(--ads-space-1) var(--ads-space-2);
  font-family: var(--ads-font-family);
  font-size: var(--ads-font-size-body);
  font-weight: 600;
  color: var(--ads-blue);
  background: transparent;
  border: none;
  border-radius: var(--ads-radius-sm);
  cursor: pointer;
  transition: all var(--ads-transition-fast);
  min-height: 44px;
}

.back-btn:hover {
  background-color: var(--ads-bg-secondary);
  color: var(--ads-circle-blue);
}

.back-btn:focus {
  outline: var(--ads-focus-ring);
  outline-offset: var(--ads-focus-offset);
}

.back-icon {
  flex-shrink: 0;
}

/* E-003-F-006: Error State */
.error-state {
  text-align: center;
  padding: var(--ads-space-6) var(--ads-space-3);
  background-color: #FDECEA;
  border: 2px solid #D91E18;
  border-radius: var(--ads-radius-md);
  margin-bottom: var(--ads-space-4);
}

.error-icon {
  margin-bottom: var(--ads-space-3);
}

.error-title {
  font-size: var(--ads-font-size-h3);
  color: #D91E18;
  margin-bottom: var(--ads-space-2);
}

.error-message {
  font-size: var(--ads-font-size-body);
  color: var(--ads-text-primary);
  margin-bottom: var(--ads-space-4);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

/* E-003-F-003: Greeting Message */
.greeting-message {
  display: flex;
  align-items: flex-start;
  gap: var(--ads-space-2);
  background-color: #E8F4FD;
  border: 2px solid var(--ads-blue);
  border-radius: var(--ads-radius-md);
  padding: var(--ads-space-3);
  margin-bottom: var(--ads-space-4);
}

.greeting-icon {
  flex-shrink: 0;
}

.greeting-content {
  flex: 1;
}

.greeting-text {
  font-size: var(--ads-font-size-body);
  line-height: var(--ads-line-height-relaxed);
  color: var(--ads-text-primary);
  margin: 0 0 var(--ads-space-1) 0;
}

.greeting-text strong {
  color: var(--ads-blue);
}

.greeting-subtext {
  font-size: var(--ads-font-size-small);
  color: var(--ads-text-secondary);
  margin: 0;
}

/* Submission Summary */
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

/* Next Steps */
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

/* E-003-F-007: Responsive Styles (ABD-001-004) */
@media screen and (max-width: 768px) {
  .response-content {
    padding: 0 var(--ads-space-2);
  }
  
  .greeting-message {
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
  .error-state {
    padding: var(--ads-space-4) var(--ads-space-2);
  }
  
  .response-actions {
    flex-direction: column;
  }
  
  .response-actions .ads-btn {
    width: 100%;
  }
}

/* Print Styles */
@media print {
  .back-navigation,
  .response-actions {
    display: none;
  }
  
  .response-page {
    min-height: auto;
  }
  
  .greeting-message,
  .submission-summary {
    border: 1px solid #333;
  }
}
</style>
