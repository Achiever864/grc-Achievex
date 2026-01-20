import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  BookOpen,
  Search,
  Download,
  Video,
  FileText,
  Headphones,
  Users,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  ChevronRight,
  Star,
  Bookmark,
  Share2,
  Eye,
  X,
} from "lucide-react";
import library from "@/assets/images/library.jpg";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function KnowledgeHub(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuickPoll, setShowQuickPoll] = useState(true);
  const [selectedPoll, setSelectedPoll] = useState<string | null>(null);
  const [bookmarkedResources, setBookmarkedResources] = useState<number[]>([]);
  const [userProgress] = useState({
    resourcesCompleted: 12,
    totalResources: 156,
    streakDays: 5,
    points: 450,
  });

  const toggleBookmark = (idx: number) => {
    setBookmarkedResources((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const pollOptions = [
    { id: "methodology", label: "Research Methodology", votes: 45 },
    { id: "writing", label: "Academic Writing", votes: 32 },
    { id: "funding", label: "Grant Funding", votes: 28 },
    { id: "publishing", label: "Publishing Tips", votes: 51 },
  ];

  const achievements = [
    { icon: "🔥", label: "5-Day Streak", unlocked: true },
    { icon: "📚", label: "10 Resources Read", unlocked: true },
    { icon: "⭐", label: "First Bookmark", unlocked: true },
    { icon: "🎯", label: "Complete a Track", unlocked: false },
    { icon: "💡", label: "Share 5 Resources", unlocked: false },
  ];

  const learningPaths = [
    {
      title: "PhD Application Mastery",
      steps: 8,
      completed: 3,
      duration: "4 weeks",
      difficulty: "Beginner",
      enrolled: 234,
    },
    {
      title: "Publishing Your First Paper",
      steps: 6,
      completed: 0,
      duration: "3 weeks",
      difficulty: "Intermediate",
      enrolled: 189,
    },
    {
      title: "Grant Writing Excellence",
      steps: 10,
      completed: 0,
      duration: "6 weeks",
      difficulty: "Advanced",
      enrolled: 156,
    },
  ];

  const liveActivity = [
    {
      user: "Amara O.",
      action: "completed 'Research Methods 101'",
      time: "2 min ago",
    },
    {
      user: "Ibrahim M.",
      action: "earned Achievement: 5-Day Streak",
      time: "5 min ago",
    },
    {
      user: "Naledi K.",
      action: "bookmarked 'PhD Application Guide'",
      time: "8 min ago",
    },
    {
      user: "Kwame N.",
      action: "joined 'Publishing Masterclass'",
      time: "12 min ago",
    },
  ];

  const weeklyChallenge = {
    title: "Read 3 Research Articles This Week",
    progress: 2,
    total: 3,
    reward: "50 points + Special Badge",
    endsIn: "4 days",
  };

  const categories = [
    { id: "all", label: "All Resources", count: 156 },
    { id: "research", label: "Research Methods", count: 42 },
    { id: "writing", label: "Academic Writing", count: 38 },
    { id: "publishing", label: "Publishing", count: 25 },
    { id: "grants", label: "Grants & Funding", count: 21 },
    { id: "career", label: "Career Development", count: 30 },
  ];

  const featuredResources = [
    {
      type: "Guide",
      icon: FileText,
      title: "Complete Guide to PhD Applications in Africa",
      description:
        "Step-by-step guide to securing funded doctoral positions across African universities and international programs.",
      author: "Dr. Amara Okafor",
      duration: "45 min read",
      downloads: 2450,
      category: "career",
      featured: true,
    },
    {
      type: "Video Series",
      icon: Video,
      title: "Research Methodology Masterclass",
      description:
        "Comprehensive 10-part video series covering qualitative and quantitative research methods.",
      author: "Prof. Ibrahim Mensah",
      duration: "8 hours",
      views: 5200,
      category: "research",
      featured: true,
    },
    {
      type: "Podcast",
      icon: Headphones,
      title: "Publishing in Top-Tier Journals",
      description:
        "Expert insights on navigating the peer-review process and publishing strategies for African scholars.",
      author: "Dr. Naledi Mbatha",
      duration: "50 min",
      listens: 3800,
      category: "publishing",
      featured: true,
    },
  ];

  const resources = [
    {
      type: "Article",
      title: "Avoiding Plagiarism: Best Practices for Academic Integrity",
      category: "writing",
      author: "Dr. Kemi Adeyemi",
      date: "2 days ago",
      views: 1240,
      duration: "15 min read",
    },
    {
      type: "Template",
      title: "Research Proposal Template for African Contexts",
      category: "research",
      author: "Dr. Samuel Njoroge",
      date: "1 week ago",
      downloads: 890,
      duration: "Download",
    },
    {
      type: "Webinar",
      title: "Grant Writing for African Development Research",
      category: "grants",
      author: "Prof. Zainab Hassan",
      date: "3 days ago",
      views: 620,
      duration: "90 min",
    },
    {
      type: "Guide",
      title: "Building Your Academic Profile on LinkedIn",
      category: "career",
      author: "Dr. Tunde Bakare",
      date: "5 days ago",
      views: 1580,
      duration: "25 min read",
    },
    {
      type: "Video",
      title: "Understanding Mixed Methodology Approaches",
      category: "research",
      author: "Prof. Grace Mwangi",
      date: "1 week ago",
      views: 2100,
      duration: "45 min",
    },
    {
      type: "Checklist",
      title: "PhD Application Checklist & Timeline",
      category: "career",
      author: "Dr. David Osei",
      date: "4 days ago",
      downloads: 1450,
      duration: "Download",
    },
  ];

  const upcomingWebinars = [
    {
      title: "How to Secure Postdoctoral Fellowships",
      date: "Feb 25, 2025",
      time: "3:00 PM WAT",
      speaker: "Prof. Aisha Mohammed",
      spots: 45,
    },
    {
      title: "Navigating Academic Publishing: From Submission to Acceptance",
      date: "Mar 5, 2025",
      time: "2:00 PM WAT",
      speaker: "Dr. Chukwudi Nwosu",
      spots: 32,
    },
    {
      title: "Building Collaborative Research Networks Across Borders",
      date: "Mar 12, 2025",
      time: "4:00 PM WAT",
      speaker: "Dr. Fatima Al-Rahman",
      spots: 28,
    },
  ];

  const expertContributors = [
    {
      name: "Prof. Kwame Nkrumah",
      role: "Research Methodology",
      contributions: 24,
      image: null,
    },
    {
      name: "Dr. Amina Yusuf",
      role: "Grant Writing",
      contributions: 18,
      image: null,
    },
    {
      name: "Prof. Sipho Ndlovu",
      role: "Academic Writing",
      contributions: 31,
      image: null,
    },
  ];

  const filteredResources =
    activeCategory === "all"
      ? resources
      : resources.filter((r) => r.category === activeCategory);

  return (
    <div className="bg-linear-to-b from-purple-50 to-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={library}
            alt="Knowledge Hub"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#95111c]/90 to-[#95111c]/70"></div>
        </div>
        {/* Breadcrumb Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Breadcrumb current="Knowledge Hub" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Knowledge Hub
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Resources for African Scholars
            </h1>

            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Access curated guides, templates, videos, and expert insights to
              advance your academic journey—from research design to career
              success.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for resources, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/95 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-linear-to-r from-[#95111c] to-[#7a0e16] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: "156+", label: "Resources" },
              { number: "50+", label: "Expert Contributors" },
              { number: "10K+", label: "Downloads" },
              { number: "25+", label: "Video Tutorials" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm lg:text-base text-white/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 sticky top-16 bg-white/95 backdrop-blur-sm z-40 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
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
          {/* Main Resources Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* User Progress Dashboard */}
            <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Your Progress</h3>
                  <p className="text-white/80">Keep learning, keep growing!</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400">
                    {userProgress.points}
                  </div>
                  <div className="text-sm text-white/80">Points</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-2xl font-bold">
                    {userProgress.streakDays}
                  </div>
                  <div className="text-xs text-white/80">Day Streak</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-2xl font-bold">
                    {userProgress.resourcesCompleted}
                  </div>
                  <div className="text-xs text-white/80">Completed</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-2xl font-bold">
                    {Math.round(
                      (userProgress.resourcesCompleted /
                        userProgress.totalResources) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-xs text-white/80">Progress</div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="font-semibold mb-3">Recent Achievements</h4>
                <div className="flex gap-2 flex-wrap">
                  {achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                        ach.unlocked
                          ? "bg-yellow-400 text-gray-900"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <span className="text-lg">{ach.icon}</span>
                      <span className="font-medium">{ach.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-linear-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                    <Calendar className="w-4 h-4" />
                    Weekly Challenge
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {weeklyChallenge.title}
                  </h3>
                  <p className="text-white/90">
                    Reward: {weeklyChallenge.reward}
                  </p>
                </div>
                <div className="text-center bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-sm">Ends in</div>
                  <div className="text-xl font-bold">
                    {weeklyChallenge.endsIn}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">
                    {weeklyChallenge.progress}/{weeklyChallenge.total}
                  </span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${(weeklyChallenge.progress / weeklyChallenge.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Learning Paths */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                Structured Learning Paths
              </h2>

              <div className="grid gap-6">
                {learningPaths.map((path, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border-l-4 border-yellow-500"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {path.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                            {path.difficulty}
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {path.duration}
                          </span>
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            {path.steps} steps
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#95111c]">
                          {Math.round((path.completed / path.steps) * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {path.completed}/{path.steps} complete
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-[#95111c] to-yellow-500 rounded-full transition-all duration-500"
                          style={{
                            width: `${(path.completed / path.steps) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {path.enrolled} enrolled
                      </div>
                      <button className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-6 py-2 rounded-lg transition-all">
                        {path.completed > 0 ? "Continue" : "Start Path"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Poll */}
            {showQuickPoll && (
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-yellow-400">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#95111c] mb-2">
                      Quick Poll
                    </h3>
                    <p className="text-gray-600">
                      What topic would you like to learn about next?
                    </p>
                  </div>
                  <button
                    onClick={() => setShowQuickPoll(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {pollOptions.map((option) => {
                    const totalVotes = pollOptions.reduce(
                      (sum, opt) => sum + opt.votes,
                      0,
                    );
                    const percentage = Math.round(
                      (option.votes / totalVotes) * 100,
                    );
                    const isSelected = selectedPoll === option.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => setSelectedPoll(option.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? "border-[#95111c] bg-purple-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {option.label}
                          </span>
                          <span className="text-sm text-gray-600">
                            {percentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-[#95111c] to-yellow-500 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  {pollOptions.reduce((sum, opt) => sum + opt.votes, 0)} votes •
                  Poll closes in 2 days
                </div>
              </div>
            )}

            {/* Featured Resources */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                Featured Resources
              </h2>

              <div className="grid gap-6">
                {featuredResources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border-l-4 border-[#95111c] group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                        <resource.icon className="w-8 h-8 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-white bg-[#95111c] px-3 py-1 rounded-full">
                            {resource.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {resource.duration}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#95111c] transition-colors">
                          {resource.title}
                        </h3>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {resource.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            By {resource.author}
                          </span>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {resource.downloads && (
                              <span className="flex items-center gap-1">
                                <Download className="w-4 h-4" />
                                {resource.downloads}
                              </span>
                            )}
                            {resource.views && (
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {resource.views}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button className="p-3 rounded-lg bg-yellow-100 text-[#95111c] hover:bg-yellow-200 transition-colors shrink-0">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Resources */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6">
                All Resources
              </h2>

              <div className="grid gap-4">
                {filteredResources.map((resource, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-all p-5 flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-[#95111c] bg-purple-50 px-3 py-1 rounded-full">
                          {resource.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {resource.date}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-[#95111c] transition-colors">
                        {resource.title}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{resource.author}</span>
                        <span>•</span>
                        <span>{resource.duration}</span>
                        {resource.views && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {resource.views}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleBookmark(idx)}
                        className={`p-2 rounded-lg transition-all ${
                          bookmarkedResources.includes(idx)
                            ? "bg-yellow-100 text-yellow-600"
                            : "hover:bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Bookmark
                          className={`w-5 h-5 ${bookmarkedResources.includes(idx) ? "fill-current" : ""}`}
                        />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg">
                  Load More Resources
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Live Activity Feed */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#95111c] mb-6 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Live Activity
              </h3>

              <div className="space-y-4">
                {liveActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-8 h-8 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Upcoming Webinars */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#95111c] mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Upcoming Webinars
              </h3>

              <div className="space-y-4">
                {upcomingWebinars.map((webinar, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {webinar.title}
                    </h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {webinar.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {webinar.time}
                      </p>
                      <p className="text-[#95111c] font-medium">
                        {webinar.speaker}
                      </p>
                    </div>
                    <button className="mt-3 w-full bg-[#95111c] hover:bg-[#7a0e16] text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                      Register ({webinar.spots} spots left)
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Expert Contributors */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#95111c] mb-6 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Expert Contributors
              </h3>

              <div className="space-y-4">
                {expertContributors.map((expert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                      {expert.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {expert.name}
                      </h4>
                      <p className="text-sm text-gray-600">{expert.role}</p>
                      <p className="text-xs text-[#95111c] font-medium">
                        {expert.contributions} contributions
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full text-[#95111c] hover:text-[#7a0e16] font-semibold text-sm py-2 transition-colors">
                View All Contributors →
              </button>
            </div>

            {/* CTA Box */}
            <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-xl shadow-lg p-6 text-white text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3">Become a Contributor</h3>
              <p className="text-white/90 mb-6 text-sm">
                Share your expertise and help fellow African scholars succeed
              </p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-all w-full">
                Submit Your Resource
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
