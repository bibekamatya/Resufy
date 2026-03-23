"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ResumeData } from "@/lib/types";
import { getSharedResume } from "@/lib/actions/resume";

export default function SharePage() {
  const params = useParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const result = await getSharedResume(params.id as string);
        if (result.success) {
          setResumeData(result.resume.data);
        } else {
          setError(result.error || 'Resume not found');
        }
      } catch (err) {
        setError('Failed to load resume');
      }
    };

    if (params.id) {
      loadResume();
    }
  }, [params.id]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!resumeData) {
    return null; // Let Next.js loading.tsx handle this
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl" style={{ width: "794px" }}>
          <ClassicTemplate data={resumeData} />
        </div>
      </div>
    </div>
  );
}
