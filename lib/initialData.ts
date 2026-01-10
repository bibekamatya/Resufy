import { ResumeData } from "./types";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.com",
    summary: "Experienced software developer with 3+ years of expertise in building scalable web applications using modern technologies.",
  },
  experience: [
    {
      id: "1",
      company: "Tech Company",
      position: "Frontend Developer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: [
        "Developed and maintained responsive web applications using React and TypeScript",
        "Collaborated with cross-functional teams to deliver high-quality features",
        "Improved application performance by 40% through code optimization",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2018-09",
      endDate: "2022-05",
      gpa: "3.8",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "Git",
    "MongoDB",
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform with payment integration and admin dashboard",
      technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
      link: "github.com/johndoe/ecommerce",
    },
  ],
};
