import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

export default function ShareLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoadingSpinner size="lg" text="Loading shared resume..." />
    </div>
  )
}