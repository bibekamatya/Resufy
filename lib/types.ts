export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  visible?: boolean;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  visible?: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  visible?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  visible?: boolean;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
  visible?: boolean;
}

export type SectionKey = "experience" | "education" | "projects" | "skills" | "certifications" | "languages";

export const DEFAULT_SECTION_ORDER: SectionKey[] = [
  "experience", "education", "projects", "skills", "certifications", "languages"
];

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  skillsVisibility?: Record<string, boolean>;
  sectionOrder?: SectionKey[];
}

export interface ResumeProfile {
  _id: string;
  userId: string;
  title: string;
  data: ResumeData;
  template: string;
  isPublic?: boolean;
  shareId?: string;
  createdAt: string;
  updatedAt: string;
}

export type TemplateType =
  | "classic"
  | "modern"
  | "compact"
  | "creative"
  | "academic"
  | "balanced";
