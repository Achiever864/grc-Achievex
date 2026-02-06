import { useState, useEffect } from "react";
import { GraduationCap, Loader2 } from "lucide-react";

interface PageLoaderProps {
  loading: boolean;
  minDuration?: number;
  message?: string;
}

export const PageLoader = ({
  loading,
  minDuration = 800,
  message = "Loading...",
}: PageLoaderProps) => {
  const [show, setShow] = useState(loading);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading) {
      // show instantly but in next microtask
      timer = setTimeout(() => setShow(true), 0);
    } else {
      timer = setTimeout(() => setShow(false), minDuration);
    }

    return () => clearTimeout(timer);
  }, [loading, minDuration]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-white to-blue-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iIzk1MTExYyIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Loader Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full flex items-center justify-center animate-pulse">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>

          {/* Spinning Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2
              className="w-32 h-32 text-[#95111c] animate-spin"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-[#95111c] mb-2">
          The Graduate Research Clinic
        </h2>
        <p className="text-gray-600 animate-pulse">{message}</p>

        {/* Loading Bar */}
        <div className="mt-6 w-64 mx-auto bg-gray-200 rounded-full h-1 overflow-hidden">
          <div className="h-full bg-linear-to-r from-[#95111c] to-yellow-500 rounded-full animate-loading-bar"></div>
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 75%;
            margin-left: 0%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
