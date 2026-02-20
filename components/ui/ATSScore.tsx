"use client";

import { ResumeData } from "@/lib/types";
import { calculateATSScore } from "@/lib/utils/atsScore";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ATSScoreProps {
  resumeData: ResumeData;
}

export const ATSScore = ({ resumeData }: ATSScoreProps) => {
  if (!resumeData) return null;
  
  const { score, suggestions, keywords } = calculateATSScore(resumeData);

  const getScoreColor = () => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">ATS Score</h3>
      
      <div className={`text-center p-4 rounded-lg border ${getScoreColor()}`}>
        <div className="text-4xl font-bold">{score}</div>
        <div className="text-xs mt-1">out of 100</div>
      </div>

      {keywords.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Found Keywords ({keywords.length})
          </div>
          <div className="flex flex-wrap gap-1">
            {keywords.slice(0, 6).map((kw) => (
              <span key={kw} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 mb-2">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            Suggestions
          </div>
          <ul className="space-y-1">
            {suggestions.slice(0, 3).map((suggestion, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                <span className="text-orange-600">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
