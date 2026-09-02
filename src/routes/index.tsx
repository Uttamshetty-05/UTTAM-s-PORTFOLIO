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
} from "lucide-react";
import { Portrait } from "@/components/Portrait";
import { SKILLS, SkillCard } from "@/components/portfolio/SkillOrbit";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Uttam Shetty — Computer Science Student & Developer" },
      {
        name: "description",
        content:
          "Interactive portfolio of Uttam Shetty: B.E. Computer Science student building Java, React, Firebase and IoT projects in Udupi, India.",
      },
      { property: "og:title", content: "Uttam Shetty — Computer Science Student & Developer" },
      {
        property: "og:description",
        content:
          "Java, C, SQL, React and Firebase projects — WildGuard IoT wildlife alerts and a digital tip payment system.",
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
  ["courses", "Courses"],
  ["projects", "Projects"],
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
      <Courses />
      <Projects />
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

function Hero() {
  return (
    <header className="relative grid-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-32 md:grid-cols-2 md:pt-40">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-accent">
            HELLO_WORLD<span className="caret">_</span>
          </p>
          <h1 className="mt-4 text-5xl font-bold leading-[1.05] sm:text-6xl">
            Uttam Shetty
            <span className="mt-2 block bg-linear-to-r from-accent to-amber bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">
              Computer Science Student
            </span>
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Passionate about technology with a strong grasp of emerging fields, quick to learn, and
            eager to grow through hands-on experience and teamwork.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
            <a
              href="https://uttamshetty-05.github.io/my-portfolio/Uttam_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume
            </a>
          </div>
          <a
            href="#about"
            className="mt-14 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" /> scroll
          </a>
        </div>
        <Portrait />
      </div>
    </header>
  );
}

function About() {
  const facts = [
    { icon: <MapPin className="h-4 w-4" />, label: "Udupi, India" },
    { icon: <Mail className="h-4 w-4" />, label: "shettyuttam010@gmail.com" },
    { icon: <Phone className="h-4 w-4" />, label: "+91 6363671124" },
  ];
  return (
    <Section id="about" index="01" title="Hello, I'm Uttam!" subtitle="About">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            A final year B.E. Computer Science student passionate about technology and innovation. I
            have experience in Java, C, SQL and web development, with a strong foundation in
            full-stack and mobile applications.
          </p>
          <p>
            I focus on problem-solving, teamwork, and delivering practical, creative solutions to
            real-world challenges.
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
    score: "CGPA: 8.43 / 10",
    title: "Bachelor of Engineering in Computer Science",
    place: "Vivekananda College of Engineering and Technology, Puttur",
  },
  {
    period: "2020 – 2022",
    score: "Percentage: 87.5%",
    title: "Pre-University Course (PCMCs)",
    place: "Amratha Bharathi PU College, Hebri",
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

function Skills() {
  return (
    <Section id="skills" index="03" title="Technical Skills" subtitle="My technical expertise">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s) => (
          <SkillCard key={s.name} skill={s} />
        ))}
      </div>
    </Section>
  );
}

const COURSES = [
  { name: "Java Programming", org: "Coursera · Duke University", year: "2023" },
  { name: "Tata Cybersecurity Security Analyst Job Simulation", org: "Forage", year: "Jun '25" },
  { name: "Deloitte Australia Data Analytics Job Simulation", org: "Forage", year: "" },
  { name: "Software Engineering Job Simulation", org: "Forage", year: "" },
];

function Courses() {
  return (
    <Section
      id="courses"
      index="04"
      title="Courses Completed"
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

const PROJECTS = [
  {
    kind: "Academic Project",
    title: "WildGuard – IoT-based Wildlife Detection & Alert System",
    desc: "Android application that detects wild animals on roads and alerts drivers within a one-kilometre radius.",
    tech: ["Arduino", "YOLOv8", "imgbb", "Firebase"],
  },
  {
    kind: "Academic Project",
    title: "Digital Tip Payment System",
    desc: "Cashless tipping solution using QR codes and UPI for easy digital transactions with full transparency.",
    tech: ["Kotlin", "Firebase", "Google Pay API", "QR Generator"],
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
            <p className="mt-3 text-muted-foreground">{p.desc}</p>
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
    <Section id="contact" index="06" title="Get In Touch" subtitle="Let's work together">
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
    </Section>
  );
}
