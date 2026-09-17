import json
import re
import html
from pathlib import Path

# Paths
MANTRA_POSTS_PATH = Path(r"C:\ehr\scraped blogs\mantracomply\raw_data\all_posts.json")
HEADWAY_ARTICLES_PATH = Path(r"C:\ehr\scraped blogs\Headway scrape\raw_data\all_articles.json")
OUTPUT_PATH = Path(r"C:\ehr\mantracomply-help-center\src\data\articleRegistry.ts")


# 12 Core Wizard Step Articles tailored specifically for MantraComply form fields
CORE_WIZARD_ARTICLES = [
    {
        "slug": "why-npi-is-needed-and-how-to-find-it",
        "title": "Why Your National Provider Identifier (NPI) Is Needed",
        "category": "getting-started-npi",
        "section": "npi-requirements",
        "summary": "Everything you need to know about NPI Type 1 vs Type 2, where to find your 10-digit number on NPPES, and why every insurance claim requires it.",
        "readTime": "4 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["npi", "nppes", "national provider identifier", "type 1", "type 2", "taxonomy", "cms"],
        "formStepTarget": "npi",
        "toc": [
            {"id": "what-is-npi", "text": "What Is a National Provider Identifier (NPI)?", "level": 2},
            {"id": "why-needed", "text": "Why Does MantraComply Need Your NPI?", "level": 2},
            {"id": "type-1-vs-type-2", "text": "Type 1 (Individual) vs. Type 2 (Organization)", "level": 2},
            {"id": "how-to-find", "text": "How to Find or Verify Your NPI on NPPES", "level": 2},
            {"id": "taxonomy-codes", "text": "Primary Taxonomy Codes & Practice Details", "level": 2},
        ],
        "relatedSlugs": ["onboarding-and-credentialing-timeline", "caqh-authorization-and-cvo-access", "practice-location-and-tax-id-rules"],
        "content": """
## What Is a National Provider Identifier (NPI)?

The **National Provider Identifier (NPI)** is a unique, 10-digit identification number issued by the Centers for Medicare & Medicaid Services (CMS) through the National Plan and Provider Enumeration System (NPPES). Mandated by HIPAA, the NPI is the standard national identifier used across all healthcare transactions in the United States.

> **Key Rule:** An NPI is completely public, contains no embedded personal information (like your birthday or SSN), and never expires or changes throughout your clinical career.

---

## Why Does MantraComply Need Your NPI?

When MantraComply credentials your practice with commercial and government health plans (such as Aetna, BCBS, Cigna, and Medicare), your NPI serves as your primary anchor:

1. **Payer Roster Enrollment:** Payers file contracts and assign participating provider numbers directly under your NPI.
2. **CAQH Linking:** Your CAQH ProView credentialing profile is automatically indexed and retrieved using your NPI.
3. **Primary Source Verification:** State medical boards, OIG exclusion registries, and DEA databases cross-reference disciplinary checks using your NPI.
4. **Claims & Reimbursement:** Without an accurate NPI on file, electronic claim submissions (CMS-1500) will be automatically rejected at the clearinghouse level.

---

## Type 1 (Individual) vs. Type 2 (Organization)

It is crucial to enter the correct NPI type in your MantraComply profile:

| Feature | Type 1: Individual NPI | Type 2: Organization NPI |
|---|---|---|
| **Who It's For** | Solo clinicians, physicians, nurse practitioners, therapists | Group practices, clinics, incorporated entities (LLC, PLLC, PC) |
| **Rendering Provider** | Yes — identifies who physically delivered the medical or therapy service | No — identifies the billing entity or facility |
| **Required For Credentialing?** | **Always required** for every individual provider | Required only if you bill through an incorporated group practice |

> If you practice as a solo practitioner with a single-member LLC, you will have your individual Type 1 NPI, and you may also obtain an optional Type 2 NPI if billing under an EIN.

---

## How to Find or Verify Your NPI on NPPES

If you don't recall your 10-digit number or need to verify your active legal name:

1. Visit the official **NPPES NPI Registry** at [npiregistry.cms.hhs.gov](https://npiregistry.cms.hhs.gov).
2. Enter your first and last name, and your practicing state.
3. Verify that your **Primary Practice Address** and **Active Status** match the information you provide in MantraComply.
4. Copy the exact 10-digit number into the **National Provider Identifier (NPI)** field in your onboarding wizard.

---

## Primary Taxonomy Codes & Practice Details

Your NPI is associated with one or more **Healthcare Provider Taxonomy Codes** (e.g., `101Y00000X` for Counselors, `2084P0800X` for Psychiatry, `207Q00000X` for Family Medicine). When entering your NPI in MantraComply, our automated system validates your active taxonomy to ensure you are matched with the correct payer specialty panels.
"""
    },
    {
        "slug": "caqh-authorization-and-cvo-access",
        "title": "CAQH Authorization: Granting CVO Access in ProView",
        "category": "caqh-identity",
        "section": "caqh-authorization",
        "summary": "Learn how authorizing MantraComply in CAQH ProView allows our credentialing verification organization (CVO) to manage and fast-track your health plan applications.",
        "readTime": "3 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["caqh", "proview", "authorization", "cvo", "attestation", "data sharing"],
        "formStepTarget": "caqh-auth",
        "toc": [
            {"id": "why-caqh-auth", "text": "Why Does MantraComply Need CAQH Authorization?", "level": 2},
            {"id": "what-cvo-does", "text": "What Our Credentialing Team Does With This Access", "level": 2},
            {"id": "steps-to-authorize", "text": "Step-by-Step: Authorizing MantraComply in CAQH ProView", "level": 2},
            {"id": "security-privacy", "text": "Security & Data Protection", "level": 2},
        ],
        "relatedSlugs": ["how-to-fill-out-caqh-in-2026", "why-npi-is-needed-and-how-to-find-it", "caqh-vs-credentialing"],
        "content": """
## Why Does MantraComply Need CAQH Authorization?

CAQH ProView is the national online database where over 1,000 health plans and healthcare organizations access standardized provider credentialing data. Instead of filling out separate 40-page applications for Aetna, UnitedHealthcare, Cigna, and Anthem, payers pull your verified file directly from CAQH.

By authorizing MantraComply as your designated **Credentials Verification Organization (CVO)**, you allow our credentialing analysts to:

- Inspect your CAQH profile for missing documents or discrepancies before payers review it.
- Export verified packets directly to participating insurance panels.
- Track 120-day re-attestation deadlines on your behalf to prevent payer panel termination.

---

## What Our Credentialing Team Does With This Access

Authorizing MantraComply in your onboarding wizard gives our CVO team the administrative permission needed to:

1. **Review Completeness:** Check that all education, work history, license verifications, and liability insurance disclosures meet NCQA and URAC standards.
2. **Upload Documents:** Attach updated Certificates of Insurance (COI) or state licenses directly into your CAQH document repository.
3. **Monitor Plan Audits:** Receive real-time alerts if a health plan requests supplemental clinical documentation.

> **Note:** MantraComply will never alter your personal identity or clinical qualifications without your prior review and consent.

---

## Step-by-Step: Authorizing MantraComply in CAQH ProView

If you already have an active CAQH ProView account:

1. Log into your account at [proview.caqh.org](https://proview.caqh.org).
2. Navigate to the **Authorize** tab in the top navigation menu.
3. Review your authorization settings:
   - **Option A (Recommended):** Select *"Authorize all healthcare organizations that have a relationship with me or my group practice"*.
   - **Option B:** Search for **MantraComply CVO** in the organization list and set access to **Authorized**.
4. Click **Save & Continue**.
5. Return to your MantraComply wizard and toggle **"I authorize MantraComply to access my CAQH profile"** to **Yes**.

---

## Security & Data Protection

All data transmitted between MantraComply and CAQH ProView uses 256-bit TLS encryption in full compliance with HIPAA, HITECH, and SOC2 Type II guidelines. Your information is only accessible by credentialing specialists assigned to your practice.
"""
    },
    {
        "slug": "how-to-fill-out-caqh-in-2026",
        "title": "How to Complete and Maintain Your CAQH Profile in 2026",
        "category": "caqh-identity",
        "section": "caqh-proview",
        "summary": "A comprehensive walkthrough on completing all CAQH ProView sections, avoiding the 10 most common mistakes, and setting up automated 120-day re-attestations.",
        "readTime": "6 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["caqh 2026", "proview", "attestation", "120 days", "caqh checklist"],
        "formStepTarget": "caqh-updates",
        "toc": [
            {"id": "overview", "text": "The Anatomy of a 100% Complete CAQH Profile", "level": 2},
            {"id": "checklist", "text": "Pre-Requisite Documents Needed", "level": 2},
            {"id": "common-delays", "text": "10 Errors That Cause Payer Delays", "level": 2},
            {"id": "re-attestation", "text": "The 120-Day Re-Attestation Rule", "level": 2},
        ],
        "relatedSlugs": ["caqh-authorization-and-cvo-access", "caqh-mistakes", "malpractice-insurance-and-coi-requirements"],
        "content": """
## The Anatomy of a 100% Complete CAQH Profile

Health plans will not begin credentialing until your CAQH profile status displays **"Initial Attestation Complete"** or **"Re-attested"**. A partial or un-attested profile is the number one cause of weeks-long credentialing delays.

A fully attested CAQH profile includes:

- **Personal Information:** Full legal name matching your Social Security card and medical license.
- **Professional IDs:** NPI (Type 1), DEA number, State CDS/CSR licenses (if applicable).
- **Education & Training:** Medical school, graduate degree, internships, residencies, and fellowships.
- **Specialties & Board Certifications:** Primary and secondary specialty taxonomy codes.
- **Practice Locations:** Complete physical addresses (cannot be a P.O. Box), billing addresses, and telehealth designations.
- **Hospital Affiliations:** Active admitting privileges or coverage arrangements.
- **Professional Liability:** Current Certificate of Insurance showing $1M/$3M limits.
- **Employment History:** Comprehensive work history from graduation to present with month/year precision.

---

## Pre-Requisite Documents Needed

Before starting your CAQH updates, have electronic PDF copies ready:

1. Current State Professional License(s)
2. Malpractice Certificate of Insurance (COI) with active policy dates
3. Curriculum Vitae (CV) in month/year format
4. Board Certification certificate or eligibility letter
5. W-9 Form signed within the last 12 months
6. ECFMG Certificate (for international medical graduates)

---

## 10 Errors That Cause Payer Delays

When our CVO audits CAQH profiles, these are the most frequent issues that stall approvals:

1. **Unexplained Gaps in Work History:** Any gap greater than 30–60 days requires a written explanation (e.g., sabbatical, relocation, parenting leave).
2. **Expired COI:** Attesting with a malpractice policy that expires within 30 days.
3. **Mismatched Legal Name:** Using a shortened first name (e.g., "Dan" instead of "Daniel") that conflicts with NPPES.
4. **Missing Attestation Signature:** Completing fields without clicking the final electronic signature step.
5. **P.O. Box as Physical Practice Location:** Payers require physical street addresses for site verifications.

---

## The 120-Day Re-Attestation Rule

Federal and NCQA guidelines mandate that providers re-attest their CAQH profile every **120 calendar days**. When your profile expires, health plans pause claim payments and may drop you from provider directories. MantraComply monitors this deadline automatically and alerts you 30 days in advance.
"""
    },
    {
        "slug": "primary-source-verification-and-identity",
        "title": "Why Full Legal Name, SSN, and DOB Are Required for Credentialing",
        "category": "caqh-identity",
        "section": "identity-verification",
        "summary": "Understand the legal and regulatory mandates behind Primary Source Verification (PSV) and why health plans require exact legal identifiers.",
        "readTime": "3 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["ssn", "legal name", "primary source verification", "psv", "ncqa", "identity"],
        "formStepTarget": "personal-info",
        "toc": [
            {"id": "what-is-psv", "text": "What Is Primary Source Verification (PSV)?", "level": 2},
            {"id": "why-ssn-dob", "text": "Why Health Plans Mandate SSN & Date of Birth", "level": 2},
            {"id": "data-security", "text": "HIPAA & Encryption Standards", "level": 2},
        ],
        "relatedSlugs": ["state-medical-license-verification", "background-checks-and-release-forms", "why-npi-is-needed-and-how-to-find-it"],
        "content": """
## What Is Primary Source Verification (PSV)?

**Primary Source Verification (PSV)** is the formal process by which a credentialing entity verifies a clinician's qualifications directly from the original issuing authority — not from photocopies or self-reported claims.

Accreditation bodies like the **National Committee for Quality Assurance (NCQA)** and **The Joint Commission** require PSV for:
- Medical school and graduate diplomas
- State medical and clinical licenses
- Specialty board certifications
- National Practitioner Data Bank (NPDB) adverse actions

---

## Why Health Plans Mandate SSN & Date of Birth

During onboarding, entering your legal name, date of birth, and Social Security Number is required because:

1. **NPDB Adverse Action Query:** The National Practitioner Data Bank queries federal and state malpractice and disciplinary history using your SSN and DOB.
2. **Office of Inspector General (OIG) & SAM Checks:** Monthly exclusions from federal healthcare programs (Medicare/Medicaid) are verified by SSN matching to prevent identity confusion among providers with identical names.
3. **IRS Legal Entity Matching:** Payers verify that your professional tax reporting matches your federal tax identification records.

---

## HIPAA & Encryption Standards

MantraComply employs military-grade AES-256 encryption at rest and in transit. Your Social Security Number and date of birth are stored in a dedicated, isolated compliance vault accessible only to authorized verification officers.
"""
    },
    {
        "slug": "state-medical-license-verification",
        "title": "State Medical Licenses: Verification Standards, PSYPACT & Interstate Compacts",
        "category": "licenses-certifications",
        "section": "state-licenses",
        "summary": "State licensing requirements for insurance credentialing, primary source board verifications, license expiration rules, and interstate telehealth compacts.",
        "readTime": "5 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["medical license", "psypact", "compact", "primary source", "licensure", "telehealth"],
        "formStepTarget": "license-info",
        "toc": [
            {"id": "license-verification", "text": "How Medical Licenses Are Verified", "level": 2},
            {"id": "expiration-rules", "text": "License Expiration & Renewal Buffer", "level": 2},
            {"id": "interstate-compacts", "text": "PSYPACT, IMLC & Multi-State Practice", "level": 2},
            {"id": "common-issues", "text": "Resolving Name Mismatches & License Restrictions", "level": 2},
        ],
        "relatedSlugs": ["primary-source-verification-and-identity", "board-certification-and-payer-tiers", "malpractice-insurance-and-coi-requirements"],
        "content": """
## How Medical Licenses Are Verified

Every state license entered in your MantraComply profile undergoes automated Primary Source Verification with the respective state licensing board (e.g., Medical Board of California, New York State Office of the Professions, Texas Medical Board).

Verification confirms:
- **Active Status:** License is in good standing with zero suspensions.
- **License Type & Scope:** Independent clinical practice permissions (MD, DO, PsyD, LCSW, LMFT, LPC, NP).
- **Disciplinary Actions:** Absence of public reprimands, probation, or restricted practice stipulations.

---

## License Expiration & Renewal Buffer

> **Important Rule:** Most health plans will reject a credentialing application if the provider's state license is scheduled to expire within **45 to 60 days** of submission.

If your license is up for renewal soon, submit your renewal with your state board immediately and upload your renewal receipt or updated expiration date into MantraComply to avoid an application reset.

---

## Interstate Compacts (PSYPACT, IMLC, Nurse Licensure Compact)

If you deliver telehealth services across state lines, participating in an interstate compact streamlines payer enrollment:

- **PSYPACT:** Allows licensed psychologists to practice telepsychology across 40+ participating compact states under the Authority to Practice Interjurisdictional Telepsychology (APIT).
- **Interstate Medical Licensure Compact (IMLC):** Expedited licensing for qualified physicians across 35+ states.
- **Nurse Licensure Compact (NLC):** Multistate license for RNs and APRNs across 40+ states.

In MantraComply, enter your primary home state license as your home base, and record your compact authorization numbers under additional state credentials.
"""
    },
    {
        "slug": "board-certification-and-payer-tiers",
        "title": "Board Certification Requirements & Tiered Payer Networks",
        "category": "licenses-certifications",
        "section": "board-certification",
        "summary": "How ABMS board certifications impact payer approval rates, higher reimbursement tiers, and specialty panel access.",
        "readTime": "4 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["board certification", "abms", "specialty tiers", "reimbursement", "board eligible"],
        "formStepTarget": "board-cert",
        "toc": [
            {"id": "is-board-cert-mandatory", "text": "Is Board Certification Mandatory for All Payers?", "level": 2},
            {"id": "accepted-boards", "text": "Accepted Certifying Boards", "level": 2},
            {"id": "board-eligible", "text": "Board Certified vs. Board Eligible Status", "level": 2},
            {"id": "reimbursement-impact", "text": "Impact on Reimbursement & Preferred Networks", "level": 2},
        ],
        "relatedSlugs": ["state-medical-license-verification", "medical-education-and-residency-documentation", "choosing-commercial-vs-government-health-plans"],
        "content": """
## Is Board Certification Mandatory for All Payers?

While state licensure grants legal permission to practice, **specialty board certification** is frequently required by premium commercial health plans (such as Blue Cross Blue Shield, Aetna, and Cigna) to join specialized clinical panels.

- **Physicians (MD/DO):** Most commercial plans mandate certification by an ABMS (American Board of Medical Specialties) or AOA (American Osteopathic Association) board.
- **Mental Health Providers:** While psychologists and therapists are generally credentialed based on state licensure and supervised hours, clinical specialty credentials (like ABPP for psychologists) unlock preferred tiering.

---

## Board Certified vs. Board Eligible Status

- **Board Certified:** Successfully completed all written and oral examinations and maintains active Maintenance of Certification (MOC).
- **Board Eligible:** Completed an approved residency/fellowship program and is within the allowed grace period (typically 3–5 years) to sit for board exams.

If you are Board Eligible, enter your eligibility letter and anticipated exam date in your MantraComply profile.
"""
    },
    {
        "slug": "malpractice-insurance-and-coi-requirements",
        "title": "Malpractice Insurance: Required Coverage Limits & Certificate of Insurance (COI)",
        "category": "licenses-certifications",
        "section": "malpractice-insurance",
        "summary": "Why health plans mandate $1M/$3M professional liability coverage, how to obtain your Certificate of Insurance, and occurrence vs claims-made policies.",
        "readTime": "4 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["malpractice", "coi", "certificate of insurance", "1m 3m", "claims made", "occurrence"],
        "formStepTarget": "malpractice-info",
        "toc": [
            {"id": "required-limits", "text": "Required Minimum Coverage Limits ($1M / $3M)", "level": 2},
            {"id": "what-is-coi", "text": "What Must Appear on Your Certificate of Insurance (COI)?", "level": 2},
            {"id": "occurrence-vs-claims", "text": "Occurrence vs. Claims-Made & Tail Coverage", "level": 2},
            {"id": "uploading-coi", "text": "How to Upload Your Declarations Page in MantraComply", "level": 2},
        ],
        "relatedSlugs": ["how-to-fill-out-caqh-in-2026", "state-medical-license-verification", "practice-location-and-tax-id-rules"],
        "content": """
## Required Minimum Coverage Limits ($1M / $3M)

Virtually all major US health plans require participating providers to maintain professional liability (malpractice) insurance with standard statutory minimum limits:

- **$1,000,000 per occurrence (claim):** The maximum the insurer pays for any single malpractice claim.
- **$3,000,000 aggregate:** The total maximum the insurer pays for all claims within a single annual policy term.

> **Note for Hospital-Based or Group Practices:** Some surgical and inpatient hospital networks mandate higher limits ($2M/$4M). For outpatient medical and behavioral healthcare, $1M/$3M is the universal standard.

---

## What Must Appear on Your Certificate of Insurance (COI)?

When requesting a Certificate of Insurance from your broker or carrier (e.g., Berkshire Hathaway, MedPro, The Doctors Company, CPH & Associates, HPSO), ensure the document clearly states:

1. **Provider's Full Legal Name** matching your state medical license.
2. **Policy Number** and active carrier contact information.
3. **Effective & Expiration Dates** (must show current coverage term).
4. **Policy Limits:** Explicitly listing `$1,000,000 / $3,000,000`.
5. **Specialty / Clinical Scope:** Matching your practice specialty.

---

## Occurrence vs. Claims-Made & Tail Coverage

- **Occurrence Policy:** Covers any incident that occurred during the policy period, regardless of when the claim is filed in the future. Tail coverage is not required.
- **Claims-Made Policy:** Covers claims only if both the incident and the filing happen while the policy is active. If switching carriers, providers must secure **Tail Coverage** (Extended Reporting Period) or Prior Acts coverage to maintain uninterrupted credentialing history.
"""
    },
    {
        "slug": "medical-education-and-residency-documentation",
        "title": "Medical Education & Residency Documentation for Credentialing",
        "category": "licenses-certifications",
        "section": "education-training",
        "summary": "Guidelines for submitting medical diplomas, residency/fellowship certificates, and ECFMG verifications for NCQA credentialing compliance.",
        "readTime": "4 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["medical education", "residency", "ecfmg", "fellowship", "diploma"],
        "formStepTarget": "education-qualifications",
        "toc": [
            {"id": "education-standards", "text": "NCQA Educational Verification Requirements", "level": 2},
            {"id": "foreign-medical-graduates", "text": "International Medical Graduates & ECFMG", "level": 2},
            {"id": "fellowships-internships", "text": "Documenting Internships, Residencies & Fellowships", "level": 2},
        ],
        "relatedSlugs": ["board-certification-and-payer-tiers", "work-history-gaps-and-attestations", "primary-source-verification-and-identity"],
        "content": """
## NCQA Educational Verification Requirements

Under NCQA and URAC standards, credentialing verification teams must confirm that providers graduated from an accredited institution.

Acceptable documentation includes:
- **Medical School / Doctoral Degree:** Official diploma from an LCME/AOA accredited medical school or APA-accredited doctoral psychology program.
- **Postgraduate Training:** Completion certificates for all ACGME-accredited residency and fellowship training programs.

---

## International Medical Graduates & ECFMG

Physicians who graduated from international medical schools outside the US or Canada must submit an **ECFMG (Educational Commission for Foreign Medical Graduates) Certificate**. MantraComply performs electronic primary source verification directly with the ECFMG registry.
"""
    },
    {
        "slug": "work-history-gaps-and-attestations",
        "title": "Explaining Work History Gaps for Payer Credentialing",
        "category": "licenses-certifications",
        "section": "education-training",
        "summary": "Why health plans audit gaps greater than 30–60 days in your CV, how to write an acceptable gap explanation letter, and NCQA compliance rules.",
        "readTime": "3 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["work history gaps", "cv gaps", "ncqa", "employment history", "explanation letter"],
        "formStepTarget": "employment-history",
        "toc": [
            {"id": "why-gaps-matter", "text": "Why Do Health Plans Scrutinize Work History Gaps?", "level": 2},
            {"id": "gap-thresholds", "text": "What Constitutes a 'Gap' Under NCQA Rules?", "level": 2},
            {"id": "how-to-explain", "text": "How to Format an Acceptable Gap Explanation", "level": 2},
        ],
        "relatedSlugs": ["medical-education-and-residency-documentation", "primary-source-verification-and-identity", "how-to-fill-out-caqh-in-2026"],
        "content": """
## Why Do Health Plans Scrutinize Work History Gaps?

Payer credentialing committees must verify continuous clinical competence and ensure that gaps between clinical positions were not caused by license suspensions, disciplinary proceedings, or undisclosed malpractice settlements.

---

## What Constitutes a 'Gap' Under NCQA Rules?

According to NCQA Core Credentialing Guidelines:
- Any unrecorded period exceeding **30 to 60 calendar days** between medical school graduation and current employment requires an explicit explanation.
- Work history must be reported in **Month/Year format** (e.g., `06/2021 – 08/2023`). Listing only years (e.g., `2021 – 2023`) will be flagged for resubmission.

---

## How to Format an Acceptable Gap Explanation

Valid reasons for gaps are standard and routine. Simply provide a concise, factual sentence in your employment history record:

- **Relocation / Board Preparation:** *"Studied for specialty board examinations and relocated from Chicago, IL to Denver, CO."*
- **Family Leave / Personal:** *"Parental leave and personal family sabbatical."*
- **Travel / Continuing Education:** *"Extended international travel and completed continuing medical education credits."*
"""
    },
    {
        "slug": "practice-location-and-tax-id-rules",
        "title": "Practice Locations, W-9 Tax IDs, and Billing Address Rules",
        "category": "practice-compliance",
        "section": "practice-details",
        "summary": "Understanding IRS W-9 matching, physical practice locations vs billing addresses, and telehealth location rules for commercial insurance contracts.",
        "readTime": "4 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["w-9", "tax id", "tin", "ein", "practice location", "billing address"],
        "formStepTarget": "practice-info",
        "toc": [
            {"id": "tax-id-matching", "text": "IRS Name & TIN/EIN Matching", "level": 2},
            {"id": "location-types", "text": "Physical vs. Billing vs. Mailing Addresses", "level": 2},
            {"id": "telehealth-addresses", "text": "Telehealth Practice Location Requirements", "level": 2},
        ],
        "relatedSlugs": ["why-npi-is-needed-and-how-to-find-it", "choosing-commercial-vs-government-health-plans", "supervisory-billing-guide"],
        "content": """
## IRS Name & TIN/EIN Matching

Insurance claims reimbursement is tied to your **Taxpayer Identification Number (TIN)** — either an Employer Identification Number (EIN) for incorporated practices or a Social Security Number (SSN) for sole proprietorships.

> **Crucial Rule:** The Legal Business Name on Line 1 of your **IRS Form W-9** must *exactly match* the name registered with the IRS. Discrepancies cause automatic 1099 reporting rejects and claim payment withholding.

---

## Physical vs. Billing vs. Mailing Addresses

Health plans require distinct address classifications:
1. **Physical Practice Location:** Where patient care is delivered. Must be a verifiable commercial address or compliant office suite. P.O. Boxes are strictly rejected.
2. **Billing Address:** Where paper Explanation of Benefits (EOB) statements and check payments are directed. P.O. Boxes are permitted here.
3. **Mailing / Credentialing Notice Address:** Where official re-credentialing notices and legal contract updates are mailed.
"""
    },
    {
        "slug": "choosing-commercial-vs-government-health-plans",
        "title": "Choosing Commercial vs. Government Health Plans & Payer Panels",
        "category": "health-plans-payers",
        "section": "commercial-payers",
        "summary": "A strategic comparison between commercial payers (Aetna, BCBS, Cigna, UHC) and government programs (Medicare, Medicaid) for optimal reimbursement and patient volume.",
        "readTime": "5 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["commercial payers", "medicare", "medicaid", "health plans", "payer panels", "reimbursement"],
        "formStepTarget": "insurance-plans",
        "toc": [
            {"id": "commercial-landscape", "text": "Top Commercial Payers & Regional Powerhouses", "level": 2},
            {"id": "government-programs", "text": "Medicare Part B, Medicare Advantage & Medicaid", "level": 2},
            {"id": "closed-panels", "text": "Navigating 'Closed' Panels & Appeals", "level": 2},
        ],
        "relatedSlugs": ["aetna-provider-credentialing", "bcbs-provider-credentialing", "medicare-provider-enrollment"],
        "content": """
## Top Commercial Payers & Regional Powerhouses

When selecting health plans during your MantraComply onboarding, consider patient referral density and reimbursement rates in your state:

- **Blue Cross Blue Shield (BCBS):** Typically holds the largest commercial market share across most states (e.g., Florida Blue, CareFirst, BCBS Texas, Anthem).
- **Aetna / CVS Health:** Broad commercial and Medicare Advantage presence with fast turnaround times via automated EDI.
- **Cigna / Evernorth:** Nationwide behavioral and medical network with standardized telehealth contracts.
- **UnitedHealthcare / Optum:** Expansive network covering commercial, Medicare Advantage, and dual-eligible programs.

---

## Government Programs (Medicare & Medicaid)

- **Medicare:** High patient volume, established fee schedules based on RBRVS, and zero pre-authorization for many outpatient E/M and psychotherapy codes. Requires CMS-855I enrollment through PECOS.
- **Medicaid:** Essential for serving underserved populations; credentialing managed individually at the state health authority level.
"""
    },
    {
        "slug": "background-checks-and-release-forms",
        "title": "Understanding Credentialing Attestations & Background Authorizations",
        "category": "practice-compliance",
        "section": "audits-attestations",
        "summary": "Why signed release forms are required, legal indemnification standards, and what is audited during the background verification process.",
        "readTime": "3 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["release forms", "attestation", "background check", "cvo authorization", "consent"],
        "formStepTarget": "release-forms",
        "toc": [
            {"id": "why-release-needed", "text": "Why Is a Signed Release Form Required?", "level": 2},
            {"id": "what-is-searched", "text": "What Databases Are Queried?", "level": 2},
            {"id": "legal-protections", "text": "Provider Rights & Data Protections", "level": 2},
        ],
        "relatedSlugs": ["primary-source-verification-and-identity", "cvo-credentialing", "caqh-authorization-and-cvo-access"],
        "content": """
## Why Is a Signed Release Form Required?

Under state and federal medical practice acts, third-party organizations cannot query confidential licensing and disciplinary databases without explicit written authorization from the clinician.

By signing the MantraComply Attestation & Release Form, you authorize our CVO and participating health plans to verify your credentials with:
- State medical, nursing, and behavioral health licensing boards
- Specialty certification boards (ABMS, AOA, NCCPA)
- Professional liability insurance carriers (claims history reports)
- The National Practitioner Data Bank (NPDB)
- Department of Health and Human Services Office of Inspector General (HHS-OIG)

---

## Provider Rights & Data Protections

The release form strictly limits disclosures to legitimate healthcare credentialing and quality assurance purposes. You retain the legal right to review all primary source verification reports gathered during your credentialing cycle.
"""
    },
    {
        "slug": "cms-identity-and-access-ia-account-guide",
        "title": "CMS Identity & Access (I&A) Management: Provider Setup & Surrogate Delegation",
        "category": "health-plans-payers",
        "section": "government-payers",
        "summary": "Everything you need to know about CMS Identity & Access (I&A) accounts, managing NPPES and PECOS access, appointing Authorized Officials, and delegating surrogate access to MantraComply.",
        "readTime": "5 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["i&a", "ia account", "identity and access", "cms", "pecos", "nppes", "surrogate", "authorized official", "medicare enrollment"],
        "formStepTarget": "ia-account",
        "toc": [
            {"id": "what-is-cms-ia", "text": "What Is the CMS Identity & Access (I&A) System?", "level": 2},
            {"id": "why-mantracomply-asks", "text": "Why Does MantraComply Ask If You Have an I&A Account?", "level": 2},
            {"id": "user-roles-explained", "text": "Understanding I&A Roles: Individual, AO, DO & Surrogate", "level": 2},
            {"id": "how-to-create-ia-account", "text": "Step-by-Step: How to Register for an I&A Account", "level": 2},
            {"id": "delegating-surrogate-access", "text": "Authorizing MantraComply as Your Surrogate in I&A", "level": 2},
            {"id": "troubleshooting-mfa-logins", "text": "Troubleshooting Logins, Lost Passwords & MFA Resets", "level": 2},
        ],
        "relatedSlugs": ["why-npi-is-needed-and-how-to-find-it", "medicare-provider-enrollment", "caqh-authorization-and-cvo-access"],
        "content": """
## What Is the CMS Identity & Access (I&A) System?

The **Identity & Access (I&A) Management System** (`ia.cms.gov`) is the central authentication gateway operated by the Centers for Medicare & Medicaid Services (CMS). It provides a single, secure login for healthcare providers and clinical organizations to access federal healthcare applications:

1. **NPPES (National Plan and Provider Enumeration System):** Where your 10-digit Type 1 (Individual) and Type 2 (Organization) National Provider Identifier (NPI) records, practice locations, and taxonomy codes are maintained.
2. **PECOS (Provider Enrollment, Chain, and Ownership System):** Where Medicare enrollment applications (CMS-855I, CMS-855B, CMS-855A), electronic revalidations, reassignment of billing rights, and practice changes are submitted.
3. **EHR / Quality Payment Program (QPP):** CMS Merit-based Incentive Payment System (MIPS) and provider performance registries.

> **Key Takeaway:** If you have ever applied for an NPI online through NPPES or filed a Medicare PECOS application, you already have an active CMS I&A account. Your NPPES and PECOS usernames and passwords are identical because they both authenticate through the CMS I&A portal.

---

## Why Does MantraComply Ask If You Have an I&A Account?

In the **Insurance step** of your MantraComply onboarding wizard, you are asked: *"Do you have an I&A account?"*

Here is why our credentialing team needs this information:

- **If You Answer "Yes":** MantraComply's Credentials Verification Organization (CVO) can send a secure **Surrogate Connection Request** to your CMS I&A account. Once you click "Approve", our credentialing analysts can prepare, audit, and submit your Medicare CMS-855 forms directly in PECOS and maintain your NPPES taxonomy listings **without you needing to hand over your personal master password**.
- **If You Answer "No":** MantraComply's enrollment specialists will guide you through setting up your initial CMS I&A account so that your federal provider records are registered correctly under your legal name, NPI, and Social Security Number.
- **Fast-Tracked Approvals:** Medicare Administrative Contractors (MACs like Noridian, Palmetto, Novitas, or NGS) experience severe delays when applications are submitted with unverified or conflicted I&A relationships. Knowing your status upfront prevents weeks of administrative holds.

---

## Understanding I&A Roles: Individual, AO, DO & Surrogate

CMS I&A organizes user permissions using strict hierarchical roles:

| Role Name | Who Holds It | What Permissions They Have |
|---|---|---|
| **Individual Practitioner** | Solo clinician, physician, or NP | Manages their own individual Type 1 NPI in NPPES and personal Medicare PECOS enrollment. Can appoint surrogates. |
| **Authorized Official (AO)** | Practice Owner, Partner, or CEO | Legally responsible for a Type 2 Group Practice. Has sole authority to approve organizational enrollments and designate staff. |
| **Delegated Official (DO)** | Practice Manager or Director | Designated by the AO to execute enrollment applications and manage day-to-day PECOS actions on behalf of the group. |
| **Surrogate (Employer / Third-Party CVO)** | MantraComply CVO | Authorized by the individual provider or group to prepare, draft, and track PECOS/NPPES submissions on their behalf. |

> **Security Guarantee:** Granting MantraComply "Surrogate" access does **not** grant access to personal banking information or private patient health records. It solely permits credentialing file assembly and Medicare revalidation tracking.

---

## Step-by-Step: How to Register for an I&A Account

If you do not currently have a CMS I&A account:

1. **Visit the CMS I&A Portal:** Go to [ia.cms.gov](https://ia.cms.gov) or [nppes.cms.hhs.gov](https://nppes.cms.hhs.gov).
2. **Click "Create Account":** Review the federal system consent warning and select **Create Account Now**.
3. **Identity Verification:** Enter your full legal name matching your Social Security card, Date of Birth, SSN, and home address. CMS verifies your identity electronically through credit bureau knowledge-based identity checks.
4. **Enter NPI:** If you already possess an individual NPI, enter your 10-digit number to link your clinical identity immediately.
5. **Set Credentials & MFA:** Choose a username, create a strong password, and configure Multi-Factor Authentication (MFA) via SMS, email, or an authenticator app (such as Google Authenticator).
6. **Confirmation:** CMS will send a verification link to your registered email address. Once verified, return to MantraComply and mark your I&A account as active.

---

## Authorizing MantraComply as Your Surrogate in I&A

When MantraComply initiates Medicare enrollment or updates your PECOS roster, follow these steps to accept our surrogate invitation:

1. Log into [ia.cms.gov](https://ia.cms.gov) with your CMS username, password, and two-factor code.
2. From the main dashboard, locate the **"My Connections"** or **"Surrogate Connections"** section.
3. You will see a pending connection request from **MantraComply CVO**.
4. Click **Review Request** and inspect the requested permissions (NPPES & PECOS drafting permissions).
5. Select **Approve Connection**.
6. Notify your MantraComply onboarding coordinator via the **Tasks** tab or chat widget. Our team will immediately take over drafting your Medicare documentation.

---

## Troubleshooting Logins, Lost Passwords & MFA Resets

Because healthcare providers often set up their I&A account during medical residency or initial licensure, account lockout issues are very common:

- **Forgot Username or Password:** Click **"Forgot User ID"** or **"Forgot Password"** on the [ia.cms.gov](https://ia.cms.gov) login page. You will need your Social Security Number and answers to your security questions.
- **MFA Phone Number Changed:** If you no longer have access to the phone number on file for multi-factor authentication, contact the **External User Services (EUS) Help Desk** at **1-866-484-8049** (TTY: 1-866-523-4759). The EUS team operates Monday through Friday, 7:00 AM to 7:00 PM ET.
- **Duplicate Accounts Flagged:** Never create a second I&A account under the same SSN. CMS will automatically freeze both records. Always call the EUS help desk to unlock your original master account.
"""
    },
    {
        "slug": "availity-essentials-account-guide",
        "title": "Availity Essentials: Account Setup, Payer Credentialing & Directory Attestation",
        "category": "health-plans-payers",
        "section": "commercial-payers",
        "summary": "A comprehensive guide to Availity Essentials: registering your organization, managing multi-payer provider credentialing, completing 90-day directory attestations, and granting administrator access to MantraComply.",
        "readTime": "5 min read",
        "lastUpdated": "September 2026",
        "searchKeywords": ["availity", "availity essentials", "provider portal", "payer enrollment", "directory attestation", "anthem", "bcbs", "humana", "clearinghouse"],
        "formStepTarget": "availity-account",
        "toc": [
            {"id": "what-is-availity", "text": "What Is Availity Essentials?", "level": 2},
            {"id": "why-mantracomply-asks", "text": "Why Does MantraComply Ask for Your Availity Account?", "level": 2},
            {"id": "major-payers-on-availity", "text": "Major Commercial Payers Requiring Availity", "level": 2},
            {"id": "account-types-explained", "text": "Organization Administrator (PAA) vs. User Roles", "level": 2},
            {"id": "registering-your-account", "text": "Step-by-Step: Registering for Availity Essentials", "level": 2},
            {"id": "directory-attestation-90-days", "text": "Managing 90-Day Provider Directory Attestations", "level": 2},
            {"id": "granting-mantracomply-access", "text": "Granting MantraComply Access in Availity", "level": 2},
        ],
        "relatedSlugs": ["choosing-commercial-vs-government-health-plans", "bcbs-provider-credentialing", "elevance-health-provider-credentialing"],
        "content": """
## What Is Availity Essentials?

**Availity Essentials** (`availity.com`) is the largest real-time multi-payer healthcare provider portal and clearinghouse in the United States. It connects healthcare providers, group practices, and hospitals with commercial and Medicaid health plans across the country.

While CAQH ProView handles primary source data gathering, **Availity is the operational execution hub** used for:

1. **Online Provider Credentialing & Contracting:** Submitting initial provider enrollment packets and roster adds directly to participating health plan networks.
2. **Provider Demographic Updates:** Maintaining physical office hours, telehealth availability, accepting new patient status, and billing locations.
3. **Mandatory Directory Attestation:** Complying with federal No Surprises Act mandates to verify provider contact details every 90 days.
4. **Revenue Cycle Transactions:** Real-time patient eligibility & benefit verification (270/271), electronic prior authorization submissions, electronic claim status tracking (276/277), and electronic remittance advice (ERA 835).

---

## Why Does MantraComply Ask for Your Availity Account?

In the **Insurance step** of your onboarding wizard, you are asked: *"Do you have an Availity account?"*

Understanding your Availity registration status is critical because:

- **Immediate Payer Submission:** Many top health plans (such as Elevance / Anthem, Florida Blue, Highmark, and Humana) mandate that credentialing applications or provider adds be submitted exclusively through Availity's provider enrollment tool.
- **Preventing Duplicate Organization Conflicts:** Availity strictly prohibits duplicate organizational registrations under the same Tax Identification Number (TIN/EIN). If your practice already registered an Availity organization years ago, attempting to create a second account will freeze electronic routing.
- **Fast-Tracking Authorization:** If you already have an active Availity account, your practice's Primary Access Administrator (PAA) can simply add MantraComply as an authorized user. Our credentialing specialists can then submit paperwork, track real-time payer committee review, and download countersigned contracts on your behalf.

---

## Major Commercial Payers Requiring Availity

A large portion of MantraComply's contracted health plans route credentialing and network operations through Availity:

| Health Plan / Network | What Availity Is Used For | States / Coverage |
|---|---|---|
| **Elevance Health (Anthem, Wellpoint)** | Provider credentialing, contract addenda, demographic updates, claim appeals | Nationwide (14+ commercial Anthem states) |
| **Blue Cross Blue Shield Plans** | Credentialing submissions, 90-day directory attestations, fee schedules | FL Blue, BCBS MI, Highmark, Premera, CareFirst, BCBS TX |
| **Humana** | Commercial and Medicare Advantage provider enrollment, roster maintenance | Nationwide |
| **Ambetter / Centene** | Provider tools, panel status, claims, and contracting support | 26+ Marketplace states |
| **Wellcare & Medicaid MCOs** | State Medicaid managed care credentialing rosters | Varies by state health authority |

---

## Organization Administrator (PAA) vs. User Roles

Availity employs strict administrative role division:

- **Primary Access Administrator (PAA):** The person who initially registers the practice's Tax ID (TIN). The PAA has absolute administrative authority to approve users, assign payer access, designate secondary administrators, and sign electronic agreements.
- **Secondary Administrator:** Appointed by the PAA with the same administrative capabilities to manage staff and external billing/credentialing partners.
- **Standard User (Clinical / Credentialing Staff):** Users assigned specific permissions to submit credentialing packets, verify eligibility, or review claims without having power to modify practice banking or primary tax information.

---

## Step-by-Step: Registering for Availity Essentials

If your practice does not yet have an Availity account, registration takes only 10 to 15 minutes:

1. **Navigate to Availity:** Go to [availity.com](https://www.availity.com) and click **Register**.
2. **Select Provider Organization:** Choose **Healthcare Provider Organization** (clinics, solo practices, billing entities).
3. **Enter Practice Demographics:**
   - Legal Business Name (must match your IRS Form W-9 exactly).
   - Federal Tax Identification Number (EIN or SSN).
   - Physical practice street address (P.O. Boxes are not accepted for registration).
   - Type 2 Organization NPI (if applicable) and Type 1 Individual NPI.
4. **Identify Primary Access Administrator (PAA):** Designate the authorized legal representative or clinic director.
5. **Email Verification & Identity Screening:** Availity will send an activation email. The PAA will complete a short identity validation step to finalize security.
6. **Update MantraComply:** Once your Availity account is active, mark **Yes** in your MantraComply Insurance form step.

---

## Managing 90-Day Provider Directory Attestations

Under the federal **Consolidated Appropriations Act (CAA) / No Surprises Act**, health plans are legally required to audit and update their public provider directories every **90 calendar days**.

Payers such as Anthem, Blue Cross Blue Shield, and Humana execute this verification directly through the **Availity Provider Data Management (PDM)** tool:

- **What Happens If You Miss the 90-Day Window?** Payers are mandated by federal law to hide or suppress unverified providers from public directories and patient search tools. Continued non-compliance can lead to automated claims holds.
- **How MantraComply Helps:** Our automated compliance dashboard monitors your 90-day re-attestation cycles across all active payers and submits updated directory attestations through Availity on your behalf.

---

## Granting MantraComply Access in Availity

To authorize MantraComply's credentialing specialists to submit applications through your Availity portal:

1. Log into your Availity Essentials account as the **Primary Access Administrator (PAA)**.
2. In the top navigation bar, click **My Account** > **User Management**.
3. Click **Add User** or **Invite User**.
4. Enter the MantraComply assigned credentialing coordinator's professional email address (provided in your onboarding dashboard).
5. In the permissions selector, check **Provider Enrollment / Credentialing**, **Provider Data Management (PDM)**, and **Eligibility & Benefits**.
6. Click **Send Invitation**.
7. Our CVO team will accept the invitation and begin managing your commercial health plan panel submissions immediately.
"""
    }
]

# 20 Excluded irrelevant articles: 13 internal careers/jobs + 7 competitor/alternative SEO comparisons
EXCLUDED_SLUGS = {
    # 13 Careers / Job Postings
    "full-stack-developer",
    "implementation-manager-healthcare",
    "customer-success-manager-healthcare",
    "senior-account-executive-healthcare",
    "account-executive-healthcare",
    "business-development-intern-us-healthcare",
    "business-development-representative-us-healthcare",
    "customer-success-associate-healthcare",
    "payer-enrollment-specialist",
    "credentialing-quality-analyst",
    "credentialing-team-lead",
    "provider-enrollment-specialist",
    "credentialing-specialist-us-healthcare-job",
    # 7 Competitor & Alternative Comparisons
    "certifyos-competitors",
    "medallion-competitors",
    "3won-competitors",
    "symplr-competitors",
    "medtrainer-competitors",
    "alma-competitors",
    "mantracomply-vs-modio",
}

def load_scraped_blogs():
    """Load scraped blogs from mantracomply/raw_data/all_posts.json, excluding careers and competitors"""
    if not MANTRA_POSTS_PATH.exists():
        print(f"File {MANTRA_POSTS_PATH} not found!")
        return []
    
    with open(MANTRA_POSTS_PATH, "r", encoding="utf-8") as f:
        posts = json.load(f)
        
    print(f"Loaded {len(posts)} posts from {MANTRA_POSTS_PATH}")
    articles = []
    
    for p in posts:
        slug = p.get("slug")
        cats = p.get("categories", [])
        
        # Exclude job postings and competitor comparisons
        if slug in EXCLUDED_SLUGS or 191 in cats or 186 in cats:
            continue

        title = html.unescape(p.get("title", {}).get("rendered", "Untitled"))
        content_html = p.get("content", {}).get("rendered", "")
        
        # Simple plain text summary from excerpt or content
        excerpt = html.unescape(p.get("excerpt", {}).get("rendered", ""))
        clean_summary = re.sub(r'<[^>]+>', '', excerpt).strip()
        if not clean_summary or len(clean_summary) < 20:
            clean_text = re.sub(r'<[^>]+>', '', content_html).strip()
            clean_summary = clean_text[:160] + "..." if len(clean_text) > 160 else clean_text
            
        slug_lower = slug.lower()
        
        # 1. UK Health Plans & Insurers (Categories 187/188 or UK keywords)
        if 187 in cats or 188 in cats or any(k in slug_lower for k in [
            "bupa", "axa-health", "aviva", "vitality", "benenden", "exeter", 
            "simply-health", "wpa", "healix", "freedom-health", "allianz-care", "april-international"
        ]):
            cat = "health-plans-payers"
            sec = "uk-health-plans"
            
        # 2. Specialty Provider Guides & Eligibility
        elif any(k in slug_lower for k in [
            "nurse-practitioner", "dietitian", "chiropractor", "physiotherapist", 
            "speech-therapist", "dental", "addiction", "mental-health", "telehealth", "physician"
        ]):
            cat = "getting-started-npi"
            sec = "provider-eligibility"
            
        # 3. CAQH & Identity
        elif "caqh" in slug_lower or 220 in cats:
            cat = "caqh-identity"
            sec = "caqh-proview"
            
        # 4. US Payers
        elif any(k in slug_lower for k in ["medicare", "medicaid", "tricare", "triwest"]):
            cat = "health-plans-payers"
            sec = "government-payers"
            
        elif any(k in slug_lower for k in ["aetna", "anthem", "bcbs", "cigna", "united", "blue-shield", "highmark", "premera", "florida-blue"]):
            cat = "health-plans-payers"
            sec = "commercial-payers"
            
        elif any(k in slug_lower for k in [
            "centene", "molina", "humana", "kaiser", "guidewell", "hcsc", "cvs-health", 
            "health-net", "healthpartners", "parallon", "evernorth", "ambetter", "verge-health", 
            "optum", "healthfirst", "wellcare"
        ]):
            cat = "health-plans-payers"
            sec = "specialty-payers"
            
        # 5. Onboarding & Timelines & Mistakes
        elif any(k in slug_lower for k in ["turnaround", "re-credentialing", "mistakes", "provider-credentialing-process", "privileging"]):
            cat = "getting-started-npi"
            sec = "onboarding-process"
            
        # 6. Licenses & Malpractice
        elif "malpractice" in slug_lower:
            cat = "licenses-certifications"
            sec = "malpractice-insurance"
        elif "license" in slug_lower:
            cat = "licenses-certifications"
            sec = "state-licenses"
            
        # 7. CVO, Delegated Credentialing & Automation
        else:
            cat = "practice-compliance"
            sec = "cvo-automation"
            
        # Extract headings for TOC
        toc = []
        for m in re.finditer(r'<h([23])[^>]*>(.*?)</h\1>', content_html, re.I):
            level = int(m.group(1))
            heading_text = re.sub(r'<[^>]+>', '', m.group(2)).strip()
            heading_id = re.sub(r'[^a-zA-Z0-9]+', '-', heading_text.lower()).strip('-')
            if heading_text and heading_id:
                toc.append({"id": heading_id, "text": heading_text, "level": level})
                
        # Clean up content HTML for display
        # Remove extra wp classes or inline scripts
        clean_content = re.sub(r'<script.*?</script>', '', content_html, flags=re.DOTALL)
        
        articles.append({
            "slug": slug,
            "title": title,
            "category": cat,
            "section": sec,
            "summary": clean_summary,
            "readTime": f"{max(3, round(len(content_html) / 2500))} min read",
            "lastUpdated": p.get("modified", "")[:10] or "2026",
            "searchKeywords": [k for k in slug.split('-') if len(k) > 2],
            "toc": toc[:10],
            "content": clean_content
        })
        
    return articles

def generate_typescript_registry():
    all_articles = []
    
    # 1. Add core wizard articles first (high priority)
    core_slugs = {a["slug"] for a in CORE_WIZARD_ARTICLES}
    all_articles.extend(CORE_WIZARD_ARTICLES)
    
    # 2. Add scraped blogs, excluding duplicates
    blogs = load_scraped_blogs()
    for b in blogs:
        if b["slug"] not in core_slugs:
            all_articles.append(b)
            
    print(f"Total articles compiled: {len(all_articles)}")
    
    # Generate TypeScript file
    ts_code = 'import { Article } from "../types/helpCenter";\n\n'
    ts_code += 'export const ARTICLES: Article[] = ' + json.dumps(all_articles, indent=2) + ';\n\n'
    
    ts_code += """
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return ARTICLES.filter((a) => a.category === categorySlug);
}

export function getArticlesBySection(sectionSlug: string): Article[] {
  return ARTICLES.filter((a) => a.section === sectionSlug);
}

export function getArticleForFormStep(formStep: string): Article | undefined {
  return ARTICLES.find((a) => a.formStepTarget === formStep);
}

export const ARTICLE_REGISTRY = ARTICLES;

export function getSiblingArticles(currentSlug: string): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  const inSection = ARTICLES.filter((a) => a.section === current.section);
  if (inSection.length > 1) return inSection;
  return ARTICLES.filter((a) => a.category === current.category).slice(0, 8);
}

export function getRelatedArticles(articleSlug: string, count: number = 4): Article[] {
  const current = getArticleBySlug(articleSlug);
  if (!current) return [];

  const candidates: Article[] = [];
  const addedSlugs = new Set<string>([current.slug]);

  // 1. Explicit relatedSlugs defined on the article
  if (current.relatedSlugs && Array.isArray(current.relatedSlugs)) {
    for (const s of current.relatedSlugs) {
      const found = getArticleBySlug(s);
      if (found && !addedSlugs.has(found.slug)) {
        candidates.push(found);
        addedSlugs.add(found.slug);
      }
    }
  }

  // 2. Sibling articles in the same section
  for (const a of ARTICLES) {
    if (candidates.length >= count) break;
    if (a.section === current.section && !addedSlugs.has(a.slug)) {
      candidates.push(a);
      addedSlugs.add(a.slug);
    }
  }

  // 3. Sibling articles in the same category
  for (const a of ARTICLES) {
    if (candidates.length >= count) break;
    if (a.category === current.category && !addedSlugs.has(a.slug)) {
      candidates.push(a);
      addedSlugs.add(a.slug);
    }
  }

  // 4. Fallback essential platform & foundational guides
  const fallbackSlugs = [
    "why-npi-is-needed-and-how-to-find-it",
    "caqh-authorization-and-cvo-access",
    "onboarding-wizard-guide",
    "managing-credentialing-tasks-and-actions",
    "state-medical-license-verification",
    "practice-location-and-tax-id-rules",
    "tracking-active-insurance-status",
    "supervisory-billing-and-incident-to-guidelines",
  ];
  for (const fSlug of fallbackSlugs) {
    if (candidates.length >= count) break;
    const found = getArticleBySlug(fSlug);
    if (found && !addedSlugs.has(found.slug)) {
      candidates.push(found);
      addedSlugs.add(found.slug);
    }
  }

  return candidates.slice(0, count);
}

export function getAllArticles(): Article[] {
  return ARTICLES;
}

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as", "at",
  "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "could", "did", "do", "does", "doing", "down", "during",
  "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his", "how",
  "i", "if", "in", "into", "is", "it", "its", "itself",
  "just", "me", "more", "most", "my", "myself",
  "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out", "over", "own",
  "same", "should", "so", "some", "such",
  "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "too",
  "under", "until", "up", "very",
  "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", "would", "you", "your", "yours"
]);

export function searchArticles(query: string, categoryFilter?: string): Article[] {
  const rawQuery = query.toLowerCase().trim();
  if (!rawQuery) return [];

  const cleanQuery = rawQuery.replace(/[^\\w\\s-]/g, " ");
  const allTokens = cleanQuery.split(/\\s+/).filter((t) => t.length > 1);

  const meaningfulTokens = allTokens.filter((t) => !STOP_WORDS.has(t));
  const tokens = meaningfulTokens.length > 0 ? meaningfulTokens : allTokens;

  const targetArticles = categoryFilter && categoryFilter !== "all"
    ? ARTICLES.filter((a) => a.category === categoryFilter)
    : ARTICLES;

  const scored: { article: Article; score: number }[] = [];

  for (const article of targetArticles) {
    let score = 0;
    const titleLower = article.title.toLowerCase();
    const summaryLower = (article.summary || "").toLowerCase();
    const contentLower = (article.content || "").toLowerCase();
    const keywordsLower = (article.searchKeywords || []).map((k) => k.toLowerCase());
    const categoryLower = (article.category || "").toLowerCase();
    const sectionLower = (article.section || "").toLowerCase();

    // 1. Exact full-phrase matches
    if (titleLower.includes(rawQuery)) score += 120;
    else if (summaryLower.includes(rawQuery)) score += 70;
    else if (contentLower.includes(rawQuery)) score += 35;

    // 2. Tokenized matching
    let matchedTokensCount = 0;
    let highValueMatch = false;

    for (const token of tokens) {
      let tokenMatched = false;

      // Title match
      if (titleLower.includes(token)) {
        score += 35;
        tokenMatched = true;
        highValueMatch = true;
      }

      // Keyword match
      if (keywordsLower.some((k) => k.includes(token) || token.includes(k))) {
        score += 25;
        tokenMatched = true;
        highValueMatch = true;
      }

      // Summary match
      if (summaryLower.includes(token)) {
        score += 15;
        tokenMatched = true;
        highValueMatch = true;
      }

      // Category / Section match
      if (categoryLower.includes(token) || sectionLower.includes(token)) {
        score += 10;
        tokenMatched = true;
      }

      // Content match
      if (contentLower.includes(token)) {
        score += 4;
        tokenMatched = true;
      }

      if (tokenMatched) {
        matchedTokensCount++;
      }
    }

    const isValidMatch = highValueMatch || matchedTokensCount >= Math.min(2, tokens.length);

    if (isValidMatch && score >= 20) {
      if (tokens.length > 1 && matchedTokensCount === tokens.length) {
        score += 50;
      }
      scored.push({ article, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.article);
}
"""
    
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        f.write(ts_code)
        
    print(f"Successfully wrote {len(all_articles)} articles to {OUTPUT_PATH}")

if __name__ == "__main__":
    generate_typescript_registry()
