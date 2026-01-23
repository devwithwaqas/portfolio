/**
 * Email Service Utility - Google Cloud Functions (SMTP)
 * Handles email sending via Google Cloud Functions serverless endpoint
 * This is the primary and only email method for the contact form
 */

/**
 * Send email via Google Cloud Functions SMTP endpoint
 * @param {Object} formData - Form data containing name, email, subject, message, timezone, timestamp, etc.
 * @param {Object} config - SMTP configuration (endpoint, apiKey)
 * @returns {Promise<Object>} - Success/error response
 */
export async function sendEmailViaSMTP(formData, config) {
  const { endpoint, apiKey } = config

  if (!endpoint) {
    throw new Error('SMTP endpoint is not configured')
  }

  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    throw new Error('Missing required form fields')
  }

  const payload = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim()
  }
  
  if (formData.timezone) payload.timezone = formData.timezone
  if (formData.timestamp) payload.timestamp = formData.timestamp
  if (formData.userAgent) payload.userAgent = formData.userAgent
  if (formData.language) payload.language = formData.language
  
  console.log('Sending email via Google Cloud Functions (SMTP):')
  console.log('  - Endpoint:', endpoint)

  const headers = {
    'Content-Type': 'application/json'
  }

  if (apiKey) {
    headers['X-API-Key'] = apiKey
  }

  try {
    console.log('📤 Fetching endpoint:', endpoint)
    console.log('📤 Payload:', JSON.stringify(payload, null, 2))
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })

    console.log('📥 Response status:', response.status, response.statusText)
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      // If not JSON, read as text
      const text = await response.text()
      console.log('📥 Response text (non-JSON):', text)
      data = { message: text || 'Email sent successfully' }
    }

    console.log('📥 Response data:', data)

    if (!response.ok) {
      const errorMsg = data.error || data.message || `HTTP error! status: ${response.status}`
      console.error('❌ HTTP Error:', errorMsg)
      throw new Error(errorMsg)
    }

    return {
      success: true,
      message: data.message || 'Email sent successfully'
    }
  } catch (error) {
    console.error('❌ SMTP Email Service Error:', error)
    console.error('❌ Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    throw new Error(error.message || 'Failed to send email via SMTP')
  }
}

/**
 * Validate SMTP configuration
 * @param {Object} config - SMTP configuration
 * @returns {boolean} - True if configuration is valid
 */
export function isSMTPConfigured(config) {
  return !!(config && config.endpoint && config.endpoint.trim())
}