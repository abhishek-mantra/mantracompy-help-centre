/**
 * Support Link Helpers & Bitrix24 LiveChat Integration
 * Enables direct redirection to pre-filled Gmail compose and Bitrix24 live chat triggering.
 */

export const SUPPORT_EMAIL = "contact@mantracomply.com";
export const SUPPORT_PHONE = "+1 (332) 331-8626";
export const SUPPORT_PHONE_TEL = "tel:+13323318626";

interface EmailParams {
  to?: string;
  subject?: string;
  body?: string;
}

/**
 * Builds a direct Gmail web compose URL with recipient, subject, and pre-filled body.
 * When clicked, opens Gmail directly in the browser without relying on local mail clients.
 */
export function buildGmailComposeUrl({
  to = SUPPORT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}): string {
  const base = "https://mail.google.com/mail/?view=cm&fs=1";
  const params = new URLSearchParams();
  params.set("to", to);
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `${base}&${params.toString()}`;
}

/**
 * Standard mailto: link as fallback for non-Gmail users
 */
export function buildMailtoUrl({
  to = SUPPORT_EMAIL,
  subject = "",
  body = "",
}: EmailParams = {}): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${to}${query ? `?${query}` : ""}`;
}

/**
 * Opens Gmail compose in a new tab with rel="noopener noreferrer"
 */
export function openGmailCompose(params: EmailParams = {}): void {
  const url = buildGmailComposeUrl(params);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Programmatically triggers the Bitrix24 Live Chat window
 */
export function openBitrix24LiveChat(): boolean {
  try {
    const w = window as any;

    // 1. Bitrix24 LiveChat native API
    if (w.BX?.LiveChat?.openLiveChat && typeof w.BX.LiveChat.openLiveChat === "function") {
      w.BX.LiveChat.openLiveChat();
      return true;
    }
    if (w.BX?.LiveChat?.open && typeof w.BX.LiveChat.open === "function") {
      w.BX.LiveChat.open();
      return true;
    }

    // 2. Bitrix24 Site Button API
    if (w.b24SiteButton && typeof w.b24SiteButton.open === "function") {
      w.b24SiteButton.open();
      return true;
    }
    if (w.b24SiteButton && typeof w.b24SiteButton.showChat === "function") {
      w.b24SiteButton.showChat();
      return true;
    }

    // 3. Fallback: DOM query and click
    const selectors = [
      ".b24-widget-button-openline_livechat",
      ".b24-widget-button-wrapper",
      ".b24-widget-button-icon",
      ".b24-widget-button",
      "[data-b24-crm-button-openlines]",
      "[class*='b24-widget-button']",
    ];

    for (const sel of selectors) {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) {
        el.click();
        return true;
      }
    }

    console.warn("Bitrix24 widget element not found in DOM yet. Retrying in 400ms...");
    setTimeout(() => {
      for (const sel of selectors) {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (el) {
          el.click();
          return;
        }
      }
    }, 400);

    return false;
  } catch (err) {
    console.error("Failed to trigger Bitrix24 LiveChat:", err);
    return false;
  }
}

/**
 * Pre-formatted email templates for each support stream
 */
export const SUPPORT_TEMPLATES = {
  credentialing: {
    subject: "[Credentialing Support] Provider Enrollment & Verification Request",
    body: `Hello MantraComply Credentialing Team,

I am requesting assistance with provider credentialing and enrollment.

• Provider Full Name: 
• NPI Number: 
• Practice / Clinic Name: 
• State(s) of Practice: 
• Primary Specialty: 
• Inquiry / Specific Questions: 

Thank you,`,
  },
  caqh: {
    subject: "[CAQH & NPI Help] Onboarding & Profile Attestation Request",
    body: `Hello MantraComply Onboarding Team,

I need guided assistance with my CAQH ProView attestation and/or NPPES NPI taxonomy.

• Provider Full Name: 
• CAQH Provider ID (if known): 
• NPI Number: 
• Practice Location (City, State): 
• Issue (e.g. Initial Profile Setup, 120-Day Re-attestation, Primary Taxonomy Change): 
• Best Contact Phone: 

Thank you,`,
  },
  payerEnrollment: {
    subject: "[Payer Enrollment] Commercial / Medicare / Medicaid Panel Application",
    body: `Hello MantraComply Enrollment Desk,

I would like assistance submitting and expediting my payer enrollment applications.

• Provider / Group Name: 
• NPI / Tax ID (EIN): 
• Target Payers (e.g. Medicare PECOS, Medicaid, BCBS, Aetna, Cigna, UHC): 
• State(s) for Enrollment: 
• Target Effective Date: 
• Current Status / Notes: 

Thank you,`,
  },
  urgentCompliance: {
    subject: "[URGENT] Compliance Deadline / Expiring License / Audit Notice",
    body: `URGENT COMPLIANCE NOTICE:

• Provider Full Name: 
• Practice / Organization: 
• Critical Deadline Date: 
• Nature of Urgent Issue (Payer Committee Deadline, Expiring State License, Audit / Sanction Notice): 
• Immediate Callback Phone Number: 

Please flag for high-priority response.`,
  },
  generalRequest: {
    subject: "[Help Center Request] Support Inquiry",
    body: `Hello MantraComply Support,

I am reaching out from the MantraComply Help Center with the following inquiry:

• Name: 
• Clinic / Organization: 
• Phone Number: 
• How can we help you?: 

Thank you,`,
  },
};
