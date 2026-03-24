import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export default function BuilderLoading() {
  return (
    <div className="h-full flex items-center justify-center">
      <LoadingSpinner size="md" text="Loading editor..." />
    </div>
  )
}