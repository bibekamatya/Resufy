export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
  photoUrl?: string;
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

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications?: Certification[];
  languages?: Language[];
  skillsVisibility?: Record<string, boolean>;
}

export interface ResumeProfile {
  id: string;
  user_id: string;
  name: string;
  data: ResumeData;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export type TemplateType =
  | "classic"
  | "modern"
  | "compact"
  | "creative"
  | "academic"
  | "balanced";
