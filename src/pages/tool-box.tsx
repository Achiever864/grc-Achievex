import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Calculator,
  FileText,
  CheckSquare,
  Calendar,
  ClipboardList,
  BookOpen,
  PenTool,
  Zap,
  Download,
  Search,
  Star,
  Clock,
  Users,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  ChevronRight,
  Play,
  Home,
} from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function Toolbox(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toolCategories = [
    { id: "all", label: "All Tools", count: 24 },
    { id: "research", label: "Research Planning", count: 8 },
    { id: "writing", label: "Writing & Editing", count: 6 },
    { id: "productivity", label: "Productivity", count: 5 },
    { id: "career", label: "Career Development", count: 5 },
  ];

  const featuredTools = [
    {
      icon: FileText,
      title: "Research Proposal Builder",
      description:
        "Step-by-step interactive guide to craft a winning research proposal with templates and examples.",
      category: "research",
      type: "Interactive Tool",
      users: 1250,
      rating: 4.8,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Calculator,
      title: "PhD Timeline Calculator",
      description:
        "Calculate realistic timelines for your PhD journey including research, writing, and defense preparation.",
      category: "productivity",
      type: "Calculator",
      users: 890,
      rating: 4.9,
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: CheckSquare,
      title: "Publication Readiness Checker",
      description:
        "Comprehensive checklist to ensure your paper meets journal submission requirements.",
      category: "writing",
      type: "Checklist",
      users: 2100,
      rating: 4.7,
      color: "from-green-500 to-green-600",
    },
  ];

  const allTools = [
    {
      icon: PenTool,
      title: "Abstract Generator",
      description: "Create structured abstracts following academic standards",
      category: "writing",
      type: "Generator",
      downloads: 3400,
    },
    {
      icon: ClipboardList,
      title: "Thesis Defense Prep Checklist",
      description: "Complete preparation guide for your thesis defense",
      category: "career",
      type: "Checklist",
      downloads: 1900,
    },
    {
      icon: Calendar,
      title: "Academic Calendar Planner",
      description: "Plan conferences, deadlines, and milestones",
      category: "productivity",
      type: "Planner",
      downloads: 2800,
    },
    {
      icon: BookOpen,
      title: "Literature Review Matrix",
      description: "Organize and synthesize research papers effectively",
      category: "research",
      type: "Template",
      downloads: 4200,
    },
    {
      icon: Target,
      title: "Research Question Refiner",
      description: "Sharpen your research questions for clarity and impact",
      category: "research",
      type: "Interactive Tool",
      downloads: 1600,
    },
    {
      icon: Award,
      title: "Grant Application Tracker",
      description: "Track multiple grant applications and deadlines",
      category: "career",
      type: "Tracker",
      downloads: 2200,
    },
  ];

  const interactiveWorkshops = [
    {
      title: "Crafting Your Academic CV",
      duration: "45 min",
      level: "Beginner",
      enrolled: 340,
      image: null,
    },
    {
      title: "Research Methodology Selection Guide",
      duration: "60 min",
      level: "Intermediate",
      enrolled: 280,
      image: null,
    },
    {
      title: "Building Your Research Network",
      duration: "30 min",
      level: "All Levels",
      enrolled: 520,
      image: null,
    },
  ];

  const quickActions = [
    { icon: FileText, label: "Download CV Template", action: "download" },
    {
      icon: Calculator,
      label: "Calculate Research Budget",
      action: "calculate",
    },
    {
      icon: CheckSquare,
      label: "Pre-Submission Checklist",
      action: "checklist",
    },
    { icon: Calendar, label: "Schedule Consultation", action: "schedule" },
  ];

  const filteredTools =
    activeFilter === "all"
      ? allTools
      : allTools.filter((tool) => tool.category === activeFilter);

  return (
    <div className="bg-linear-to-b from-purple-50 to-white min-h-screen font-montserrat">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#95111c] via-[#7a0e16] to-[#95111c]">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4zIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Breadcrumb current="Toolbox" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Academic Toolbox
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Essential Tools for African Scholars
            </h1>

            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Practical templates, calculators, and interactive guides to
              streamline your research journey—from proposal to publication.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tools, templates, calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-lg"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-xl transition-all hover:scale-105 border border-white/20"
                >
                  <action.icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { number: "24+", label: "Tools & Templates" },
              { number: "15K+", label: "Downloads" },
              { number: "95%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Access" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-[#95111c] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 bg-white/95 backdrop-blur-sm z-40 shadow-sm py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {toolCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeFilter === cat.id
                    ? "bg-[#95111c] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
                <span className="ml-2 text-sm opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tools Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Tools */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                Featured Tools
              </h2>

              <div className="grid gap-6">
                {featuredTools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border border-gray-100 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-4 bg-linear-to-br ${tool.color} rounded-xl shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <tool.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-white bg-[#95111c] px-3 py-1 rounded-full">
                            {tool.type}
                          </span>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-semibold text-gray-700">
                              {tool.rating}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#95111c] transition-colors">
                          {tool.title}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {tool.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            {tool.users.toLocaleString()} users
                          </div>
                          <button className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-6 py-2 rounded-lg transition-all flex items-center gap-2">
                            Launch Tool
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Tools Grid */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6">
                All Tools & Templates
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredTools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 group cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-[#95111c] transition-colors">
                        <tool.icon className="w-6 h-6 text-[#95111c] group-hover:text-white transition-colors" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          {tool.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#95111c] transition-colors">
                      {tool.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4">
                      {tool.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Download className="w-4 h-4" />
                        {tool.downloads.toLocaleString()}
                      </div>
                      <button className="text-[#95111c] hover:text-[#7a0e16] font-semibold text-sm flex items-center gap-1">
                        Access
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Workshops */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Play className="w-8 h-8" />
                Interactive Workshops
              </h2>

              <div className="grid gap-6">
                {interactiveWorkshops.map((workshop, idx) => (
                  <div
                    key={idx}
                    className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer border border-purple-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {workshop.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {workshop.duration}
                          </span>
                          <span className="px-3 py-1 bg-white rounded-full font-medium">
                            {workshop.level}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {workshop.enrolled} enrolled
                          </span>
                        </div>
                      </div>
                      <button className="bg-[#95111c] hover:bg-[#7a0e16] text-white p-4 rounded-full transition-all hover:scale-110">
                        <Play className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tool of the Week */}
            <div className="bg-linear-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-lg p-6 text-gray-900">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6" />
                <h3 className="text-xl font-bold">Tool of the Week</h3>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
                <h4 className="font-bold text-lg mb-2">
                  Thesis Timeline Planner
                </h4>
                <p className="text-sm mb-3">
                  Plan every chapter, milestone, and deadline for your thesis
                  journey
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>Used by 450+ scholars this week</span>
                </div>
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all">
                Try It Now
              </button>
            </div>

            {/* Popular Downloads */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#95111c] mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Popular Downloads
              </h3>

              <div className="space-y-4">
                {[
                  { name: "Research Proposal Template", downloads: 4200 },
                  { name: "Academic CV Template", downloads: 3800 },
                  { name: "Literature Review Matrix", downloads: 3400 },
                  { name: "Conference Abstract Template", downloads: 2900 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-[#95111c] font-bold text-sm">
                        {idx + 1}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {item.name}
                      </span>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Request a Tool */}
            <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-xl shadow-lg p-6 text-white">
              <Lightbulb className="w-12 h-12 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3">Need a Specific Tool?</h3>
              <p className="text-white/90 mb-6 text-sm">
                We're constantly adding new tools. Let us know what would help
                your research!
              </p>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-all">
                Request a Tool
              </button>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#95111c] mb-4">
                💡 Quick Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="p-3 bg-purple-50 rounded-lg">
                  <strong>Pro Tip:</strong> Bookmark frequently used tools for
                  quick access
                </p>
                <p className="p-3 bg-blue-50 rounded-lg">
                  <strong>Did you know?</strong> You can download multiple
                  templates at once
                </p>
                <p className="p-3 bg-green-50 rounded-lg">
                  <strong>New:</strong> Interactive calculators now save your
                  progress automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
