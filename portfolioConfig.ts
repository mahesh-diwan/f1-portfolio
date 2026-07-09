export interface Project {
  id: string;
  name: string;
  desc: string;
  type: string;
  tags: string[];
  link: string;
  demo?: string;
  accent: string;
  icon: string;
  status?: "in-production" | "experimental" | "archived";
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  date: string;
  desc: string;
  tags: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  minor?: string;
  period: string;
  gpa?: string;
  details?: string;
}

export interface SkillGroup {
  group: string;
  items: { name: string; pct: number; color: string }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  icon: string;
  url: string;
}

export const portfolioConfig = {
  name: "Mahesh Diwan",
  titleName: "Mahesh Diwan",
  role: "DevOps & Cloud Engineer",
  location: "Pune, India 🇮🇳",
  email: "diwanmahesh11@gmail.com",
  githubUsername: "mahesh-diwan",
  bioShort:
    "DevOps & Cloud Infrastructure Engineer | AWS, Kubernetes, Terraform & CI/CD Automation",
  bioLong:
    "I am a DevOps and Cloud Infrastructure Engineer focused on automating container runtimes, optimizing cloud resources, and streamlining continuous integration pipelines. I specialize in building secure, zero-downtime microservice environments on AWS EKS and ECS, provisioning reusable cloud infrastructure via Terraform module configurations, and writing automation scripts. I love constructing the automated systems that make software releases fast, secure, and stress-free.",
  bioBullets: [
    {
      icon: "🚀",
      text: "Deployed MERN services onto",
      boldText: "AWS ECS (Fargate) & EKS clusters",
      afterText: "running Task definitions behind ALBs",
    },
    {
      icon: "🛠️",
      text: "Structured K8s manifests for",
      boldText: "Deployments, Services, and HPAs",
      afterText: "to enable automated container self-healing",
    },
    {
      icon: "📦",
      text: "Engineered automated pipelines for",
      boldText: "Docker build → ECR push",
      afterText: "and rolling EC2/EKS staging rollouts",
    },
    {
      icon: "✍️",
      text: "Monitored system health parameters and",
      boldText: "authored technical DevOps guides",
      afterText: "on Instagram",
    },
  ],
  links: {
    github: "https://github.com/mahesh-diwan",
    linkedin: "https://www.linkedin.com/in/mahesh-diwan/",
    medium: "https://mahesh1215.hashnode.dev/",
    leetcode: "https://leetcode.com/mahesh-diwan",
    instagram: "https://www.instagram.com/mahesh_diwan1",
    coffee: "https://buymeacoffee.com/mahesh-diwan",
    upi: "diwanmahesh11@ybl",
    resume: "./MAHESH_DIWAN.pdf",
    hashnode: "https://mahesh1215.hashnode.dev/",
    twitter: "https://x.com/mahesh_diwan1",
  },
  education: [
    {
      id: "edu-1",
      institution: "Marathwada Mitra Mandal’s Institute of Technology (MMIT)",
      degree: "Bachelor of Engineering in Computer Science",
      period: "2023 — 2026",
      gpa: "CGPA: 8.7 / 10",
      details:
        "DevOps tools research, containerized application orchestration experiments.",
    },
    {
      id: "edu-2",
      institution: "Government Polytechnic Jalna",
      degree: "Diploma in Computer Engineering",
      period: "2021 — 2023",
      gpa: "Aggregate: 84.00%",
      details:
        "Systems architecture basics, Bash automation scripting, Linux admin basics.",
    },
    {
      id: "edu-3",
      institution: "Shri Saraswati Bhuvan Prashala",
      degree: "Secondary School Certificate (SSC)",
      period: "2020",
      gpa: "Score: 91%",
      details: "Chhatrapati Sambhajinagar",
    },
  ] as Education[],
  experience: [
    {
      id: "exp-1",
      company: "ThynkTech India",
      role: "Associate Software Engineer (DevOps Intern)",
      date: "Dec 2025 — May 2026",
      desc: "Automated deployment scaling of multi-service applications on AWS EKS and ECS (Fargate), reducing deployment lifecycle. Configured Horizontal Pod Autoscalers (HPAs) and CloudWatch monitoring alerts to scale resources dynamically. Authored secure Kubernetes manifests (Deployments, Services, ConfigMaps) and configured Secrets injection. Formed automated GitHub Actions CI/CD workflows, reducing container release pipeline latency.",
      tags: [
        "AWS ECS/EKS",
        "Kubernetes",
        "Docker",
        "GitHub Actions",
        "CloudWatch",
        "IAM",
        "VPC",
        "Nginx",
      ],
    },
    {
      id: "exp-2",
      company: "Personal Projects & Automation",
      role: "DevOps & Cloud Automation Developer",
      date: "Jan 2024 — Present",
      desc: "Provisioned multi-region AWS environments utilizing Terraform HCL workflows to standardize developer environments. Developed Python and Bash cloud telemetry tools, auditing active AWS infrastructure to optimize monthly sandbox costs. Configured Nginx reverse proxies with Let's Encrypt SSL encryptions on EC2, establishing secure routing paths.",
      tags: [
        "Bash Scripting",
        "Python",
        "Docker Compose",
        "Terraform",
        "Prometheus",
        "Linux",
        "Git",
      ],
    },
  ] as Experience[],
  projects: [
    {
      id: "proj-1",
      name: "LinkedIn Clone MERN",
      desc: "Full-stack social platform containerized with Docker Compose. Deployed to AWS ECS Fargate behind an ALB and migrated to EKS with horizontal pod autoscaling. CI/CD automated via GitHub Actions building and pushing to ECR with Prometheus logging and Terraform HCL definitions.",
      type: "DevOps · Cloud · MERN",
      tags: [
        "Docker",
        "AWS ECS/EKS",
        "ECR",
        "GitHub Actions",
        "React",
        "Node.js",
        "MongoDB",
      ],
      link: "https://github.com/mahesh-diwan/LinkedIn-Clone-EKS",
      accent: "#61afef",
      icon: "🐳",
      status: "in-production",
    },
    {
      id: "proj-2",
      name: "Distributed Voting App",
      desc: "Orchestrated a five-microservice system (Python frontend, C# worker, Node.js results API, Redis, and PostgreSQL) with Kubernetes manifests and Docker Compose configurations utilizing internal cluster DNS.",
      type: "Containers · Kubernetes",
      tags: [
        "Kubernetes",
        "Docker Compose",
        "Python",
        "Node.js",
        "C#",
        "Redis",
        "PostgreSQL",
      ],
      link: "https://github.com/mahesh-diwan/Distributed-Voting-App",
      accent: "#98c379",
      icon: "☸️",
      status: "experimental",
    },
    {
      id: "proj-3",
      name: "CI/CD Flask App AWS",
      desc: "Automated testing and continuous deployment pipeline to AWS EC2 instance using GitHub Actions. Integrated Docker image packaging to guarantee consistent environment variables across runtime stages.",
      type: "DevOps · CI/CD",
      tags: ["Flask", "GitHub Actions", "Docker", "AWS EC2", "Nginx"],
      link: "https://github.com/mahesh-diwan/Flask-App",
      accent: "#d19a66",
      icon: "⚙️",
      status: "in-production",
    },
    {
      id: "proj-4",
      name: "Chat With PDF Tool",
      desc: "Natural-language chat interface for uploaded PDF documents. Combines semantic queries, Hugging Face Transformers, and PyPDF2 parsers in a clean, interactive Streamlit frontend workflow.",
      type: "AI/RAG · Python",
      tags: ["Python", "Streamlit", "Hugging Face", "PyPDF2", "LangChain"],
      link: "https://github.com/mahesh-diwan/chat-with-pdf",
      accent: "#fe8019",
      icon: "📖",
      status: "experimental",
    },
    {
      id: "proj-5",
      name: "AWS Resource Tracker",
      desc: "Scheduled cron bash utility to inspect running cloud instances. Automatically monitors and logs active EC2 instances, S3 buckets, and Lambda triggers via AWS CLI to limit cost leakages.",
      type: "DevOps · Bash",
      tags: ["Bash", "AWS CLI", "Cron Jobs", "Linux"],
      link: "https://github.com/mahesh-diwan/AWS-Resource-Tracker",
      accent: "#c678dd",
      icon: "☁️",
      status: "archived",
    },
    {
      id: "proj-6",
      name: "Puppeteer Web Scraper",
      desc: "Efficient crawling utility built with Node.js and Puppeteer to parse and download structured data indexes, integrated with a Dockerized Flask REST API container backend.",
      type: "Backend · Web Scraping",
      tags: ["Node.js", "Puppeteer", "Flask", "Docker"],
      link: "https://github.com/mahesh-diwan/Web-Scraper",
      accent: "#56b6c2",
      icon: "🕸️",
      status: "archived",
    },
  ] as Project[],

  skills: [
    {
      group: "Languages",
      items: [
        { name: "Python", pct: 90, color: "#a855f7" },
        { name: "Bash", pct: 85, color: "#a855f7" },
        { name: "JavaScript", pct: 75, color: "#22c55e" },
        { name: "C++", pct: 65, color: "#eab308" },
        { name: "Java", pct: 60, color: "#eab308" },
      ],
    },
    {
      group: "Cloud & Infra",
      items: [
        { name: "AWS (ECS, EKS, EC2)", pct: 85, color: "#a855f7" },
        { name: "Terraform", pct: 70, color: "#22c55e" },
        { name: "Linux Administration", pct: 85, color: "#a855f7" },
      ],
    },
    {
      group: "Containers & CI/CD",
      items: [
        { name: "Docker & Compose", pct: 90, color: "#a855f7" },
        { name: "Kubernetes Manifests", pct: 80, color: "#22c55e" },
        { name: "GitHub Actions", pct: 90, color: "#a855f7" },
        { name: "Jenkins & SonarQube", pct: 75, color: "#22c55e" },
      ],
    },
  ] as SkillGroup[],
  otherSkills: [
    "AWS ECR",
    "Application Load Balancer (ALB)",
    "CloudWatch Dashboards",
    "IAM Policies",
    "ConfigMaps & Secrets",
    "Horizontal Pod Autoscaling (HPA)",
    "eksctl CLI",
    "Prometheus Metrics",
    "Nginx Reverse Proxy",
    "SSL/TLS configurations",
    "Prompt Design in Vertex AI (Google Cloud)",
    "Data Structures & Algorithms",
  ],
};
