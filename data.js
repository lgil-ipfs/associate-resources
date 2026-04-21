const portalData = {
  navigation: [
    { id: 'directory', label: 'Contact Directory', roles: ['All', 'New Advisor', 'Experienced Advisor', 'Administrator'] },
    { id: 'commissions', label: 'Commissions', roles: ['All', 'New Advisor', 'Experienced Advisor', 'Administrator'] },
    { id: 'compliance', label: 'Compliance', roles: ['All', 'New Advisor', 'Experienced Advisor', 'Administrator'] },
    { id: 'new-advisor', label: 'New Advisor Setup', roles: ['All', 'New Advisor'] },
    { id: 'practice', label: 'Practice Management', roles: ['All', 'Experienced Advisor'] },
    { id: 'admin', label: 'Admin Operations', roles: ['All', 'Administrator'] },
    { id: 'carriers', label: 'Carriers & Underwriting', roles: ['All', 'New Advisor', 'Experienced Advisor', 'Administrator'] }
  ],
  
  directory: {
    title: "Contact Directory",
    desc: "Find the right Customplan contact for your specific problem in under 30 seconds.",
    tabs: ["British Columbia", "Alberta", "National", "Executive Team"],
    contacts: [
      { name: "Jane Doe", role: "Commissions Administrator", email: "jane.doe@customplan.com", phone: "1-800-555-0101 ext 101", handles: "Commissions & Payroll, Statement Discrepancies", responseTime: "24-48 hours", region: "National" },
      { name: "John Smith", role: "BC Licensing Coordinator", email: "john.smith@customplan.com", phone: "1-800-555-0102", handles: "Contracting & Licensing, Renewals", responseTime: "Same business day", region: "British Columbia" },
      { name: "Sarah Lee", role: "Compliance Officer", email: "sarah.lee@customplan.com", phone: "1-800-555-0103", handles: "Compliance Questions, Resource Approval", responseTime: "2-3 business days", region: "National" },
      { name: "Mike Johnson", role: "Alberta Regional Manager", email: "mike.j@customplan.com", phone: "1-800-555-0104", handles: "Business Strategy, Escalations", responseTime: "24 hours", region: "Alberta" },
      { name: "Raymond CEO", role: "Chief Executive Officer", email: "raymond@customplan.com", phone: "", handles: "Executive relations", responseTime: "Varies", region: "Executive Team", exec: true },
      { name: "Amanda CFO", role: "Chief Financial Officer", email: "amanda@customplan.com", phone: "", handles: "Corporate Finance", responseTime: "Varies", region: "Executive Team", exec: true },
      { name: "Emily Chen", role: "Case Coordinator (BC)", email: "emily.chen@customplan.com", phone: "1-800-555-0105", handles: "New Business Submissions, Missing Requirements", responseTime: "24 hours", region: "British Columbia" }
    ]
  },
  
  commissions: {
    title: "Commissions",
    desc: "Access carrier schedules and learn how to track your compensation.",
    carriers: [
      { name: "Canada Life", scheduleUrl: "#", guideUrl: "#", hasPortalLogin: true },
      { name: "Manulife", scheduleUrl: "#", guideUrl: "#", hasPortalLogin: true },
      { name: "Empire Life", scheduleUrl: "#", guideUrl: "#", hasPortalLogin: false },
      { name: "Equitable", scheduleUrl: "#", guideUrl: "#", hasPortalLogin: true }
    ],
    operational: [
      { title: "Chargeback Rules Explainer", desc: "How chargebacks work across different products.", url: "#" },
      { title: "Debit Repayment Guide", desc: "Steps to handle negative commission balances.", url: "#" },
      { title: "FYC vs Renewal Breakdown", desc: "Understanding first-year vs renewal structures.", url: "#" }
    ]
  },
  
  compliance: {
    title: "Compliance",
    desc: "Your central hub for licensing, E&O, and regulatory requirements.",
    licenses: [
      { prov: "BC", portal: "https://www.insurancecouncilofbc.com/", renewal: "June 1", reqs: "Active E&O required. Trade names must be approved." },
      { prov: "AB", portal: "https://aic.ab.ca/", renewal: "June 30", reqs: "Mandatory CE credits required before renewal." },
      { prov: "ON", portal: "https://www.fsrao.ca/", renewal: "Varies", reqs: "Must report any other business activities." },
      { prov: "SK", portal: "https://www.skcouncil.sk.ca/", renewal: "Annual", reqs: "Provincial continuous education requirements apply." }
    ],
    eo: [
      { provider: "Customplan Sponsored E&O (Recommended)", features: "Group rates, automatic renewal sync with compliance.", type: "Individual", url: "#" },
      { provider: "Axis E&O", features: "Standard independent coverage.", type: "Individual", url: "#" },
      { provider: "Lloyds Corporate E&O", features: "Required if operating under an incorporated agency.", type: "Corporate", url: "#" }
    ],
    toolkitFiles: [
      { title: "Client Engagement Letter", desc: "Standard template to establish client relationship.", category: "Templates", date: "Jan 2026", reviewRequired: true },
      { title: "Reason Why Letter Form", desc: "Document client suitability for replacement policies.", category: "Suitability & KYC", date: "Feb 2026", reviewRequired: true },
      { title: "FINTRAC Identity Verification", desc: "AML individual verification form (latest version).", category: "AML / FINTRAC", date: "Mar 2026", reviewRequired: false },
      { title: "Privacy Consent Form", desc: "PIPEDA-compliant client generic consent.", category: "Privacy & PIPEDA", date: "Jan 2026", reviewRequired: true },
      { title: "LARF Reporting Form", desc: "Life Agent Reporting Form submitted to compliance.", category: "Staff Only", date: "Dec 2025", reviewRequired: false, adminOnly: true }
    ],
    bodies: [
      { name: "CISRO", type: "National", url: "https://www.cisro-ocra.com/" },
      { name: "CLHIA", type: "National", url: "https://www.clhia.ca/" },
      { name: "BC Insurance Council", type: "Provincial", url: "https://www.insurancecouncilofbc.com/" },
      { name: "Alberta Insurance Council", type: "Provincial", url: "https://aic.ab.ca/" }
    ],
    codes: [
      { carrier: "BMO Insurance", url: "#" },
      { carrier: "Canada Life", url: "#" },
      { carrier: "Empire Life", url: "#" },
      { carrier: "Manulife", url: "#" }
    ]
  },
  
  resources: [
    // New Advisor Setup
    { id: 1, title: "Submitting Your First Life Case", desc: "Step-by-step guide from forms to underwriting submission.", category: "Submitting Your First Case", section: "new-advisor", roles: ["New Advisor"], tags: [] },
    { id: 2, title: "How to Read an Illustration", desc: "A beginner's breakdown of participating vs UL illustrations.", category: "Education Basics", section: "new-advisor", roles: ["New Advisor"], tags: [] },
    { id: 3, title: "Basic Contracting Checklist", desc: "Documents needed to get your first carrier contract.", category: "Contracting", section: "new-advisor", roles: ["New Advisor", "Administrator"], tags: [] },
    
    // Practice Management
    { id: 4, title: "Retirement Needs Calculator", desc: "Excel tool to demonstrate retirement gaps to clients.", category: "Customplan Calculators", section: "practice", roles: ["Experienced Advisor"], tags: [] },
    { id: 5, title: "Corporate Estate Transfer Presentation", desc: "Slide deck for business owner clients.", category: "Presentations", section: "practice", roles: ["Experienced Advisor"], tags: ["Compliance Review Required Before Use"] },
    { id: 6, title: "Social Media Spring Campaign", desc: "Pre-approved social media graphics.", category: "Marketing", section: "practice", roles: ["Experienced Advisor", "New Advisor"], tags: ["Compliance Review Required Before Use"] },
    
    // Admin Operations
    { id: 7, title: "Policy Change Master Form", desc: "Standardized form for beneficiary/owner changes.", category: "Policy Service", section: "admin", roles: ["Administrator"], tags: [] },
    { id: 8, title: "Inforce Illustration Request Guide", desc: "How to request an inforce from all major carriers.", category: "Policy Service", section: "admin", roles: ["Administrator", "Experienced Advisor"], tags: [] },
    { id: 9, title: "Advisor Transfer-In Protocol", desc: "Steps to move an advisor's block of business to Customplan.", category: "Contracting", section: "admin", roles: ["Administrator"], tags: [] },
    
    // Carriers
    { id: 10, title: "Canada Life Underwriting Guide", desc: "Latest non-med limits and build charts.", category: "Underwriting", section: "carriers", roles: ["All"], tags: [] },
    { id: 11, title: "Equitable EZcomplete Tutorial", desc: "How to use the e-app software.", category: "Software", section: "carriers", roles: ["All"], tags: [] }
  ]
};
