"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ResumeData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { sampleResumeData } from "@/lib/data";

export default function SharePage() {
  const params = useParams();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement MongoDB resume fetching
    // For now, show sample data
    setTimeout(() => {
      setResumeData(sampleResumeData);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-600">Resume not found</div>
      </div>
    );
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
