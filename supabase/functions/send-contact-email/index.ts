import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactEmailRequest {
  submissionId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  priority: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing contact email request...');

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

    const {
      submissionId,
      name,
      email,
      subject,
      message,
      type,
      priority
    }: ContactEmailRequest = await req.json();

    console.log('Sending emails for submission:', submissionId);

    // Create professional email templates
    const userEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background: #0a0a0a; color: #ffffff; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { text-align: center; margin-bottom: 40px; }
            .logo { background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 20px; border-radius: 16px; display: inline-block; }
            .title { font-size: 24px; font-weight: 700; margin: 20px 0 10px; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .subtitle { color: #888; font-size: 16px; margin-bottom: 30px; }
            .content { background: #111; padding: 30px; border-radius: 12px; border: 1px solid #333; margin: 20px 0; }
            .message-box { background: #1a1a1a; padding: 20px; border-radius: 8px; border-left: 4px solid #6366f1; margin: 20px 0; }
            .footer { text-align: center; margin-top: 40px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="white"/>
                  <path d="M12 20L18 26L28 14" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 class="title">「RE:DO NETWORK」</h1>
              <p class="subtitle">Collaborative Multimedia Platform</p>
            </div>
            
            <div class="content">
              <h2 style="color: #6366f1; margin-top: 0;">Thank you for reaching out!</h2>
              
              <p>Hi ${name},</p>
              
              <p>We've received your message and wanted to confirm it arrived safely. Our team will review your inquiry and respond within 24-48 hours.</p>
              
              <div class="message-box">
                <h3 style="margin-top: 0; color: #8b5cf6;">Your Message Summary:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p><strong>Priority:</strong> ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
                <p><strong>Submission ID:</strong> ${submissionId}</p>
              </div>
              
              <p>In the meantime, feel free to explore our platform and see what the community is building. We're excited about the possibility of collaborating with you!</p>
              
              <div style="text-align: center;">
                <a href="https://redo-network.com" class="button">Visit RE:DO Network</a>
              </div>
            </div>
            
            <div class="footer">
              <p>Best regards,<br>The RE:DO Network Team</p>
              <p style="font-size: 12px; color: #555;">
                This is an automated confirmation. Please don't reply to this email. 
                If you need immediate assistance, please visit our contact page.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background: #f8fafc; color: #1e293b; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
            .content { background: white; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; }
            .priority-high { border-left: 4px solid #ef4444; background: #fef2f2; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .priority-medium { border-left: 4px solid #f59e0b; background: #fffbeb; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .priority-low { border-left: 4px solid #10b981; background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .message-content { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; white-space: pre-wrap; }
            .button { display: inline-block; background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
              <p style="margin: 10px 0 0; opacity: 0.9;">RE:DO Network Admin Dashboard</p>
            </div>
            
            <div class="content">
              <div class="priority-${priority}">
                <h3 style="margin: 0 0 10px; color: ${priority === 'high' ? '#dc2626' : priority === 'medium' ? '#d97706' : '#059669'};">
                  ${priority.toUpperCase()} Priority Submission
                </h3>
                <p style="margin: 0;"><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
              </div>
              
              <h2 style="color: #1e293b; margin-bottom: 5px;">${subject}</h2>
              
              <div style="margin: 20px 0;">
                <p><strong>From:</strong> ${name} (${email})</p>
                <p><strong>Submission ID:</strong> ${submissionId}</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div class="message-content">
                ${message}
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://supabase.com/dashboard/project/ymymenejrasmnhcblsgp/editor" class="button">
                  View in Database
                </a>
                <a href="mailto:${email}?subject=Re: ${subject}" class="button">
                  Reply Directly
                </a>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send confirmation email to user
    const userEmailResponse = await resend.emails.send({
      from: 'RE:DO Network <hello@redo-network.com>',
      to: [email],
      subject: `Message received: ${subject}`,
      html: userEmailHtml,
    });

    console.log('User confirmation email sent:', userEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: 'RE:DO Contact Form <noreply@redo-network.com>',
      to: ['contact@redo-network.com'], // Replace with actual admin email
      subject: `[${priority.toUpperCase()}] New ${type} inquiry: ${subject}`,
      html: adminEmailHtml,
    });

    console.log('Admin notification email sent:', adminEmailResponse);

    // Update submission with email status
    await supabaseClient
      .from('contact_submissions')
      .update({
        updated_at: new Date().toISOString()
      })
      .eq('id', submissionId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        userEmail: userEmailResponse,
        adminEmail: adminEmailResponse 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-contact-email function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to send contact form emails'
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);