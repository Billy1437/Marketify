import { LoaderIcon } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-4">
    <LoaderIcon className="size-10 text-orange-500 animate-spin" />
    <p className="text-sm text-stone-400">Loading...</p>
  </div>
);

export default LoadingSpinner;
