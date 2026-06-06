import { Resend } from "resend";
import type { ContactLead } from "@/features/contact/types";
import type { EmailService } from "./email.service";

const SERVICE_LABELS: Record<ContactLead["serviceType"], string> = {
  basic:    "Basic Landing Page",
  standard: "Standard Portfolio",
  premium:  "Premium Dashboard",
  custom:   "Custom Project",
};

const STATUS_COLOR: Record<ContactLead["status"], string> = {
  new:       "#af50ff",
  contacted: "#3b82f6",
  closed:    "#22c55e",
  rejected:  "#ef4444",
  archived:  "#6b6b6b",
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml(lead: ContactLead): string {
  const service = SERVICE_LABELS[lead.serviceType] ?? lead.serviceType;
  const color   = STATUS_COLOR[lead.status] ?? "#af50ff";
  const date    = new Date(lead.createdAt).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "short",
    timeStyle: "short",
  });

  const safeName = escapeHtml(lead.name);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = lead.phone ? escapeHtml(lead.phone) : undefined;
  const safeBudget = lead.budget ? escapeHtml(lead.budget) : undefined;
  const safeMessage = escapeHtml(lead.message);
  const safeStatus = escapeHtml(lead.status);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Lead — tamduc.dev</title>
</head>
<body style="margin:0;padding:0;background:#0d0d0d;font-family:'Inter',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#141414;border-radius:16px;border:1px solid #ffffff12;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#af50ff 0%,#6c4bd6 100%);padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:11px;letter-spacing:0.14em;color:#ffffff99;font-weight:600;text-transform:uppercase;">New Lead</span><br/>
                    <span style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.02em;">tamduc.dev CRM</span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:#ffffff22;border-radius:8px;padding:6px 12px;font-size:12px;color:#fff;font-weight:600;">${date}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">

              <!-- Name + badge -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                <tr>
                  <td>
                    <div style="font-size:20px;font-weight:700;color:#f7f9fa;letter-spacing:-0.02em;">${safeName}</div>
                    <div style="font-size:13px;color:#f0f0f080;margin-top:2px;">${safeEmail}</div>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:${color}20;border:1px solid ${color}50;border-radius:6px;padding:4px 12px;font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.08em;">${safeStatus}</span>
                  </td>
                </tr>
              </table>

              <!-- Details grid -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0d0d;border-radius:12px;border:1px solid #ffffff0d;overflow:hidden;margin-bottom:20px;">
                ${safePhone ? `
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ffffff0d;">
                    <span style="font-size:11px;color:#ffffff50;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:2px;">Phone</span>
                    <span style="font-size:14px;color:#f0f0f0;font-weight:500;">${safePhone}</span>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ffffff0d;">
                    <span style="font-size:11px;color:#ffffff50;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:2px;">Service</span>
                    <span style="font-size:14px;color:#af50ff;font-weight:600;">${service}</span>
                  </td>
                </tr>
                ${safeBudget ? `
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ffffff0d;">
                    <span style="font-size:11px;color:#ffffff50;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:2px;">Budget</span>
                    <span style="font-size:14px;color:#22c55e;font-weight:600;">${safeBudget}</span>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:12px 16px;">
                    <span style="font-size:11px;color:#ffffff50;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:6px;">Message</span>
                    <span style="font-size:14px;color:#f0f0f0;line-height:1.6;">${safeMessage}</span>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}"
                       style="display:inline-block;background:linear-gradient(135deg,#af50ff,#6c4bd6);color:#fff;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;letter-spacing:0.02em;">
                      Reply to ${safeName.split(" ")[0]}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #ffffff0d;">
              <span style="font-size:11px;color:#ffffff30;font-family:monospace;">Lead ID: ${lead.id}</span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export class ResendEmailService implements EmailService {
  private resend: Resend;
  private readonly to: string;
  private readonly from: string;

  constructor(apiKey: string, fromAddress?: string) {
    this.resend = new Resend(apiKey);
    this.to = (typeof process !== "undefined" ? process.env.LEAD_EMAIL : undefined)
      || (import.meta.env.VITE_LEAD_EMAIL as string | undefined)
      || "duc.nguyen240205@vnuk.edu.vn";
    this.from = fromAddress
      || (typeof process !== "undefined" ? process.env.RESEND_FROM : undefined)
      || (import.meta.env.VITE_RESEND_FROM as string | undefined)
      || "onboarding@resend.dev";
  }

  async sendLeadNotification(lead: ContactLead): Promise<void> {
    const service = SERVICE_LABELS[lead.serviceType] ?? lead.serviceType;
    const safeName = escapeHtml(lead.name);
    const safeEmail = escapeHtml(lead.email);
    const safePhone = lead.phone ? escapeHtml(lead.phone) : undefined;
    const safeBudget = lead.budget ? escapeHtml(lead.budget) : undefined;
    const safeMessage = escapeHtml(lead.message);

    const { error } = await this.resend.emails.send({
      from: this.from,
      to: this.to,
      replyTo: safeEmail,
      subject: `🎯 New Lead: ${safeName} — ${service}`,
      html: buildEmailHtml(lead),
      text: [
        `New lead from tamduc.dev`,
        `─────────────────────────`,
        `Name:    ${safeName}`,
        `Email:   ${safeEmail}`,
        safePhone ? `Phone:   ${safePhone}` : null,
        `Service: ${service}`,
        safeBudget ? `Budget:  ${safeBudget}` : null,
        ``,
        `Message:`,
        safeMessage,
        ``,
        `Lead ID: ${lead.id}`,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      throw new Error(`Resend API error: ${error.message}`);
    }
  }
}
