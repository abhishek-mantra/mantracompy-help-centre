import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  CheckCircle2,
  Play,
  ArrowRight,
  ArrowLeft,
  FileText,
  AlertTriangle,
  ExternalLink,
  Building2,
  Sparkles,
  RotateCcw,
  Check,
  Video,
  X,
  Info,
  Clock,
} from "lucide-react";

interface StepDetail {
  id: number;
  name: string;
  shortName: string;
  category: string;
  estimatedTime: string;
  helpSlug: string;
  purpose: string;
  whyNeeded: string;
  cvoAction: string;
  requiredDocuments: { name: string; format: string; rule: string }[];
  pitfalls: string[];
  mockFields: {
    label: string;
    type: "text" | "select" | "toggle" | "checkbox-group";
    defaultValue?: string;
    options?: string[];
    help: string;
  }[];
}

const TOUR_STEPS: StepDetail[] = [
  {
    id: 1,
    name: "National Provider Identifier (NPI)",
    shortName: "NPI Verification",
    category: "Identity & NPPES",
    estimatedTime: "2 min",
    helpSlug: "why-npi-is-needed-and-how-to-find-it",
    purpose: "Validate your 10-digit Type 1 individual NPI and active clinical taxonomy codes through NPPES.",
    whyNeeded: "Every insurance panel contract, CAQH ProView link, and electronic claim submission (CMS-1500) requires a verified Type 1 NPI.",
    cvoAction: "Automated API lookup validates your active status on the federal NPPES registry and confirms matching practice address records.",
    requiredDocuments: [
      { name: "NPPES Confirmation Letter", format: "PDF (optional)", rule: "Helpful if your NPI was recently updated or re-enumerated" },
    ],
    pitfalls: [
      "Entering a Type 2 (Organization/Group) NPI in the Individual field.",
      "Primary practice address in NPPES does not match the practice location provided in MantraComply.",
      "Selecting an inactive or outdated taxonomy code that doesn't match your board certification.",
    ],
    mockFields: [
      { label: "10-Digit NPI Number", type: "text", defaultValue: "1487920134", help: "Must be active on npiregistry.cms.hhs.gov" },
      { label: "NPI Entity Type", type: "select", options: ["Type 1 (Individual Practitioner)", "Type 2 (Organization / Group)"], defaultValue: "Type 1 (Individual Practitioner)", help: "Clinicians must select Type 1" },
      { label: "Primary Healthcare Taxonomy", type: "select", options: ["101Y00000X - Counselor", "2084P0800X - Psychiatry", "207Q00000X - Family Medicine", "1041C0700X - Clinical Social Worker"], defaultValue: "2084P0800X - Psychiatry", help: "Determines insurance panel specialty matching" },
    ],
  },
  {
    id: 2,
    name: "CAQH Authorization",
    shortName: "CAQH CVO Access",
    category: "ProView Authorization",
    estimatedTime: "3 min",
    helpSlug: "caqh-authorization-and-cvo-access",
    purpose: "Grant MantraComply CVO administrative authorization in CAQH ProView so our credentialing team can maintain and submit your packets.",
    whyNeeded: "Over 1,000 health plans access CAQH ProView directly. Authorizing MantraComply allows our analysts to prepare, upload documents, and track approvals on your behalf.",
    cvoAction: "Once authorized, our team audits your profile, uploads Certificates of Insurance (COI), and coordinates with commercial health plans.",
    requiredDocuments: [
      { name: "CAQH Authorization Screen", format: "In-App Confirmation", rule: "Select 'Authorize All' or add MantraComply CVO" },
    ],
    pitfalls: [
      "Selecting 'Do Not Authorize' or leaving the authorization restricted to old employers.",
      "Forgetting to click 'Save & Continue' on the CAQH ProView Authorize tab.",
    ],
    mockFields: [
      { label: "Authorize MantraComply CVO in CAQH ProView?", type: "toggle", defaultValue: "Yes", help: "Allows our team to submit applications to participating health plans" },
      { label: "Authorization Scope", type: "select", options: ["Authorize All Healthcare Organizations (Recommended)", "Selective Authorization"], defaultValue: "Authorize All Healthcare Organizations (Recommended)", help: "Prevents delays when new payers request your roster" },
    ],
  },
  {
    id: 3,
    name: "CAQH Account Updates",
    shortName: "CAQH Updates",
    category: "Attestation & Status",
    estimatedTime: "3 min",
    helpSlug: "how-to-fill-out-caqh-in-2026",
    purpose: "Verify your CAQH Provider ID and ensure your 120-day re-attestation status is active.",
    whyNeeded: "Health plans automatically reject credentialing packets if the CAQH attestation is older than 120 days or has missing sections.",
    cvoAction: "MantraComply monitors your 120-day re-attestation countdown and alerts you before expirations occur.",
    requiredDocuments: [
      { name: "CAQH Profile Summary", format: "Electronic Audit", rule: "Must be 100% complete with no unverified gaps" },
    ],
    pitfalls: [
      "Attestation expired (older than 120 days).",
      "CAQH password expired or multi-factor authentication lockout.",
      "Address or name in CAQH does not match state medical board records.",
    ],
    mockFields: [
      { label: "CAQH Provider ID (8 digits)", type: "text", defaultValue: "18942051", help: "Found in the top-right corner of your CAQH ProView dashboard" },
      { label: "Have you attested within the last 120 days?", type: "toggle", defaultValue: "Yes", help: "MantraComply CVO will assist in keeping this current" },
    ],
  },
  {
    id: 4,
    name: "Personal Information",
    shortName: "Personal Identity",
    category: "Primary Source Identity",
    estimatedTime: "4 min",
    helpSlug: "primary-source-verification-and-identity",
    purpose: "Collect exact legal name matching Social Security records, Date of Birth, SSN/TIN, residential address, and citizenship.",
    whyNeeded: "Primary source background verification against federal OIG exclusions, SAM, and state registries requires an exact identity match.",
    cvoAction: "Verifies provider records against federal exclusion lists and state birth/identity registries.",
    requiredDocuments: [
      { name: "Government Photo ID (Driver's License / Passport)", format: "Color PDF/JPG", rule: "Must be active and show matching legal name" },
    ],
    pitfalls: [
      "Using a preferred name or nickname instead of legal name matching Social Security card.",
      "Entering practice address in residential address fields.",
      "Typo in Social Security Number, causing clearinghouse rejections.",
    ],
    mockFields: [
      { label: "Full Legal Name", type: "text", defaultValue: "Dr. Eleanor Vance, MD", help: "Must match SSN and state medical board records exactly" },
      { label: "Social Security Number (SSN)", type: "text", defaultValue: "•••-••-6821", help: "Transmitted via 256-bit HIPAA-compliant encryption" },
      { label: "Date of Birth", type: "text", defaultValue: "1982-06-14", help: "Required for state license registry matching" },
      { label: "Citizenship / Visa Status", type: "select", options: ["US Citizen", "Permanent Resident (Green Card)", "H-1B / J-1 Clinical Visa"], defaultValue: "US Citizen", help: "Foreign graduates require visa verification" },
    ],
  },
  {
    id: 5,
    name: "License Information",
    shortName: "State Medical Licenses",
    category: "State Boards & DEA",
    estimatedTime: "5 min",
    helpSlug: "state-medical-license-verification",
    purpose: "Record all active state medical/clinical licenses, issue and expiration dates, and federal DEA registrations.",
    whyNeeded: "Payers verify that your license is active, unrestricted, and has no pending disciplinary actions with the state medical board.",
    cvoAction: "Direct automated API queries to state licensing boards for real-time verification and exclusion screening.",
    requiredDocuments: [
      { name: "Active State Medical License", format: "PDF Copy", rule: "Must show future expiration date" },
      { name: "Federal DEA Certificate", format: "PDF Copy", rule: "Must match practice state for prescribing providers" },
      { name: "State Controlled Substance License (CDS/CSR)", format: "PDF Copy", rule: "Mandatory in states requiring state-level CDS" },
    ],
    pitfalls: [
      "Submitting an expired license or one set to expire within 30 days of submission.",
      "DEA address registered in a different state than the practicing location.",
      "Failure to disclose past reprimands or inactive licenses in other states.",
    ],
    mockFields: [
      { label: "Licensing State", type: "select", options: ["California", "New York", "Texas", "Florida", "Illinois"], defaultValue: "California", help: "State where services are rendered" },
      { label: "Medical / Clinical License Number", type: "text", defaultValue: "C158942", help: "Include any state board prefixes" },
      { label: "License Expiration Date", type: "text", defaultValue: "2027-11-30", help: "Must be renewed prior to submission" },
      { label: "Federal DEA Number", type: "text", defaultValue: "BV8941203", help: "Required for prescriptive authority" },
    ],
  },
  {
    id: 6,
    name: "Board Certification",
    shortName: "Board Certification",
    category: "Specialty Credentials",
    estimatedTime: "3 min",
    helpSlug: "board-certification-and-payer-tiers",
    purpose: "Document specialty and subspecialty board certifications from ABMS, ABPN, AOA, or equivalent recognized boards.",
    whyNeeded: "Many commercial payers require board certification or board eligibility within 5 years of residency for specialist panel participation.",
    cvoAction: "Primary source verification with the American Board of Medical Specialties (ABMS) or certifying council.",
    requiredDocuments: [
      { name: "Board Certification Certificate", format: "PDF Copy", rule: "Showing specialty, certificate number, and valid through date" },
    ],
    pitfalls: [
      "Claiming Board Certified when status is Board Eligible.",
      "Expired Maintenance of Certification (MOC) cycle.",
    ],
    mockFields: [
      { label: "Certifying Specialty Board", type: "select", options: ["American Board of Psychiatry and Neurology (ABPN)", "American Board of Internal Medicine (ABIM)", "American Board of Family Medicine (ABFM)", "Not Applicable / Allied Health"], defaultValue: "American Board of Psychiatry and Neurology (ABPN)", help: "ABMS or equivalent recognized body" },
      { label: "Certification Status", type: "select", options: ["Active / Certified", "Lifetime Certified", "Board Eligible", "In Progress"], defaultValue: "Active / Certified", help: "Subject to primary source verification" },
      { label: "Recertification / Expiration Date", type: "text", defaultValue: "2028-12-31", help: "MOC tracking date" },
    ],
  },
  {
    id: 7,
    name: "Malpractice Information",
    shortName: "Malpractice Insurance",
    category: "Liability Coverage",
    estimatedTime: "4 min",
    helpSlug: "malpractice-insurance-and-coi-requirements",
    purpose: "Upload your current professional liability Certificate of Insurance (COI) with policy limits and dates.",
    whyNeeded: "All health plans require minimum coverage ($1,000,000 per occurrence / $3,000,000 aggregate). Payers will not credential without active COI.",
    cvoAction: "Audits the Certificate of Insurance for policyholder legal name, retroactive dates, and verifies carrier AM Best rating.",
    requiredDocuments: [
      { name: "Certificate of Insurance (COI)", format: "PDF Document", rule: "$1M/$3M limits, active coverage dates, clinician named as insured" },
    ],
    pitfalls: [
      "Uploading a policy quote or binder instead of a Certificate of Insurance (COI).",
      "Coverage limits lower than payer requirements (e.g. $500k instead of $1M).",
      "Missing retroactive date on claims-made policies.",
    ],
    mockFields: [
      { label: "Insurance Carrier Name", type: "text", defaultValue: "The Doctors Company", help: "Must have an AM Best rating of A- or higher" },
      { label: "Policy Number", type: "text", defaultValue: "TDC-2026-99410", help: "Found on your declarations page" },
      { label: "Per Occurrence Limit", type: "select", options: ["$1,000,000 (Standard)", "$2,000,000", "$3,000,000"], defaultValue: "$1,000,000 (Standard)", help: "Commercial minimum requirement" },
      { label: "Aggregate Limit", type: "select", options: ["$3,000,000 (Standard)", "$5,000,000"], defaultValue: "$3,000,000 (Standard)", help: "Annual total limit" },
    ],
  },
  {
    id: 8,
    name: "Education",
    shortName: "Education & Residencies",
    category: "Academic Credentials",
    estimatedTime: "5 min",
    helpSlug: "medical-education-and-residency-documentation",
    purpose: "Log medical or professional graduate school, internship, residency, and fellowship training programs.",
    whyNeeded: "Accreditation standards (NCQA, URAC) require verified graduation and completion of accredited postgraduate training.",
    cvoAction: "Transmits electronic verification requests to National Student Clearinghouse and medical education program offices.",
    requiredDocuments: [
      { name: "Medical / Graduate School Diploma", format: "PDF Copy", rule: "Clear copy showing degree conferral date" },
      { name: "Residency Completion Certificate", format: "PDF Copy", rule: "ACGME / AOA accredited program certificate" },
      { name: "ECFMG Certificate (if applicable)", format: "PDF Copy", rule: "Required for International Medical Graduates (IMG)" },
    ],
    pitfalls: [
      "Entering the wrong graduation month or year matching university registrar records.",
      "Leaving out internship details or fellowship certificates.",
    ],
    mockFields: [
      { label: "Medical / Graduate School Name", type: "text", defaultValue: "Columbia University Vagelos College of Physicians and Surgeons", help: "Degree granting institution" },
      { label: "Degree Awarded", type: "select", options: ["Doctor of Medicine (MD)", "Doctor of Osteopathic Medicine (DO)", "Master of Science in Nursing (MSN)", "PsyD / PhD"], defaultValue: "Doctor of Medicine (MD)", help: "Clinical qualification degree" },
      { label: "Residency Program", type: "text", defaultValue: "NewYork-Presbyterian Hospital / Columbia University", help: "Postgraduate residency training" },
      { label: "Residency Completion Year", type: "text", defaultValue: "2012", help: "Month & year of completion" },
    ],
  },
  {
    id: 9,
    name: "Employment Information",
    shortName: "Work History & Gaps",
    category: "Chronological History",
    estimatedTime: "6 min",
    helpSlug: "work-history-gaps-and-attestations",
    purpose: "Document a complete 5-year chronological work history and provide formal written explanations for any gaps over 30 days.",
    whyNeeded: "Health plan credentialing committees scrutinize CV gaps to ensure there were no unstated license suspensions or disciplinary actions.",
    cvoAction: "Cross-checks employment dates against state board filings and hospital affiliations.",
    requiredDocuments: [
      { name: "Curriculum Vitae (CV)", format: "PDF / DOCX", rule: "Must list MM/YYYY start and end dates for all positions" },
    ],
    pitfalls: [
      "Any gap longer than 30 days without an explanation.",
      "Listing only years (e.g., 2021-2023) instead of exact months (e.g., 03/2021 - 08/2023).",
      "Overlapping full-time clinical roles without clarification.",
    ],
    mockFields: [
      { label: "Current Primary Employer / Practice", type: "text", defaultValue: "Mantra Mental Health Associates, PC", help: "Your active clinical affiliation" },
      { label: "Start Date (Month / Year)", type: "text", defaultValue: "01/2020 - Present", help: "Use MM/YYYY format" },
      { label: "Are there any work history gaps exceeding 30 days?", type: "toggle", defaultValue: "No", help: "If Yes, a brief explanation modal will appear" },
    ],
  },
  {
    id: 10,
    name: "Practice Information",
    shortName: "Practice & Tax ID",
    category: "Facilities & W-9",
    estimatedTime: "4 min",
    helpSlug: "practice-location-and-tax-id-rules",
    purpose: "Provide your physical practice location, billing address, IRS Form W-9, and Tax Identification Number (EIN).",
    whyNeeded: "Payers use physical addresses for public provider directories under the federal No Surprises Act. P.O. Boxes are strictly prohibited for service locations.",
    cvoAction: "Validates TIN with IRS records and verifies physical address against USPS commercial delivery point databases.",
    requiredDocuments: [
      { name: "Signed IRS Form W-9", format: "Signed PDF", rule: "Must be signed within the current tax year, matching legal TIN" },
    ],
    pitfalls: [
      "Entering a P.O. Box as the physical practice address.",
      "Discrepancy between legal business name on W-9 and IRS EIN issuance letter.",
      "Missing handicap accessibility or telehealth indicators.",
    ],
    mockFields: [
      { label: "Physical Practice Street Address", type: "text", defaultValue: "450 Sutter Street, Suite 1420", help: "No P.O. Boxes allowed for physical care sites" },
      { label: "City, State, ZIP", type: "text", defaultValue: "San Francisco, CA 94108", help: "Used for public provider directory publishing" },
      { label: "Federal Tax ID (EIN or SSN)", type: "text", defaultValue: "94-3829104", help: "Must match IRS W-9 form exactly" },
      { label: "Practice Setting", type: "select", options: ["Private Office / Outpatient Clinic", "Telehealth Only", "Hybrid (In-Person & Telehealth)"], defaultValue: "Hybrid (In-Person & Telehealth)", help: "Important for directory flags" },
    ],
  },
  {
    id: 11,
    name: "Insurance",
    shortName: "Payers & Accounts",
    category: "Payer Selection & Portals",
    estimatedTime: "5 min",
    helpSlug: "choosing-commercial-vs-government-health-plans",
    purpose: "Select your target commercial and Medicaid/Medicare payer panels, and state your CMS I&A and Availity status.",
    whyNeeded: "Directs which insurance panels MantraComply applies to on your behalf, and determines surrogate setup requirements.",
    cvoAction: "Submits roster additions through Availity, sets up CMS I&A Medicare surrogacy in PECOS, and tracks committee approvals.",
    requiredDocuments: [
      { name: "CMS I&A Account Info", format: "Electronic Delegation", rule: "Approve MantraComply CVO surrogate request at ia.cms.gov" },
      { name: "Availity Essentials Access", format: "User Invite", rule: "Designate MantraComply credentialing specialist in User Management" },
    ],
    pitfalls: [
      "Answering 'No' to CMS I&A account when you already have an NPI, causing duplicate account flags.",
      "Failing to approve the surrogate request at ia.cms.gov, delaying Medicare PECOS submissions.",
    ],
    mockFields: [
      { label: "Target Commercial Payers", type: "checkbox-group", options: ["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare / Optum", "Medicare Part B (PECOS)"], defaultValue: "All Selected", help: "Select networks you wish to participate in" },
      { label: "Do you have an active CMS Identity & Access (I&A) account?", type: "toggle", defaultValue: "Yes", help: "Used for NPPES and Medicare PECOS management" },
      { label: "Do you or your practice have an active Availity Essentials account?", type: "toggle", defaultValue: "Yes", help: "Largest provider clearinghouse used for Elevance/Anthem and BCBS" },
    ],
  },
  {
    id: 12,
    name: "Release Forms",
    shortName: "Attestation & Release",
    category: "Legal Authorizations",
    estimatedTime: "3 min",
    helpSlug: "background-checks-and-release-forms",
    purpose: "Answer standard NCQA disclosure questions and provide your electronic signature granting MantraComply CVO authorization.",
    whyNeeded: "Legal requirement authorizing MantraComply to act as your credentialing agent and query primary source databases.",
    cvoAction: "Packages the countersigned release form into your master credentialing dossier transmitted to all health plans.",
    requiredDocuments: [
      { name: "MantraComply CVO Authorization Agreement", format: "Electronic Signature", rule: "Signed with legal name and IP timestamp" },
    ],
    pitfalls: [
      "Failing to disclose past malpractice settlements or license investigations.",
      "Signature name not matching legal name.",
    ],
    mockFields: [
      { label: "Have you ever had a license suspended, revoked, or placed on probation?", type: "toggle", defaultValue: "No", help: "Standard NCQA disclosure question" },
      { label: "Are there any pending malpractice claims or judgments against you?", type: "toggle", defaultValue: "No", help: "Required for payer risk assessment" },
      { label: "Electronic Signature (Type Legal Name)", type: "text", defaultValue: "Eleanor Vance, MD", help: "Confirms agreement to CVO terms and disclosures" },
    ],
  },
];

export function CredentialingTourPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<"overview" | "form" | "documents" | "pitfalls">("overview");
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    document.title = "Interactive Credentialing Tour | MantraComply Help Center";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentStep = TOUR_STEPS[currentStepIndex];
  const progressPercent = Math.round(((completedSteps.size) / TOUR_STEPS.length) * 100);

  const handleStepClick = (index: number) => {
    setCurrentStepIndex(index);
    window.scrollTo({ top: 260, behavior: "smooth" });
  };

  const markCurrentUnderstood = () => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(currentStep.id);
      return next;
    });
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 260, behavior: "smooth" });
    }
  };

  const handleResetTour = () => {
    setCompletedSteps(new Set());
    setCurrentStepIndex(0);
  };

  const handleMarkAllComplete = () => {
    setCompletedSteps(new Set(TOUR_STEPS.map((s) => s.id)));
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-r from-[#043570] via-[#06428c] to-[#043570] text-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 shadow-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40">
                <Sparkles className="size-3.5" />
                Interactive Walkthrough
              </span>
              <span>•</span>
              <span className="text-slate-300">Tailored for MantraComply Provider Onboarding</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all shadow-xs cursor-pointer"
              >
                <Play className="size-4 fill-cyan-400 text-cyan-400" />
                Watch Video Walkthrough
              </button>
              <Link
                to="/"
                className="text-xs sm:text-sm text-slate-300 hover:text-white transition-colors"
              >
                Exit to Help Center
              </Link>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Interactive Credentialing Tour
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Explore every stage of the 12-step MantraComply Provider Credentialing Wizard. Preview form fields, understand document requirements, and avoid the common traps that delay health plan approvals.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Tour Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Progress Sidebar: 4 cols */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-6 space-y-6">
              {/* Progress Box */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  <span>Tour Progress</span>
                  <span className="text-[#008cb8] font-extrabold">{progressPercent}%</span>
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="text-2xl font-black text-slate-900">
                    {completedSteps.size}{" "}
                    <span className="text-sm font-normal text-slate-400">/ {TOUR_STEPS.length} steps understood</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#043570] to-[#00c0ff] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Step Navigation Buttons */}
              <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
                {TOUR_STEPS.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isDone = completedSteps.has(step.id);

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(idx)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-blue-50/90 text-[#043570] border border-blue-200 shadow-xs"
                          : isDone
                          ? "text-slate-700 hover:bg-slate-50 border border-transparent"
                          : "text-slate-500 hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`size-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                            isDone
                              ? "bg-emerald-500 text-white"
                              : isCurrent
                              ? "bg-[#043570] text-white"
                              : "bg-slate-100 text-slate-400 border border-slate-200"
                          }`}
                        >
                          {isDone ? <Check className="size-3.5 stroke-[3]" /> : step.id}
                        </div>
                        <span className="truncate">{step.name}</span>
                      </div>

                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-[#043570] shrink-0 ml-2">
                          Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Footer Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={handleResetTour}
                  className="hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3.5" />
                  Reset Tour
                </button>
                <button
                  onClick={handleMarkAllComplete}
                  className="hover:text-[#043570] font-semibold transition-colors cursor-pointer"
                >
                  Mark All Complete
                </button>
              </div>
            </div>
          </div>

          {/* Right Tour Display Area: 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step Card Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#008cb8]">
                      Step {currentStep.id} of {TOUR_STEPS.length}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">{currentStep.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="size-3 text-slate-400" />
                      ~{currentStep.estimatedTime}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {currentStep.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (completedSteps.has(currentStep.id)) {
                        setCompletedSteps((prev) => {
                          const next = new Set(prev);
                          next.delete(currentStep.id);
                          return next;
                        });
                      } else {
                        setCompletedSteps((prev) => new Set([...prev, currentStep.id]));
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      completedSteps.has(currentStep.id)
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <CheckCircle2 className="size-4" />
                    {completedSteps.has(currentStep.id) ? "Marked as Understood" : "Mark as Understood"}
                  </button>
                </div>
              </div>

              {/* Step Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "overview"
                      ? "bg-[#043570] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Overview & Purpose
                </button>
                <button
                  onClick={() => setActiveTab("form")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "form"
                      ? "bg-[#043570] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Form Preview Simulation
                </button>
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "documents"
                      ? "bg-[#043570] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Required Documents ({currentStep.requiredDocuments.length})
                </button>
                <button
                  onClick={() => setActiveTab("pitfalls")}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeTab === "pitfalls"
                      ? "bg-[#043570] text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Common Pitfalls ({currentStep.pitfalls.length})
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center gap-2 text-[#043570] font-bold text-sm">
                      <Info className="size-4" />
                      What This Step Does in MantraComply
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {currentStep.purpose}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Why Payers Require This
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {currentStep.whyNeeded}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#008cb8]">
                        MantraComply CVO Action
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {currentStep.cvoAction}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-500">
                      Need complete guidance on this specific step?
                    </span>
                    <Link
                      to={`/articles/${currentStep.helpSlug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#043570] hover:text-[#008cb8] transition-colors"
                    >
                      Read full {currentStep.shortName} guide
                      <ExternalLink className="size-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Tab 2: Simulated Form Preview */}
              {activeTab === "form" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4 text-[#043570]" />
                      <span>
                        Simulated view of <strong>MantraComply Credentialing Wizard &gt; {currentStep.name}</strong>
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Interactive Mock
                    </span>
                  </div>

                  <div className="space-y-4 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
                    {currentStep.mockFields.map((fld, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">
                          {fld.label}
                        </label>

                        {fld.type === "text" && (
                          <input
                            type="text"
                            defaultValue={fld.defaultValue}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-mono bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#043570]/30"
                          />
                        )}

                        {fld.type === "select" && (
                          <select
                            defaultValue={fld.defaultValue}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#043570]/30"
                          >
                            {fld.options?.map((opt, i) => (
                              <option key={i} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        )}

                        {fld.type === "toggle" && (
                          <div className="flex items-center gap-3 pt-1">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Active / Yes
                            </span>
                            <span className="text-xs text-slate-500">Preset to compliant default</span>
                          </div>
                        )}

                        {fld.type === "checkbox-group" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {fld.options?.map((opt, i) => (
                              <label
                                key={i}
                                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 cursor-pointer hover:bg-slate-100"
                              >
                                <input type="checkbox" defaultChecked className="rounded text-[#043570]" />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        <p className="text-[11px] text-slate-500">{fld.help}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Required Documents */}
              {activeTab === "documents" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Prepare the following documents before completing this step to ensure instant CVO validation:
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {currentStep.requiredDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="size-10 rounded-xl bg-blue-50 text-[#043570] flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="size-5" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">{doc.name}</h4>
                            <p className="text-xs text-slate-500">{doc.rule}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 shrink-0">
                          {doc.format}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Common Pitfalls */}
              {activeTab === "pitfalls" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Avoid these frequent mistakes to prevent multi-week committee holds:
                  </p>

                  <div className="space-y-3">
                    {currentStep.pitfalls.map((pitfall, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex items-start gap-3"
                      >
                        <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                          {pitfall}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Step Controller */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => {
                    if (currentStepIndex > 0) {
                      setCurrentStepIndex(currentStepIndex - 1);
                      window.scrollTo({ top: 260, behavior: "smooth" });
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    currentStepIndex === 0
                      ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                  }`}
                >
                  <ArrowLeft className="size-4" />
                  Previous Step
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={markCurrentUnderstood}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#043570] hover:bg-[#06428c] text-white shadow-xs transition-all cursor-pointer"
                  >
                    <span>{currentStepIndex === TOUR_STEPS.length - 1 ? "Finish Tour" : "Next Step"}</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Walkthrough Embedded Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#043570] uppercase tracking-wider">
                    <Video className="size-4" />
                    Complete Video Walkthrough
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Watch the MantraComply Provider Onboarding Tour
                  </h3>
                </div>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/G56-6s4mJd8"
                  title="MantraComply Credentialing Wizard Video Walkthrough"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                This official video walkthrough explains the end-to-end credentialing process, document uploads, and how our automated CVO verifies your primary source information.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Video Modal if triggered from header */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                MantraComply Credentialing Video Walkthrough
              </h3>
              <button
                onClick={() => setShowVideoModal(false)}
                className="size-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/G56-6s4mJd8?autoplay=1"
                title="MantraComply Credentialing Wizard Video Walkthrough"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
