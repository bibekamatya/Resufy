import { ResumeData } from "@/lib/types";

const commonATSKeywords = [
  "leadership", "management", "team", "project", "agile", "scrum",
  "communication", "problem solving", "analytical", "strategic",
  "collaboration", "innovation", "results-driven", "customer-focused",
];

export const calculateATSScore = (resumeData: ResumeData): {
  score: number;
  suggestions: string[];
  keywords: string[];
} => {
  if (!resumeData) {
    return { score: 0, suggestions: [], keywords: [] };
  }

  let score = 0;
  const suggestions: string[] = [];
  const foundKeywords: string[] = [];

  const allText = [
    resumeData.personalInfo?.summary || "",
    ...(resumeData.experience || []).flatMap(e => e.description || []),
    ...(resumeData.projects || []).map(p => p.description || ""),
    ...(resumeData.skills || []),
  ].join(" ").toLowerCase();

  // Check for keywords
  commonATSKeywords.forEach(keyword => {
    if (allText.includes(keyword)) {
      score += 5;
      foundKeywords.push(keyword);
    }
  });

  // Check for contact info
  if (resumeData.personalInfo.email) score += 10;
  if (resumeData.personalInfo.phone) score += 10;
  if (resumeData.personalInfo.linkedin) score += 5;

  // Check for sections
  if (resumeData.experience.length > 0) score += 15;
  if (resumeData.education.length > 0) score += 10;
  if (resumeData.skills.length >= 5) score += 10;
  if (resumeData.projects.length > 0) score += 5;

  // Check for quantifiable achievements
  const hasNumbers = /\d+/.test(allText);
  if (hasNumbers) {
    score += 10;
  } else {
    suggestions.push("Add quantifiable achievements (numbers, percentages)");
  }

  // Suggestions
  if (!resumeData.personalInfo.linkedin) {
    suggestions.push("Add LinkedIn profile URL");
  }
  if (resumeData.skills.length < 8) {
    suggestions.push("Add more relevant skills (aim for 8-12)");
  }
  if (resumeData.experience.length === 0) {
    suggestions.push("Add work experience");
  }
  if (!resumeData.certifications?.length) {
    suggestions.push("Add certifications if you have any");
  }

  return {
    score: Math.min(score, 100),
    suggestions,
    keywords: foundKeywords,
  };
};
