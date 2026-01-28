/**
 * Email Service Utility - Google Cloud Functions (SMTP)
 * Handles email sending via Google Cloud Functions serverless endpoint
 * This is the primary and only email method for the contact form
 */

import { wrapWithCorsProxy } from './corsProxy.js'

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

  // Wrap with CORS proxy for local development only
  const proxiedEndpoint = wrapWithCorsProxy(endpoint)

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
  
  const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV

  if (isDev) {
    console.log('Sending email via Google Cloud Functions (SMTP):')
    console.log('  - Endpoint:', endpoint)
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  if (apiKey) {
    headers['X-API-Key'] = apiKey
  }

  try {
    if (isDev) {
      // Log payload with message redacted (privacy); avoid logging huge pastes
      const safePayload = { ...payload, message: payload.message ? `[${payload.message.length} chars]` : '' }
      console.log('📤 Fetching endpoint:', proxiedEndpoint)
      console.log('📤 Payload:', JSON.stringify(safePayload, null, 2))
    }
    
    const response = await fetch(proxiedEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    })

    if (isDev) {
      console.log('📥 Response status:', response.status, response.statusText)
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    let data

    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      const text = await response.text()
      if (isDev) console.log('📥 Response text (non-JSON):', text)
      data = { message: text || 'Email sent successfully' }
    }

    if (isDev) console.log('📥 Response data:', data)

    if (!response.ok) {
      const errorMsg = data.error || data.message || `HTTP error! status: ${response.status}`
      if (isDev) console.error('❌ HTTP Error:', errorMsg)
      throw new Error(errorMsg)
    }

    return {
      success: true,
      message: data.message || 'Email sent successfully'
    }
  } catch (error) {
    if (isDev) {
      console.error('❌ SMTP Email Service Error:', error)
      console.error('❌ Error details:', { message: error.message, stack: error.stack, name: error.name })
    }
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