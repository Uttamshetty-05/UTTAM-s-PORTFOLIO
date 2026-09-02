import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowDown,
  GraduationCap,
  Award,
  FolderGit2,
  Briefcase,
  Trophy,
  Languages,
} from "lucide-react";
import { Portrait } from "@/components/Portrait";
import { SKILLS, SkillCard } from "@/components/portfolio/SkillOrbit";
import { useReveal } from "@/hooks/use-reveal";
import resume from "@/assets/resume.pdf.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uttam Shetty — Computer Science Engineering Graduate" },
      {
        name: "description",
        content:
          "Interactive portfolio of Uttam Shetty: Computer Science Engineering graduate and MERN stack intern building Java, Spring Boot, React, Firebase and IoT applications.",
      },
      {
        property: "og:title",
        content: "Uttam Shetty — Computer Science Engineering Graduate",
      },
      {
        property: "og:description",
        content:
          "Java, Spring Boot, React and Firebase developer. MERN stack intern, WildGuard IoT wildlife alerts, digital UPI tipping platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["about", "About"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["courses", "Courses"],
  ["contact", "Contact"],
] as const;

function Index() {
  return (
    <main className="relative min-h-screen">
      <TopNav />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Courses />
      <Achievements />
      <Contact />
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Uttam Shetty — built with curiosity.
      </footer>
    </main>
  );
}

function TopNav() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 font-mono text-xs backdrop-blur md:flex">
      <span className="px-3 font-semibold text-accent">&lt;Uttam/&gt;</span>
      {NAV.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            active === id
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function Section({
  id,
  index,
  title,
  subtitle,
  icon,
  children,
}: {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { ref, className } = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className={`${className} mx-auto max-w-6xl px-5 py-24`}>
      <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-5">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">{index}</p>
          <h2 className="mt-2 flex items-center gap-3 text-3xl font-bold sm:text-4xl">
            {icon}
            {title}
          </h2>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

const STATS = [
  { value: "8.61", label: "CGPA / 10" },
  { value: "80+", label: "LeetCode solved" },
  { value: "20K+", label: "Images trained" },
  { value: "3+", label: "Shipped projects" },
];

function Hero() {
  return (
    <header className="relative grid-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-32 md:grid-cols-2 md:pt-40">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">
            HELLO_WORLD<span className="caret">_</span>
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] sm:text-6xl">
            Uttam Shetty
            <span className="mt-2 block bg-linear-to-r from-accent to-amber bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">
              Computer Science Engineering Graduate
            </span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Android, MERN and Spring Boot developer with hands-on experience in Firebase
            integration, REST APIs and API testing — building real-time apps with GPS tracking,
            push notifications and secure payments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
            <a
              href={resume.url}
              target="_blank"
              rel="noreferrer"
              download="Uttam_Shetty_Resume.pdf"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
          </div>
          <a
            href="#about"
            className="mt-12 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" /> scroll
          </a>
        </div>
        <Portrait />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 pb-20 sm:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-card/70 p-5 text-center backdrop-blur transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
          >
            <p className="text-3xl font-bold text-accent">{s.value}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}

function About() {
  const facts = [
    { icon: <MapPin className="h-4 w-4" />, label: "Udupi, Karnataka, India" },
    { icon: <Mail className="h-4 w-4" />, label: "shettyuttam010@gmail.com" },
    { icon: <Phone className="h-4 w-4" />, label: "+91 6363671124" },
    { icon: <Languages className="h-4 w-4" />, label: "English · Kannada · Hindi · Tulu" },
  ];
  return (
    <Section id="about" index="01" title="Hello, I'm Uttam!" subtitle="About">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Computer Science Engineering graduate with hands-on experience in Android application
            development, Firebase integration, REST APIs and software engineering principles.
          </p>
          <p>
            Skilled in Java, SQL, Spring Boot and API testing, with a strong understanding of OOP,
            DBMS and data structures. I've built real-time mobile applications involving GPS
            tracking, push notifications and secure payment systems — and I'm passionate about
            problem-solving and scalable software development.
          </p>
        </div>
        <ul className="space-y-3">
          {facts.map((f) => (
            <li
              key={f.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card/70 px-4 py-3 text-sm transition-colors hover:border-accent/60"
            >
              <span className="text-accent">{f.icon}</span>
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

const EDUCATION = [
  {
    period: "2022 – 2026",
    score: "CGPA: 8.61 / 10",
    title: "Bachelor of Engineering in Computer Science",
    place: "Vivekananda College of Engineering and Technology, Puttur",
  },
  {
    period: "2020 – 2022",
    score: "Percentage: 87.5%",
    title: "Pre-University Course (PCMCs)",
    place: "PRN Amratha Bharathi PU College, Hebri",
  },
  {
    period: "2018 – 2020",
    score: "Percentage: 82.4%",
    title: "Secondary School Leaving Certificate (SSLC)",
    place: "Herga Vittal Shetty Govt. High School, Kuchur",
  },
];

function Education() {
  return (
    <Section
      id="education"
      index="02"
      title="Education"
      subtitle="My academic journey"
      icon={<GraduationCap className="h-7 w-7 text-accent" />}
    >
      <ol className="relative space-y-6 border-l border-border pl-6">
        {EDUCATION.map((e) => (
          <li
            key={e.title}
            className="group relative rounded-2xl border border-border bg-card/70 p-6 shadow-card transition-all hover:-translate-y-1 hover:border-accent/60"
          >
            <span className="absolute -left-[31px] top-8 h-3 w-3 rounded-full bg-accent ring-4 ring-background transition-transform group-hover:scale-150" />
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-accent">
              <span>{e.period}</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
                {e.score}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-semibold">{e.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{e.place}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

const SKILL_GROUPS = [
  { label: "Programming Languages", items: "Java · SQL · C" },
  { label: "Frontend", items: "HTML · CSS · JavaScript · React.js" },
  { label: "Backend & Cloud", items: "Spring Boot · Node.js · Express · Firebase · MongoDB" },
  { label: "Tools & Platforms", items: "Git · GitHub · Docker · VS Code · SQL Workbench · Postman" },
  {
    label: "Core Concepts",
    items: "OOP · DBMS · Data Structures · Algorithms · SDLC · REST APIs · Agile · API Testing",
  },
];

function Skills() {
  return (
    <Section id="skills" index="03" title="Technical Skills" subtitle="My technical expertise">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <SkillCard key={s.name} skill={s} />
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {SKILL_GROUPS.map((g) => (
          <div
            key={g.label}
            className="rounded-xl border border-border bg-card/50 p-4 transition-colors hover:border-accent/60"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              {g.label}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{g.items}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  const points = [
    "Developed responsive web applications using MongoDB, Express.js, React.js and Node.js.",
    "Worked on frontend–backend integration and REST API connectivity.",
    "Used Git and GitHub for version control and collaborative development.",
    "Improved debugging, testing and problem-solving skills through practical development tasks.",
  ];
  const stack = ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "Git"];
  return (
    <Section
      id="experience"
      index="04"
      title="Internship Experience"
      subtitle="Where I applied it in the real world"
      icon={<Briefcase className="h-7 w-7 text-accent" />}
    >
      <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/70 p-8 shadow-card transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Internship</p>
        <h3 className="mt-3 text-2xl font-semibold">MERN Stack Intern</h3>
        <ul className="mt-5 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-muted-foreground">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:text-accent"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {INTERN_PROJECTS.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/60"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Internship Project
            </p>
            <h4 className="mt-2 text-lg font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const INTERN_PROJECTS = [
  {
    title: "Responsive MERN Web Application",
    desc: "Built a full-stack responsive application with a React front end, Express/Node REST API and MongoDB persistence, wiring UI state to live API data.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    title: "REST API Integration & Testing",
    desc: "Connected frontend modules to backend endpoints, validated request/response flows in Postman, and debugged integration issues collaboratively on GitHub.",
    tech: ["REST APIs", "Postman", "Git", "GitHub"],
  },
];

const PROJECTS = [
  {
    kind: "Major Project",
    title: "WildGuard – IoT-based Wildlife Detection & Alert System",
    points: [
      "AI-powered Android app using YOLOv8, Python, Kotlin, Firebase, REST APIs and GPS location services.",
      "Trained and tested a custom dataset of 20,000+ wildlife images.",
      "Integrated Firebase Cloud Messaging for real-time wildlife alerts and notifications.",
      "Implemented Firestore synchronisation and location-based alert systems.",
      "Designed a scalable architecture supporting future ML integration.",
    ],
    tech: ["YOLOv8", "Kotlin", "Python", "Firebase", "REST APIs", "GPS"],
  },
  {
    kind: "Academic Project",
    title: "Digital Tip Payment System",
    points: [
      "Secure digital payment platform using QR code and UPI integration.",
      "Firebase Authentication with secure transaction handling mechanisms.",
      "User-friendly payment workflow focused on reliability and transparency.",
    ],
    tech: ["Kotlin", "Firebase Auth", "UPI", "QR Generator"],
  },
  {
    kind: "Mini Projects",
    title: "Java Academic Mini Projects",
    points: [
      "Student Management System and ATM Simulation built in Java.",
      "Applied OOP concepts, debugging techniques and clean coding practices.",
      "Managed repositories on GitHub with documentation and version control.",
    ],
    tech: ["Java", "OOP", "GitHub"],
  },
];

function Projects() {
  return (
    <Section
      id="projects"
      index="05"
      title="Projects"
      subtitle="My recent work and achievements"
      icon={<FolderGit2 className="h-7 w-7 text-accent" />}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/70 p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-accent/60 hover:shadow-glow"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              {p.kind}
            </span>
            <h3 className="mt-3 text-2xl font-semibold leading-snug">{p.title}</h3>
            <ul className="mt-4 space-y-2">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

const COURSES = [
  { name: "Java Programming", org: "Coursera · Duke University", year: "2023" },
  { name: "Tata Cybersecurity Security Analyst Job Simulation", org: "Forage", year: "2025" },
  { name: "Deloitte Australia Data Analytics Job Simulation", org: "Forage", year: "" },
  { name: "Software Engineering Job Simulation", org: "Forage", year: "" },
];

function Courses() {
  return (
    <Section
      id="courses"
      index="06"
      title="Courses & Certifications"
      subtitle="Certifications and online courses"
      icon={<Award className="h-7 w-7 text-accent" />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {COURSES.map((c) => (
          <div
            key={c.name}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 transition-all hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {c.org}
              {c.year ? ` · ${c.year}` : ""}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

const ACHIEVEMENTS = [
  "Solved 80+ coding problems on LeetCode focused on Java and DSA concepts.",
  "Practised competitive programming and sharpened algorithmic thinking.",
  "Built multiple academic and personal projects using modern technologies.",
];

function Achievements() {
  return (
    <Section
      id="achievements"
      index="07"
      title="Achievements"
      subtitle="Consistency beyond the classroom"
      icon={<Trophy className="h-7 w-7 text-accent" />}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ACHIEVEMENTS.map((a) => (
          <div
            key={a}
            className="rounded-2xl border border-border bg-card/70 p-6 text-sm text-muted-foreground transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
          >
            {a}
          </div>
        ))}
      </div>
    </Section>
  );
}

const LINKS = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "shettyuttam010@gmail.com",
    href: "mailto:shettyuttam010@gmail.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+91 6363671124",
    href: "tel:+916363671124",
  },
  {
    icon: <Github className="h-5 w-5" />,
    label: "GitHub",
    value: "Uttamshetty-05",
    href: "https://github.com/Uttamshetty-05",
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn",
    value: "uttam-shetty",
    href: "https://www.linkedin.com/in/uttam-shetty-4200a0280/",
  },
];

function Contact() {
  return (
    <Section id="contact" index="08" title="Get In Touch" subtitle="Let's work together">
      <div className="grid gap-4 sm:grid-cols-2">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-border bg-card/70 p-5 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
          >
            <span className="rounded-xl bg-secondary p-3 text-accent">{l.icon}</span>
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {l.label}
              </span>
              <span className="text-sm">{l.value}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border border-border bg-card/60 p-8 text-center">
        <h3 className="text-2xl font-semibold">Looking for a developer who ships?</h3>
        <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
          Open to software engineering, backend and full-stack roles. My full resume is one click
          away.
        </p>
        <a
          href={resume.url}
          target="_blank"
          rel="noreferrer"
          download="Uttam_Shetty_Resume.pdf"
          className="mt-6 inline-block rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Download Resume
        </a>
      </div>
    </Section>
  );
}
