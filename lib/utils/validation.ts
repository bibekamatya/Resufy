import { ResumeData, PersonalInfo, Experience, Education, Project } from '@/lib/types'

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`)
    return true
  } catch {
    return false
  }
}

export const validatePersonalInfo = (info: PersonalInfo): string[] => {
  const errors: string[] = []
  
  if (!info.fullName.trim()) errors.push('Full name is required')
  if (!info.email.trim()) errors.push('Email is required')
  else if (!validateEmail(info.email)) errors.push('Invalid email format')
  
  if (info.phone && !validatePhone(info.phone)) errors.push('Invalid phone format')
  if (info.linkedin && !validateUrl(info.linkedin)) errors.push('Invalid LinkedIn URL')
  if (info.website && !validateUrl(info.website)) errors.push('Invalid website URL')
  
  return errors
}

export const validateExperience = (exp: Experience): string[] => {
  const errors: string[] = []
  
  if (!exp.company.trim()) errors.push('Company name is required')
  if (!exp.position.trim()) errors.push('Position is required')
  if (!exp.startDate) errors.push('Start date is required')
  if (!exp.current && !exp.endDate) errors.push('End date is required for past positions')
  
  if (exp.startDate && exp.endDate && new Date(exp.startDate) > new Date(exp.endDate)) {
    errors.push('Start date cannot be after end date')
  }
  
  return errors
}

export const validateEducation = (edu: Education): string[] => {
  const errors: string[] = []
  
  if (!edu.institution.trim()) errors.push('Institution is required')
  if (!edu.degree.trim()) errors.push('Degree is required')
  if (!edu.field.trim()) errors.push('Field of study is required')
  if (!edu.startDate) errors.push('Start date is required')
  if (!edu.endDate) errors.push('End date is required')
  
  if (edu.startDate && edu.endDate && new Date(edu.startDate) > new Date(edu.endDate)) {
    errors.push('Start date cannot be after end date')
  }
  
  return errors
}

export const validateProject = (project: Project): string[] => {
  const errors: string[] = []
  
  if (!project.name.trim()) errors.push('Project name is required')
  if (!project.description.trim()) errors.push('Project description is required')
  if (project.technologies.length === 0) errors.push('At least one technology is required')
  if (project.link && !validateUrl(project.link)) errors.push('Invalid project URL')
  
  return errors
}

export const validateResumeData = (data: ResumeData): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {}
  
  // Validate personal info
  const personalErrors = validatePersonalInfo(data.personalInfo)
  if (personalErrors.length > 0) errors.personalInfo = personalErrors
  
  // Validate experience
  data.experience.forEach((exp, index) => {
    const expErrors = validateExperience(exp)
    if (expErrors.length > 0) errors[`experience_${index}`] = expErrors
  })
  
  // Validate education
  data.education.forEach((edu, index) => {
    const eduErrors = validateEducation(edu)
    if (eduErrors.length > 0) errors[`education_${index}`] = eduErrors
  })
  
  // Validate projects
  data.projects.forEach((project, index) => {
    const projectErrors = validateProject(project)
    if (projectErrors.length > 0) errors[`project_${index}`] = projectErrors
  })
  
  // Validate skills
  if (data.skills.length === 0) {
    errors.skills = ['At least one skill is required']
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}