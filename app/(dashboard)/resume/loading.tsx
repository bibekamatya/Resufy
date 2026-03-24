import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export default function ResumeLoading() {
  return (
    <div className="h-full flex items-center justify-center">
      <LoadingSpinner size="md" text="Loading preview..." />
    </div>
  )
}