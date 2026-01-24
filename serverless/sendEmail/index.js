/**
 * Google Cloud Function: Send Email via Gmail SMTP
 * 
 * This function receives contact form submissions and sends them via Gmail SMTP
 * for the portfolio contact form.
 * 
 * Environment Variables Required:
 * - GMAIL_USER: Your Gmail address
 * - GMAIL_APP_PASSWORD: Gmail App Password (16-character)
 * - TO_EMAIL: Recipient email address (where emails should be sent)
 * 
 * Optional:
 * - API_KEY: Optional API key for function authentication (check via X-API-Key header)
 */

const nodemailer = require('nodemailer');
const functions = require('@google-cloud/functions-framework');

functions.http('sendEmail', async (req, res) => {
  // CORS handling - Allow requests from your portfolio domain
  const allowedOrigins = [
    'https://devwithwaqas.github.io',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:5173'
  ];
  
  // Get origin from request (case-insensitive)
  const origin = req.get('origin') || req.get('Origin') || '';
  
  // Set CORS headers - ALWAYS set them
  // If origin is in allowed list, use it; otherwise allow all (for now)
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  } else {
    // Allow all origins for now (you can restrict this later)
    // This ensures CORS works from any origin
    res.set('Access-Control-Allow-Origin', '*');
  }
  
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');
  res.set('Access-Control-Max-Age', '3600');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.' 
    });
  }

  // Optional: API Key authentication
  if (process.env.API_KEY) {
    const apiKey = req.get('X-API-Key');
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({ 
        success: false,
        error: 'Unauthorized. Invalid API key.' 
      });
    }
  }

  // Extract and validate request body
  const { name, email, subject, message, timezone, timestamp, userAgent, language } = req.body;
  
  // DEBUG: Log what we received from client
  console.log('📥 REQUEST BODY RECEIVED:');
  console.log('  - timestamp:', timestamp, '(type:', typeof timestamp, ', exists:', !!timestamp, ')');
  console.log('  - timezone:', timezone, '(type:', typeof timezone, ', exists:', !!timezone, ')');
  console.log('  - userAgent:', userAgent);
  console.log('  - language:', language);
  console.log('  - Full body keys:', Object.keys(req.body));
  console.log('  - Full body:', JSON.stringify(req.body, null, 2));

  // Validation - Check all required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false,
      error: 'Missing required fields. Please provide: name, email, subject, message' 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid email format' 
    });
  }

  // Check environment variables
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const toEmail = process.env.TO_EMAIL;

  if (!gmailUser || !gmailAppPassword || !toEmail) {
    console.error('Missing required environment variables:', {
      GMAIL_USER: !!gmailUser,
      GMAIL_APP_PASSWORD: !!gmailAppPassword,
      TO_EMAIL: !!toEmail
    });
    return res.status(500).json({ 
      success: false,
      error: 'Server configuration error. Please contact the administrator.' 
    });
  }

  // Create Gmail SMTP transporter
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword
      }
    });

    // Verify connection
    await transporter.verify();
  } catch (error) {
    console.error('SMTP Connection Error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to connect to email service' 
    });
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
      console.log('🔄 Processing client timestamp...');
      console.log('  Input timestamp (from client):', timestamp);
      console.log('  Input timezone (from client):', timezone);
      
      // Parse the ISO timestamp sent from client (it's when they clicked send)
      const clientDate = new Date(timestamp);
      console.log('  Parsed Date object:', clientDate.toISOString());
      
      // Format in USER'S timezone with 12-hour format
      const dateStr = clientDate.toLocaleString('en-US', {
        timeZone: timezone, // Convert UTC to user's timezone
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',      // Use 'numeric' for 12-hour format (not '2-digit')
        minute: '2-digit',
        second: '2-digit',
        hour12: true         // 12-hour format
      });
      
      console.log('  Formatted in timezone:', dateStr);
      
      // Get GMT offset
      const tzFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeZoneName: 'longOffset'
      });
      
      const tzParts = tzFormatter.formatToParts(clientDate);
      const tzNamePart = tzParts.find(p => p.type === 'timeZoneName');
      
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
      
      // Final string: "Friday, January 16, 2026 at 2:17:00 PM GMT+4"
      userTimestamp = `${dateStr} ${gmtOffset || ''}`.trim();
      
      console.log('✅ FINAL TIMESTAMP STRING:', userTimestamp);
      console.log('  GMT Offset:', gmtOffset);
      console.log('  Location:', locationName);
    } catch (e) {
      console.error('❌ Error:', e.message);
      console.error(e.stack);
    }
  } else {
    console.warn('⚠️ Missing timestamp or timezone from client');
  }
  
  // Ensure it's always a string
  userTimestamp = String(userTimestamp || serverTimestamp);
  
  // HTML Email Template - Premium Design
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
                        🕐 View Current Time in ${locationName}
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
                                  ${name}
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
                                <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 600; border-bottom: 2px solid rgba(102, 126, 234, 0.3); padding-bottom: 2px; transition: all 0.2s;">
                                  ${email}
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
                                  ${subject}
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
                                  📍 ${locationName} (${gmtOffset})
                                </p>
                                ` : timezone ? `
                                <p style="margin: 4px 0 0 0; color: #718096; font-size: 12px; font-weight: 400;">
                                  Timezone: ${timezone}
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
                                  ${timezone}
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
                                  ${language}
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
${message}
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
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="height:52px;v-text-anchor:middle;width:220px;" arcsize="12%" stroke="f" fillcolor="#667eea">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">✉️ Reply to ${name}</center>
                    </v:roundrect>
                    <![endif]-->
                    <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); color: #ffffff; text-decoration: none; padding: 16px 42px; border-radius: 12px; font-size: 16px; font-weight: 700; letter-spacing: 0.5px; box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1); border: none;">
                      ✉️ Reply to ${name}
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

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      to: toEmail,
      from: email
    });

    return res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('SMTP Send Error:', error);
    
    // Return user-friendly error message
    return res.status(500).json({ 
      success: false,
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
