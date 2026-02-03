import { ref } from 'vue'

export function useApi() {
  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)

  const request = async (url, options = {}) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      data.value = await response.json()
      return data.value
    } catch (err) {
      error.value = err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = (url, options = {}) => {
    return request(url, { ...options, method: 'GET' })
  }

  const post = (url, body, options = {}) => {
    return request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    })
  }

  const put = (url, body, options = {}) => {
    return request(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  const del = (url, options = {}) => {
    return request(url, { ...options, method: 'DELETE' })
  }

  return {
    loading,
    error,
    data,
    get,
    post,
    put,
    del
  }
}
