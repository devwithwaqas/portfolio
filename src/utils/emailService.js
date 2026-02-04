/**
 * SMTP Email Service Utility
 * Handles email sending via serverless function fallback
 * Used when EmailJS fails or feature flag is enabled
 */

/**
 * Send email via SMTP fallback endpoint
 * @param {Object} formData - Form data containing name, email, subject, message
 * @param {Object} config - SMTP configuration (endpoint, apiKey)
 * @returns {Promise<Object>} - Success/error response
 */
export async function sendEmailViaSMTP(formData, config) {
  const { endpoint, apiKey } = config

  // Validate endpoint
  if (!endpoint) {
    throw new Error('SMTP endpoint is not configured')
  }

  // Validate form data
  if (!formData.name || !formData.email || !formData.subject || !formData.message) {
    throw new Error('Missing required form fields')
  }

  // Prepare request payload - ALWAYS include timestamp and timezone if they exist
  const payload = {
    name: formData.name.trim(),
    email: formData.email.trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim()
  }
  
  // Add metadata fields if they exist (don't use spread with condition - always include)
  if (formData.timezone) payload.timezone = formData.timezone
  if (formData.timestamp) payload.timestamp = formData.timestamp
  if (formData.userAgent) payload.userAgent = formData.userAgent
  if (formData.language) payload.language = formData.language
  
  console.log('📤 SMTP Payload being sent to server:')
  console.log('  - Has timestamp:', !!payload.timestamp, payload.timestamp)
  console.log('  - Has timezone:', !!payload.timezone, payload.timezone)
  console.log('  - Full payload:', JSON.stringify(payload, null, 2))

  // Prepare request headers
  const headers = {
    'Content-Type': 'application/json'
  }

  // Add API key to headers if provided
  if (apiKey) {
    headers['X-API-Key'] = apiKey
  }

  try {
    // Send POST request to serverless function
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })

    // Parse response
    const data = await response.json()

    // Check if request was successful
    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    // Return success response
    return {
      success: true,
      message: data.message || 'Email sent successfully'
    }
  } catch (error) {
    // Handle network errors or parsing errors
    console.error('SMTP Email Service Error:', error)
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
