import { ref } from 'vue';

/**
 * useApi Composable
 * Provides reactive state management for API calls
 */
export const useApi = () => {
  const isLoading = ref(false);
  const error = ref(null);
  const data = ref(null);

  /**
   * Executes an async API call with loading and error state management
   * @param {Function} asyncFn - The async function to execute
   * @returns {Promise<any>} - The result of the async function
   */
  const execute = async (asyncFn) => {
    isLoading.value = true;
    error.value = null;
    data.value = null;

    try {
      const result = await asyncFn();
      data.value = result;
      return result;
    } catch (err) {
      error.value = err.message || 'An unexpected error occurred';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Resets all state to initial values
   */
  const reset = () => {
    isLoading.value = false;
    error.value = null;
    data.value = null;
  };

  return {
    isLoading,
    error,
    data,
    execute,
    reset,
  };
};

export default useApi;
