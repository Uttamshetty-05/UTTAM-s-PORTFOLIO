import { useState } from "react";

export type Skill = {
  name: string;
  level: number;
  blurb: string;
  tag: string;
};

export const SKILLS: Skill[] = [
  { name: "Java", level: 90, blurb: "OOP, collections, DSA, 80+ LeetCode problems", tag: "language" },
  { name: "SQL", level: 84, blurb: "DBMS design, joins, SQL Workbench", tag: "data" },
  { name: "C", level: 78, blurb: "Memory, pointers, systems basics", tag: "language" },
  { name: "Spring Boot", level: 76, blurb: "REST APIs, layered backend services", tag: "backend" },
  { name: "React.js", level: 82, blurb: "Components, hooks, responsive UIs", tag: "frontend" },
  { name: "Node.js / Express", level: 75, blurb: "MERN backends, routing, middleware", tag: "backend" },
  { name: "MongoDB", level: 74, blurb: "Schemas, queries, MERN data layer", tag: "data" },
  { name: "HTML / CSS / JS", level: 90, blurb: "Semantic markup, responsive layouts", tag: "frontend" },
  { name: "Firebase", level: 85, blurb: "Auth, Firestore, Cloud Messaging", tag: "cloud" },
  { name: "Postman / API Testing", level: 80, blurb: "REST API testing and debugging", tag: "testing" },
  { name: "Docker", level: 68, blurb: "Images, containers, compose", tag: "devops" },
  { name: "Git & GitHub", level: 88, blurb: "Branching, PRs, collaborative workflow", tag: "devops" },
];


export function SkillCard({ skill }: { skill: Skill }) {
  const [hover, setHover] = useState(false);
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60"
    >
      <div className="flex items-center gap-4">
        <svg viewBox="0 0 64 64" className="h-16 w-16 shrink-0 -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="5" className="stroke-secondary" />
          <circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-accent transition-[stroke-dashoffset] duration-700 ease-out"
            strokeDasharray={c}
            strokeDashoffset={c - (c * skill.level) / 100}
          />
        </svg>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {skill.tag}
          </p>
          <h3 className="text-lg font-semibold">{skill.name}</h3>
        </div>
      </div>
      <p
        className={`mt-4 text-sm text-muted-foreground transition-all duration-300 ${
          hover ? "translate-y-0 opacity-100" : "translate-y-1 opacity-60"
        }`}
      >
        {skill.blurb}
      </p>
    </div>
  );
}
