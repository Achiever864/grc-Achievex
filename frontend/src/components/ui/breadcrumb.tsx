import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  current: string;
}

const Breadcrumb = ({ current }: BreadcrumbProps) => {
  return (
    <div className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex cursor-pointer items-center gap-1 text-white hover:text-slate-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <ChevronRight className="w-4 h-4 text-white" />

          <span className="text-white cursor-pointer font-medium">
            {current}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
