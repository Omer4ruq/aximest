export const site = {
  name: "Aximest",
  mark: "Axmst®",
  tagline: "Development Labs",
  city: "Mtl (Can)",
  code: "/0026",
  codeLabel: "Engineering_",
  contactCode: "F034671",
  phone: "(514) 874-3224",
  since: "In business since 2016",
};

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  count: number;
  slug: string;
};

export const services: Service[] = [
  {
    id: "advisory",
    index: "S/001",
    title: "Advisory",
    description:
      "Gain strategic insights from our fractional CTOs, benefit from comprehensive technical reviews, and accelerate development with expert backend, frontend, and DevOps solutions.",
    count: 9,
    slug: "/services/advisory",
  },
  {
    id: "blockchain",
    index: "S/002",
    title: "Blockchain",
    description:
      "Delivering secure immutable data, smart contract development, tokenomics, and zero-knowledge proof technologies to optimize security, transparency, and financial operations.",
    count: 17,
    slug: "/services/blockchain",
  },
  {
    id: "product-development",
    index: "S/003",
    title: "Product Development",
    description:
      "Bring market-ready products to life: prototypes & MVPs, SaaS, web and mobile applications, from planning and design to coding, testing, and ongoing maintenance.",
    count: 7,
    slug: "/services/product-development",
  },
  {
    id: "enterprise-software",
    index: "S/004",
    title: "Enterprise Software",
    description:
      "Scale effectively: streamline operations with customized platforms, enhance productivity through advanced integrations, and secure your infrastructure with robust support systems.",
    count: 9,
    slug: "/services/enterprise-software",
  },
  {
    id: "ai",
    index: "S/005",
    title: "Artificial Intelligence (AI)",
    description:
      "Enhance operations with AI: strategy, LLM integration, automated decision systems, and OCR technology, tailored to optimize performance and efficiency.",
    count: 10,
    slug: "/services/artificial-intelligence",
  },
];

export const clients = [
  {
    index: "I/001",
    title: "Startups",
    description:
      "Empowering startups with agile development and cost-effective solutions, we excel in product thinking, rapid prototyping, MVP development, and comprehensive mobile and SaaS solutions.",
    cta: "Build with us",
  },
  {
    index: "I/002",
    title: "Enterprises",
    description:
      "Our Enterprise Services streamline operations by building new products, deploying ERPs, and enabling access to new technologies. With diligent monitoring and support we safeguard your business around the clock.",
    cta: "Shape what's next",
  },
  {
    index: "I/003",
    title: "Web 3 Companies",
    description:
      "From establishing Layer 1 and Layer 2 protocols to crafting intricate smart contracts and creating engaging frontend, we spearhead projects forward, whether it's a meme coin or a complex zk-proof system.",
    cta: "Take Your Product Further",
  },
];

export const pillars = [
  {
    key: "expertise",
    label: "Expertise",
    items: [
      {
        n: "01",
        title: "Edgetech",
        body: "The latest in technology trends, from blockchain to artificial intelligence.",
      },
      {
        n: "02",
        title: "In-House",
        body: "Professional local talent in your timezone, no outsourcing involved. Direct communication and collaboration.",
      },
      {
        n: "03",
        title: "Experienced",
        body: "Hackers to straight-A students, over 90% of our developers are senior engineers with various areas of expertise.",
      },
    ],
  },
  {
    key: "values",
    label: "Values",
    items: [
      {
        n: "01",
        title: "Flexibility",
        body: "We adapt swiftly to the evolving needs of our clients and markets, ensuring tailored solutions.",
      },
      {
        n: "02",
        title: "Performance",
        body: "Driven by excellence, we consistently deliver top-tier results, setting industry standards for quality and efficiency.",
      },
      {
        n: "03",
        title: "Innovation",
        body: "Our commitment to innovation keeps us at the forefront of technology, empowering us to solve complex challenges creatively.",
      },
    ],
  },
  {
    key: "methodology",
    label: "Methodology",
    items: [
      {
        n: "01",
        title: "Product Thinking",
        body: "Product-centric mindset, focusing on delivering functional, user-oriented solutions that drive value.",
      },
      {
        n: "02",
        title: "Collaborative",
        body: "Working closely with your team to ensure their vision and objectives are fully realized in every project.",
      },
      {
        n: "03",
        title: "Scalable",
        body: "Designed to scale seamlessly with your business needs, ensuring robust solutions that accommodate growth and change.",
      },
    ],
  },
];

export const testimonial = {
  quote:
    "I was truly impressed by their level of flexibility, professionalism, and dedication when it came to tackling the workload. Their commitment to the task at hand, coupled with their serious approach, truly stood out to me.",
  author: "Eugen Baicea",
  role: "SR. Producer",
  company: "Amber Studio",
};

export const offices = [
  {
    country: "Canada",
    lines: ["460 Saint-Catherine W.", "Suite 305", "Montreal, Quebec", "H3B 1A6"],
  },
  {
    country: "United States",
    lines: ["333 SE 2nd Avenue", "Suite 2000", "Miami Florida", "33131"],
  },
];

export const nav = [
  { n: "01", label: "Services", href: "/#services", children: services },
  { n: "02", label: "Projects", href: "/projects" },
  { n: "03", label: "Expertise", href: "/expertise" },
  { n: "04", label: "Contact", href: "/contact" },
  { n: "05", label: "Podcasts", href: "/podcasts" },
];

/* ---------------------------------------------------------------
   Inner pages
   --------------------------------------------------------------- */

export const projects = [
  { n: "01", name: "Styllar", kind: "Marketplace", group: "Web 3",
    body: "A cross-chain marketplace with on-chain royalties, batch listings and a settlement layer built for volume." },
  { n: "02", name: "Sonr", kind: "Layer 1", group: "Web 3",
    body: "Protocol design, validator tooling and an SDK that lets application teams ship without touching consensus." },
  { n: "03", name: "Formula E: High Voltage", kind: "GameFi", group: "Web 3",
    body: "A racing title with tokenised assets, an in-game economy and a custody layer players never have to think about." },
  { n: "04", name: "Northbound Health", kind: "Platform", group: "Web 2",
    body: "A HIPAA-compliant care platform: scheduling, records and billing consolidated into one operational system." },
  { n: "05", name: "Cargoline", kind: "Logistics", group: "Web 2",
    body: "Fleet telemetry, route optimisation and a dispatch console replacing a decade of spreadsheets." },
  { n: "06", name: "Ledgerbase", kind: "Fintech", group: "Web 2",
    body: "A double-entry ledger and reconciliation engine handling millions of daily postings." },
];

export const projectGroups = ["Web 3", "Web 2"];

export const stack = [
  { n: "01", name: "Python", kind: "Language", group: "Language",
    body: "Backend services, data pipelines and ML tooling — our default for anything analytical." },
  { n: "02", name: "React Native", kind: "Framework", group: "Mobile",
    body: "One codebase across iOS and Android, with native modules where performance demands them." },
  { n: "03", name: "React JS", kind: "Framework", group: "Frontend",
    body: "Component architecture, state boundaries and rendering strategies that survive a growing team." },
  { n: "04", name: "Django", kind: "Framework", group: "Backend",
    body: "Batteries-included APIs, admin tooling and migrations for products that need to ship this quarter." },
  { n: "05", name: "Rust", kind: "Language", group: "Language",
    body: "Where correctness and throughput both matter: protocol clients, indexers and cryptographic work." },
  { n: "06", name: "Solidity", kind: "Language", group: "Smart Contract",
    body: "Audited contract systems, upgrade paths and gas profiles reviewed line by line." },
  { n: "07", name: "Go", kind: "Language", group: "Backend",
    body: "Concurrent services and infrastructure daemons where predictable latency is the requirement." },
  { n: "08", name: "CosmWasm", kind: "Backend", group: "Smart Contract",
    body: "Contract development for Cosmos-based chains, from module design to IBC integration." },
  { n: "09", name: "PostgreSQL", kind: "Database", group: "Database",
    body: "Schema design, query planning and partitioning strategies for datasets that keep growing." },
  { n: "10", name: "Kubernetes", kind: "Infrastructure", group: "Infrastructure",
    body: "Cluster topology, autoscaling and deployment pipelines that fail safely." },
  { n: "11", name: "TypeScript", kind: "Language", group: "Frontend",
    body: "Types as design documentation — the contract between your teams and your future selves." },
  { n: "12", name: "Node JS", kind: "Web App", group: "Backend",
    body: "Real-time services, edge workloads and the glue between systems that were never meant to meet." },
];

export const stackGroups = [
  "All", "Backend", "Frontend", "Mobile", "Database",
  "Infrastructure", "Language", "Smart Contract",
];

export const podcasts = [
  {
    title: "The Innovation Blueprint",
    host: "Phil Therien",
    status: "English only",
    tags: ["Manufacturing", "AI", "Cloud", "Systems", "Leadership", "Energy", "Scaling"],
    body: "Real talk about what's broken and how the best operators are fixing it. Conversations with founders and technical leaders reshaping modern industries.",
  },
  {
    title: "The Interchain Talk Show",
    host: "Utkarsh Varma",
    status: "Coming soon",
    tags: ["Blockchain", "L1s", "L2s", "Privacy", "Interchain", "DeFi", "RWA"],
    body: "From technical deep-dives to industry insights, we break down complex topics into engaging discussions that matter to developers and investors alike.",
  },
];

export const articles = [
  { id: "ART/766", date: "Mar 4, 2026", tags: ["Healthcare", "Machine Learning"], title: "Machine Learning in Medical Imaging: Uses & Challenges" },
  { id: "ART/765", date: "Mar 4, 2026", tags: ["Machine Learning", "Retail"], title: "Machine Learning in Retail: Use Cases, Benefits & Guide" },
  { id: "ART/764", date: "Mar 4, 2026", tags: ["Logistics", "Machine Learning"], title: "Machine Learning in Logistics: From Data to Delivery" },
  { id: "ART/763", date: "Mar 3, 2026", tags: ["Machine Learning", "Telecom"], title: "Understanding Machine Learning in Telecommunications Systems" },
  { id: "ART/762", date: "Mar 1, 2026", tags: ["Blockchain", "Security"], title: "Zero-Knowledge Proofs Without the Hand-Waving" },
  { id: "ART/761", date: "Feb 26, 2026", tags: ["Architecture"], title: "Designing Systems That Survive Their Second Year" },
  { id: "ART/760", date: "Feb 24, 2026", tags: ["AI", "Product"], title: "Shipping LLM Features Users Actually Trust" },
  { id: "ART/759", date: "Feb 20, 2026", tags: ["DevOps"], title: "The Deployment Pipeline as a Product" },
];

/** Extra copy for each service detail page. */
export const serviceDetail: Record<
  string,
  { abbr: string; statement: string; intro: string; capabilities: string[]; items: { n: string; title: string; slug: string; body: string }[] }
> = {
  advisory: {
    abbr: "ADVSR",
    statement: "Leverage the proficiency of our senior team of experts.",
    intro: "Access our top team's deep expertise for your strategic needs. Get insightful consultations, technical roadmaps, and elite talent to strengthen your lineup.",
    capabilities: ["Technology Architecture", "Product Management", "Systems Integration", "DevOps Methodology", "Cloud Services", "Application Security"],
    items: [
      { n: "001", title: "Fractional CTO", slug: "fractional-cto", body: "Expert tech leadership without full-time commitment, tailored to your budget and needs." },
      { n: "002", title: "Technical Due Diligence", slug: "technical-due-diligence", body: "A senior engineering assessment of the codebase, architecture, and team before you commit." },
      { n: "003", title: "IT Staff Augmentation", slug: "it-staff-augmentation", body: "Senior engineers embedded directly in your team, adding delivery capacity without the hiring cycle." },
      { n: "004", title: "Frontend Development", slug: "frontend-development", body: "Engaging, functional, and visually appealing UIs, enhancing user experience across devices." },
      { n: "005", title: "Backend Development", slug: "backend-development", body: "APIs and services designed for the load you have and the load you are planning for." },
      { n: "006", title: "DevOps Consulting", slug: "devops-consulting", body: "Pipelines, observability and infrastructure-as-code that make releases boring." },
      { n: "007", title: "Cloud Consulting", slug: "cloud-consulting", body: "Migration paths and cost models grounded in what your workloads actually do." },
      { n: "008", title: "Technology Consulting", slug: "technology-consulting", body: "Independent guidance on build-versus-buy, vendor selection and technical strategy." },
      { n: "009", title: "Fullstack Specialists", slug: "fullstack-specialists", body: "Engineers who own a feature end to end, from schema to interface." },
    ],
  },
  blockchain: {
    abbr: "BLKCH",
    statement: "Protocols, contracts and infrastructure built to be audited.",
    intro: "Delivering secure immutable data, smart contract development, tokenomics, and zero-knowledge proof technologies to optimize security, transparency, and financial operations.",
    capabilities: ["Protocol Design", "Smart Contracts", "Tokenomics", "Zero-Knowledge", "Node Infrastructure", "Wallet Systems"],
    items: [
      { n: "001", title: "Smart Contracts", slug: "smart-contracts", body: "Contract systems written for review: explicit invariants, upgrade paths and gas budgets." },
      { n: "002", title: "Blockchain Consulting", slug: "blockchain-consulting", body: "Chain selection, architecture and compliance framing before a line of code is written." },
      { n: "003", title: "Web3 Development", slug: "web3-development", body: "Frontends, indexers and wallet flows that hide the chain from the people using it." },
      { n: "004", title: "NFT Marketplace", slug: "nft-marketplace", body: "Listings, royalties and settlement designed for throughput rather than a demo." },
      { n: "005", title: "DeFi Development", slug: "defi-development", body: "Lending, AMM and staking primitives with economic assumptions written down." },
      { n: "006", title: "Node Infrastructure", slug: "node-infrastructure", body: "Validator and RPC fleets with the monitoring to know they are healthy." },
      { n: "007", title: "Wallet Development", slug: "wallet-development", body: "Custody, recovery and signing flows for people who will never read a seed phrase." },
      { n: "008", title: "DAO Systems", slug: "dao-systems", body: "Governance contracts, proposal tooling and treasury controls." },
      { n: "009", title: "Token Design", slug: "token-design", body: "Supply schedules and incentive mechanics modelled before launch." },
    ],
  },
  "product-development": {
    abbr: "PRDCT",
    statement: "From a whiteboard sketch to something people pay for.",
    intro: "Bring market-ready products to life: prototypes & MVPs, SaaS, web and mobile applications, from planning and design to coding, testing, and ongoing maintenance.",
    capabilities: ["Product Thinking", "Prototyping", "SaaS Architecture", "Mobile", "QA & Testing", "Maintenance"],
    items: [
      { n: "001", title: "Fast Prototyping", slug: "fast-prototyping", body: "A working artefact in weeks, built to answer the question you are actually asking." },
      { n: "002", title: "MVP Development", slug: "mvp-development", body: "The smallest thing that proves the model, engineered so it does not need throwing away." },
      { n: "003", title: "SaaS Development", slug: "saas-development", body: "Multi-tenancy, billing and permissions designed in from the first commit." },
      { n: "004", title: "Web Applications", slug: "web-applications", body: "Interfaces that stay fast as the data grows and the team changes." },
      { n: "005", title: "Mobile Applications", slug: "mobile-applications", body: "iOS and Android from one codebase, native where it counts." },
      { n: "006", title: "Project Takeover", slug: "project-takeover", body: "Inheriting someone else's codebase, stabilising it, and making it shippable again." },
      { n: "007", title: "Ongoing Maintenance", slug: "ongoing-maintenance", body: "Dependency hygiene, incident response and the unglamorous work that keeps products alive." },
    ],
  },
  "enterprise-software": {
    abbr: "ENTRP",
    statement: "Operational systems that hold up under real load.",
    intro: "Scale effectively: streamline operations with customized platforms, enhance productivity through advanced integrations, and secure your infrastructure with robust support systems.",
    capabilities: ["Custom Platforms", "ERP Deployment", "Integrations", "Data Migration", "Security", "24/7 Support"],
    items: [
      { n: "001", title: "Custom Platforms", slug: "custom-platforms", body: "Software shaped around how your business works, not the other way round." },
      { n: "002", title: "ERP Deployment", slug: "erp-deployment", body: "Implementation and configuration with the migration plan written first." },
      { n: "003", title: "System Integration", slug: "system-integration", body: "Connecting systems that were never designed to talk, reliably." },
      { n: "004", title: "Data Migration", slug: "data-migration", body: "Moving decades of records without losing the parts that matter." },
      { n: "005", title: "Legacy Modernisation", slug: "legacy-modernisation", body: "Incremental replacement — no big-bang rewrites, no frozen roadmaps." },
      { n: "006", title: "Infrastructure Security", slug: "infrastructure-security", body: "Hardening, access control and audit trails that satisfy your compliance team." },
      { n: "007", title: "Observability", slug: "observability", body: "Metrics, logs and traces arranged so an incident has one obvious first question." },
      { n: "008", title: "Managed Support", slug: "managed-support", body: "Monitoring and response around the clock, with humans on the other end." },
      { n: "009", title: "Performance Engineering", slug: "performance-engineering", body: "Profiling and tuning against the workloads you actually run." },
    ],
  },
  ai: {
    abbr: "AIML",
    statement: "AI that survives contact with production.",
    intro: "Enhance operations with AI: strategy, LLM integration, automated decision systems, and OCR technology, tailored to optimize performance and efficiency.",
    capabilities: ["AI Strategy", "LLM Integration", "Agents", "Decision Systems", "OCR", "Evaluation"],
    items: [
      { n: "001", title: "AI Strategy", slug: "ai-strategy", body: "Where a model helps, where it does not, and what it will cost to find out." },
      { n: "002", title: "LLM Integration", slug: "llm-integration", body: "Retrieval, tool use and guardrails wired into the systems you already run." },
      { n: "003", title: "AI Agents", slug: "ai-agents", body: "Agents with narrow scope, real evaluations and a clear failure mode." },
      { n: "004", title: "Automated Decisions", slug: "automated-decisions", body: "Decision systems with audit trails, so an answer can always be explained." },
      { n: "005", title: "Document Digitisation", slug: "document-digitisation", body: "OCR pipelines for the paper your business still runs on." },
      { n: "006", title: "Model Context Protocol", slug: "model-context-protocol", body: "MCP servers exposing your internal tools to assistants, safely." },
      { n: "007", title: "ML Development", slug: "ml-development", body: "Training, tuning and serving models against metrics that mean something." },
      { n: "008", title: "AI Automation", slug: "ai-automation", body: "Removing the repetitive work nobody was ever hired to do." },
      { n: "009", title: "Evaluation Harnesses", slug: "evaluation-harnesses", body: "Test suites for non-deterministic systems, run on every change." },
      { n: "010", title: "Data Preparation", slug: "data-preparation", body: "Labelling, cleaning and versioning — the part that decides whether any of it works." },
    ],
  },
};

