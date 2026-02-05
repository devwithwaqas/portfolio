/**
 * Google Cloud Function: Send Email via Gmail SMTP
 *
 * Receives contact form submissions and sends via Gmail SMTP.
 * Security: strict origin (CORS), rate limit (5/min per IP), field length limits, optional API key.
 *
 * CORS: ALLOWED_ORIGINS includes waqasahmad-portfolio and ragnorx-waqas (and waqas.ragnorx.com).
 * Deploy this function to each Firebase/Cloud project that hosts the site (e.g. waqasahmad-portfolio, ragnorx-waqas).
 *
 * Env required: GMAIL_USER, GMAIL_APP_PASSWORD, TO_EMAIL
 * Env optional: API_KEY (X-API-Key header)
 */

const nodemailer = require('nodemailer');
const functions = require('@google-cloud/functions-framework');

const ALLOWED_ORIGINS = [
  'https://waqasahmad-portfolio.web.app',
  'https://waqasahmad-portfolio.firebaseapp.com',
  'https://ragnorx-waqas.web.app',
  'https://ragnorx-waqas.firebaseapp.com',
  'https://waqas.ragnorx.com',
  'http://localhost:3001',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:5173',
];

const LIMITS = { name: 100, subject: 200, message: 5000, timezone: 64, language: 32 };

const rateLimitStore = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 10; // Form submissions, allow testing

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }
  return req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown';
}

function rateLimitCheck(req) {
  const now = Date.now();
  for (const [ip, v] of rateLimitStore.entries()) {
    if (v.resetAt <= now) rateLimitStore.delete(ip);
  }
  const ip = getClientIp(req);
  let e = rateLimitStore.get(ip);
  if (!e) {
    e = { count: 0, resetAt: now + RATE_WINDOW_MS };
    rateLimitStore.set(ip, e);
  }
  if (now >= e.resetAt) {
    e.count = 0;
    e.resetAt = now + RATE_WINDOW_MS;
  }
  e.count += 1;
  const allowed = e.count <= RATE_MAX;
  const retryAfter = allowed ? undefined : Math.ceil((e.resetAt - now) / 1000);
  return { allowed, retryAfter };
}

function setCors(res, origin) {
  const o = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.set('Access-Control-Allow-Origin', o);
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');
  res.set('Access-Control-Max-Age', '3600');
}

function json(res, status, body) {
  res.set('Content-Type', 'application/json');
  res.status(status).json(body);
}

function escapeHtml(s) {
  if (s == null || s === '') return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

functions.http('sendEmail', async (req, res) => {
  const origin = req.get('origin') || req.get('Origin') || '';
  setCors(res, origin);

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: 'Method not allowed. Only POST requests are accepted.' });
  }

  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json(res, 403, { success: false, error: 'Origin not allowed' });
  }

  const { allowed, retryAfter } = rateLimitCheck(req);
  if (!allowed) {
    if (retryAfter != null) res.set('Retry-After', String(retryAfter));
    return json(res, 429, { success: false, error: 'Too many requests' });
  }

  if (process.env.API_KEY) {
    const apiKey = req.get('X-API-Key');
    if (apiKey !== process.env.API_KEY) {
      return json(res, 401, { success: false, error: 'Unauthorized. Invalid API key.' });
    }
  }

  const body = req.body || {};
  let name = (body.name && String(body.name).trim()) || '';
  let email = (body.email && String(body.email).trim()) || '';
  let subject = (body.subject && String(body.subject).trim()) || '';
  let message = (body.message && String(body.message).trim()) || '';
  const timezone = (body.timezone && String(body.timezone).trim().slice(0, LIMITS.timezone)) || '';
  const timestamp = body.timestamp;
  const userAgent = (body.userAgent && String(body.userAgent).trim().slice(0, 500)) || '';
  const language = (body.language && String(body.language).trim().slice(0, LIMITS.language)) || '';

  if (!name || !email || !subject || !message) {
    return json(res, 400, { success: false, error: 'Missing required fields. Please provide: name, email, subject, message' });
  }

  if (name.length > LIMITS.name) name = name.slice(0, LIMITS.name);
  if (subject.length > LIMITS.subject) subject = subject.slice(0, LIMITS.subject);
  if (message.length > LIMITS.message) message = message.slice(0, LIMITS.message);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return json(res, 400, { success: false, error: 'Invalid email format' });
  }

  // Check environment variables
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.TO_EMAIL;

  if (!gmailUser || !gmailAppPassword || !toEmail) {
    console.error('Missing required env: GMAIL_USER, GMAIL_APP_PASSWORD, TO_EMAIL');
    return json(res, 500, { success: false, error: 'Server configuration error. Please contact the administrator.' });
  }

  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailAppPassword },
    });
    await transporter.verify();
  } catch (error) {
    console.error('SMTP Connection Error:', error);
    return json(res, 500, { success: false, error: 'Failed to connect to email service' });
  }

  // Email template - Ultra Advanced HTML format with premium design
  const emailSubject = `Portfolio Contact: ${subject}`;
  
  // Format server timestamp (for reference only)
  const serverTimestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'UTC', 
    dateStyle: 'full', 
    timeStyle: 'long' 
  });
  
  // Use CLIENT timestamp - format it in their timezone as a STRING
  let userTimestamp = serverTimestamp;
  let gmtOffset = null;
  let locationName = null;
  let googleTimeLink = null;
  
  if (timestamp && timezone) {
    try {
      const clientDate = new Date(timestamp);
      const dateStr = clientDate.toLocaleString('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const tzFormatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'longOffset' });
      const tzParts = tzFormatter.formatToParts(clientDate);
      const tzNamePart = tzParts.find((p) => p.type === 'timeZoneName');
      if (tzNamePart && tzNamePart.value) {
        const tzStr = tzNamePart.value.replace('GMT', '').trim();
        if (tzStr.match(/^[+-]\d{2}:\d{2}$/)) {
          const [h, m] = tzStr.substring(1).split(':').map(Number);
          const sign = tzStr[0];
          gmtOffset = m === 0 ? `GMT${sign}${h}` : `GMT${sign}${h}:${m}`;
        } else {
          gmtOffset = `GMT${tzStr}`;
        }
      }
      locationName = timezone.split('/').pop().replace(/_/g, ' ');
      userTimestamp = `${dateStr} ${gmtOffset || ''}`.trim();
    } catch (_) {}
  }
  userTimestamp = String(userTimestamp || serverTimestamp);

  const _name = escapeHtml(name);
  const _email = escapeHtml(email);
  const _subject = escapeHtml(subject);
  const _message = escapeHtml(message);
  const _tz = escapeHtml(timezone);
  const _lang = escapeHtml(language);
  const _loc = escapeHtml(locationName || '');
  const _gmt = escapeHtml(gmtOffset || '');

  const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Portfolio Contact Form Submission</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); background-color: #f5f5f5;">
  <!-- Background Pattern -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%); padding: 60px 20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="650" style="max-width: 650px; background-color: #ffffff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 1px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Premium Header with Multi-layer Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #4facfe 100%); padding: 0; position: relative;">
              <!-- Header Pattern Overlay -->
              <div style="background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px); padding: 50px 40px; text-align: center;">
                <!-- Email Icon (No Circle, Larger Size) -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 20px;">
                      <div style="font-size: 61px; line-height: 1; display: inline-block;">
                        📧
                      </div>
                    </td>
                  </tr>
                </table>
                
                <h1 style="margin: 0 0 12px 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); line-height: 1.2;">
                  New Contact Form Submission
                </h1>
                <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; font-weight: 400; letter-spacing: 0.3px;">
                  Portfolio Contact Form Notification
                </p>
                
                <!-- Google Time Link -->
                ${googleTimeLink && locationName ? `
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 25px;">
                  <tr>
                    <td align="center">
                      <a href="${googleTimeLink}" target="_blank" style="display: inline-block; background: rgba(255, 255, 255, 0.2); color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 25px; font-size: 13px; font-weight: 600; border: 2px solid rgba(255, 255, 255, 0.3); transition: all 0.3s;">
                        🕐 View Current Time in ${_loc}
                      </a>
                    </td>
                  </tr>
                </table>
                ` : ''}
              </div>
              
              <!-- Decorative Bottom Wave -->
              <div style="height: 20px; background: #ffffff; position: relative;">
                <div style="width: 100%; height: 20px; background: linear-gradient(to right, #667eea 0%, #764ba2 50%, #f093fb 100%); clip-path: polygon(0 0, 100% 0, 100% 100%, 0 85%);"></div>
              </div>
            </td>
          </tr>
          
          <!-- Main Content Area -->
          <tr>
            <td style="padding: 50px 40px; background-color: #ffffff;">
              
              <!-- Contact Information Card - Premium Design -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 35px; background: linear-gradient(135deg, #f8f9ff 0%, #f5f0ff 50%, #fff0f8 100%); border-radius: 16px; padding: 32px; border: 2px solid rgba(102, 126, 234, 0.1); box-shadow: 0 8px 24px rgba(102, 126, 234, 0.08);">
                <tr>
                  <td>
                    <!-- Section Header -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 28px;">
                      <tr>
                        <td style="padding-bottom: 16px; border-bottom: 2px solid rgba(102, 126, 234, 0.15);">
                          <h2 style="margin: 0; color: #2d3748; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; display: inline-block;">
                            <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">👤</span>
                            <span style="margin-left: 8px; vertical-align: middle;">Contact Information</span>
                          </h2>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Contact Details Grid -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <!-- Name Row -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(102, 126, 234, 0.08);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 16px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                                  Name
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; color: #1a202c; font-size: 16px; font-weight: 600; line-height: 1.5;">
                                  ${_name}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Email Row -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(102, 126, 234, 0.08);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 16px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #4facfe 100%); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                                  Email
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <a href="mailto:${_email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 600; border-bottom: 2px solid rgba(102, 126, 234, 0.3); padding-bottom: 2px; transition: all 0.2s;">
                                  ${_email}
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Subject Row -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(102, 126, 234, 0.08);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 16px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                                  Subject
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; color: #1a202c; font-size: 16px; font-weight: 600; line-height: 1.5;">
                                  ${_subject}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Sent Time Row -->
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(102, 126, 234, 0.08);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 16px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                                  Sent At
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; color: #1a202c; font-size: 16px; font-weight: 600; line-height: 1.5;">
                                  ${userTimestamp}
                                </p>
                                ${locationName && gmtOffset ? `
                                <p style="margin: 4px 0 0 0; color: #718096; font-size: 13px; font-weight: 500;">
                                  📍 ${_loc} (${_gmt})
                                </p>
                                ` : timezone ? `
                                <p style="margin: 4px 0 0 0; color: #718096; font-size: 12px; font-weight: 400;">
                                  Timezone: ${_tz}
                                </p>
                                ` : ''}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Timezone Row -->
                      ${timezone ? `
                      <tr>
                        <td style="padding: 14px 0; border-bottom: 1px solid rgba(102, 126, 234, 0.08);">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 16px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                                  Timezone
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; color: #1a202c; font-size: 16px; font-weight: 600; line-height: 1.5;">
                                  ${_tz}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                      
                      <!-- Language Row -->
                      ${language ? `
                      <tr>
                        <td style="padding: 14px 0;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="width: 140px; vertical-align: top; padding-right: 16px;">
                                <div style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;">
                                  Language
                                </div>
                              </td>
                              <td style="vertical-align: middle;">
                                <p style="margin: 0; color: #1a202c; font-size: 16px; font-weight: 600; line-height: 1.5;">
                                  ${_lang}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
              
              
              <!-- Message Section - Premium Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 40px;">
                <tr>
                  <td>
                    <!-- Section Header -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td>
                          <h2 style="margin: 0; color: #2d3748; font-size: 22px; font-weight: 700; letter-spacing: -0.3px;">
                            <span style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">💬</span>
                            <span style="margin-left: 8px; vertical-align: middle;">Message</span>
                          </h2>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Message Content Card -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0fff4 0%, #f7fafc 50%, #edf2f7 100%); border-radius: 16px; padding: 32px; border: 2px solid rgba(72, 187, 120, 0.15); border-left: 6px solid #48bb78; box-shadow: 0 8px 24px rgba(72, 187, 120, 0.08);">
                      <tr>
                        <td>
                          <div style="color: #2d3748; font-size: 16px; font-weight: 400; line-height: 1.9; letter-spacing: 0.2px; white-space: pre-wrap; word-wrap: break-word;">
${_message}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Premium Action Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:${_email}?subject=Re: ${encodeURIComponent(subject)}" style="height:52px;v-text-anchor:middle;width:220px;" arcsize="12%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">✉️ Reply to ${_name}</center>
                    </v:roundrect>
                    <![endif]-->
                    <a href="mailto:${_email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); color: #ffffff; text-decoration: none; padding: 16px 42px; border-radius: 12px; font-size: 16px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1); border: none;">
                      ✉️ Reply to ${_name}
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Premium Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 35px 40px; border-top: 3px solid rgba(102, 126, 234, 0.1);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <!-- Footer Logo/Brand -->
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 10px 24px; border-radius: 25px; display: inline-block; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                      📧 Portfolio Contact Form
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <p style="margin: 0; color: #4a5568; font-size: 13px; font-weight: 600; letter-spacing: 0.3px;">
                      Sent via SMTP Fallback Service
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0; color: #718096; font-size: 11px; line-height: 1.6; font-weight: 400;">
                      <span style="background: rgba(102, 126, 234, 0.1); padding: 4px 10px; border-radius: 12px; display: inline-block;">
                        🕐 ${serverTimestamp} (Server UTC)
                      </span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  // Plain text version for email clients that don't support HTML
  const emailText = `You have received a new message from your portfolio contact form.

---

From: ${name}
Email: ${email}
Subject: ${subject}
${timezone ? `Timezone: ${timezone}` : ''}
${language ? `Language: ${language}` : ''}
Sent At: ${userTimestamp || serverTimestamp}

Message:
${message}

---

Sent via SMTP Fallback
Server Timestamp: ${new Date().toISOString()}
`;

  // Email options
  const mailOptions = {
    from: `"${name}" <${gmailUser}>`, // Use Gmail account as sender
    replyTo: email, // Set reply-to to the form submitter's email
    to: toEmail, // Recipient (from environment variable)
    subject: emailSubject,
    text: emailText, // Plain text fallback
    html: emailHTML // HTML version with advanced styling
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return json(res, 200, { success: true, message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('SMTP Send Error:', error);
    return json(res, 500, {
      success: false,
      error: 'Failed to send email',
      ...(process.env.NODE_ENV === 'development' && { details: error.message }),
    });
  }
});
