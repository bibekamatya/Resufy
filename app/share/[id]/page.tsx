"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ResumeData } from "@/lib/types";
import { useSupabase } from "@/hooks/useSupabase";
import { Loader2 } from "lucide-react";

export default function SharePage() {
  const params = useParams();
  const supabase = useSupabase();
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      const { data } = await supabase
        .from("resume_profiles")
        .select("data, name")
        .eq("id", params.id)
        .single();

      if (data) {
        setResumeData(data.data);
      }
      setLoading(false);
    };

    loadResume();
  }, [params.id, supabase]);

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
