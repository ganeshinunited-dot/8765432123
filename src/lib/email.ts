// Email abstraction: driver selected via EMAIL_DRIVER (log | smtp | resend).
// Templates use {{placeholders}}. In dev the `log` driver prints to stdout.

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const TEMPLATES: Record<string, { subject: string; body: string }> = {
  welcome: {
    subject: "Welcome to {{app_name}}",
    body: "<p>Hello {{name}},</p><p>Welcome to {{app_name}} — Nepal's student job marketplace. Complete your profile to get better job matches.</p>",
  },
  application_submitted: {
    subject: "Application submitted: {{job_title}}",
    body: "<p>Hello {{student_name}},</p><p>Your application for <strong>{{job_title}}</strong> at {{company_name}} has been submitted successfully.</p>",
  },
  application_viewed: {
    subject: "Your application was viewed",
    body: "<p>Hello {{student_name}},</p><p>{{company_name}} viewed your application for <strong>{{job_title}}</strong>.</p>",
  },
  shortlisted: {
    subject: "You have been shortlisted!",
    body: "<p>Hello {{student_name}},</p><p>Your application for <strong>{{job_title}}</strong> at {{company_name}} has been shortlisted.</p>",
  },
  rejected: {
    subject: "Update on your application",
    body: "<p>Hello {{student_name}},</p><p>Thank you for applying for <strong>{{job_title}}</strong> at {{company_name}}. The employer has decided to move forward with other candidates this time.</p>",
  },
  interview_invitation: {
    subject: "Interview invitation: {{job_title}}",
    body: "<p>Hello {{student_name}},</p><p>{{company_name}} has invited you to an interview for <strong>{{job_title}}</strong> on {{interview_time}}. {{interview_details}}</p>",
  },
  new_message: {
    subject: "New message from {{sender_name}}",
    body: "<p>Hello {{name}},</p><p>You have a new message from {{sender_name}} regarding <strong>{{job_title}}</strong>.</p>",
  },
  employer_verification: {
    subject: "Verification update for {{company_name}}",
    body: "<p>Hello {{name}},</p><p>Your company verification status is now: <strong>{{status}}</strong>. {{notes}}</p>",
  },
  job_approval: {
    subject: "Your job post is {{status}}",
    body: "<p>Hello {{name}},</p><p>Your job post <strong>{{job_title}}</strong> has been {{status}}. {{notes}}</p>",
  },
  payment_confirmation: {
    subject: "Payment {{status}}",
    body: "<p>Hello {{name}},</p><p>Your payment of {{amount}} via {{provider}} is {{status}}.</p>",
  },
  password_reset: {
    subject: "Reset your password",
    body: "<p>Hello {{name}},</p><p>We received a request to reset your password for {{app_name}}. Click the link below to set a new password. This link expires in 1 hour.</p><p><a href=\"{{reset_url}}\">Reset my password</a></p><p>If you did not request this, you can safely ignore this email.</p>",
  },
  email_verification: {
    subject: "Verify your email address",
    body: "<p>Hello {{name}},</p><p>Welcome to {{app_name}}! Please verify your email address by clicking the link below. This link expires in 24 hours.</p><p><a href=\"{{verify_url}}\">Verify my email</a></p><p>If you did not create an account, you can safely ignore this email.</p>",
  },
};

export function renderTemplate(name: string, vars: Record<string, string>): { subject: string; html: string } {
  const tpl = TEMPLATES[name];
  if (!tpl) throw new Error(`Unknown email template: ${name}`);
  const fill = (s: string) => s.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? "");
  const html = fill(tpl.body);
  return { subject: fill(tpl.subject), html };
}

export async function sendEmail(msg: EmailMessage): Promise<void> {
  const driver = process.env.EMAIL_DRIVER || "log";
  if (driver === "log") {
    console.log(`[email:${driver}] to=${msg.to} subject=${msg.subject}`);
    return;
  }
  if (driver === "resend") {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "noreply@example.com",
        to: msg.to,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
      }),
    });
    if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
    return;
  }
  if (driver === "smtp") {
    // SMTP via nodemailer is intentionally not bundled; configure a transactional
    // provider (Resend) or add nodemailer and wire it here using EMAIL_SMTP_* vars.
    throw new Error("SMTP driver not configured. Set EMAIL_DRIVER=resend or add nodemailer.");
  }
  throw new Error(`Unknown EMAIL_DRIVER: ${driver}`);
}

export async function sendTemplatedEmail(
  to: string,
  template: string,
  vars: Record<string, string>
): Promise<void> {
  const { subject, html } = renderTemplate(template, { app_name: "Growentix", ...vars });
  await sendEmail({ to, subject, html });
}
