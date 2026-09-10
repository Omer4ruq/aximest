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
  { n: "03", label: "Expertise", href: "/#expertise" },
  { n: "04", label: "Contact", href: "/contact" },
  { n: "05", label: "Podcasts", href: "/podcasts" },
];
