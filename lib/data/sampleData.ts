import { ResumeData } from "@/lib/types";

export const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "Bibek Sharma",
    email: "bibek.sharma@email.com",
    phone: "+977 98XXXXXXXX",
    location: "Kathmandu, Nepal",
    linkedin: "linkedin.com/in/bibeksharma",
    website: "bibeksharma.dev",
    summary: "Frontend Developer with 2+ years of experience building responsive web applications using React, Next.js, and TypeScript. Passionate about creating clean, user-friendly interfaces and writing maintainable code.",
  },
  experience: [
    {
      id: "1",
      company: "Tech Solutions Pvt. Ltd.",
      position: "Frontend Developer",
      location: "Kathmandu, Nepal",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description: [
        "Developed and maintained responsive web applications using React and Next.js",
        "Collaborated with designers and backend developers to implement new features",
        "Improved application performance by optimizing component rendering and code splitting",
        "Implemented authentication and authorization using NextAuth.js",
      ],
    },
    {
      id: "2",
      company: "Digital Agency",
      position: "Junior Frontend Developer",
      location: "Kathmandu, Nepal",
      startDate: "2022-06",
      endDate: "2022-12",
      current: false,
      description: [
        "Built responsive landing pages and web applications using React and Tailwind CSS",
        "Worked with REST APIs to integrate frontend with backend services",
        "Participated in code reviews and followed best practices",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Tribhuvan University",
      degree: "Bachelor of Science",
      field: "Computer Science and Information Technology",
      location: "Kathmandu, Nepal",
      startDate: "2018-08",
      endDate: "2022-05",
      gpa: "3.6",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "HTML/CSS",
    "Git",
    "MongoDB",
    "Node.js",
    "REST APIs",
  ],
  projects: [
    {
      id: "1",
      name: "Expense Tracker",
      description: "Full-stack expense tracking application with authentication, data visualization, and PDF export functionality",
      technologies: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Tailwind CSS"],
      link: "github.com/bibek/expense-tracker",
    },
    {
      id: "2",
      name: "ResuCraft",
      description: "Modern resume builder with live preview and PDF export. Choose from multiple professional templates",
      technologies: ["Next.js", "TypeScript", "jsPDF", "Tailwind CSS"],
      link: "github.com/bibek/resucraft",
    },
  ],
};
