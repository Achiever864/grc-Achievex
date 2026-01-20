import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Users,
  BookOpen,
  DollarSign,
  Briefcase,
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Search,
  Filter,
  ChevronRight,
  MessageCircle,
  Globe,
  Lightbulb,
  CheckCircle,
} from "lucide-react";
import Breadcrumb from "@/components/ui/breadcrumb";

export default function FindSupport(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const supportCategories = [
    { id: "all", label: "All Support", icon: Users, count: 45 },
    { id: "mentorship", label: "Mentorship", icon: Users, count: 12 },
    { id: "funding", label: "Funding & Grants", icon: DollarSign, count: 15 },
    { id: "academic", label: "Academic Services", icon: BookOpen, count: 8 },
    { id: "career", label: "Career Guidance", icon: Briefcase, count: 6 },
    { id: "wellness", label: "Mental Health", icon: Heart, count: 4 },
  ];

  const countries = [
    "All Countries",
    "Nigeria",
    "South Africa",
    "Kenya",
    "Ghana",
    "Egypt",
    "Tanzania",
    "Uganda",
    "Ethiopia",
  ];

  const featuredSupport = [
    {
      category: "Mentorship",
      icon: Users,
      title: "One-on-One Research Mentorship Program",
      organization: "GRC Mentorship Network",
      description:
        "Get paired with experienced professors and researchers in your field for personalized guidance on your PhD/research journey.",
      type: "Free",
      availability: "Monthly Cohorts",
      location: "Pan-African (Virtual)",
      contact: {
        email: "mentorship@graduateresearchclinic.org",
        phone: "+234 801 234 5678",
      },
      features: [
        "Bi-weekly 1-on-1 sessions",
        "Field-specific matching",
        "Progress tracking",
        "Networking opportunities",
      ],
      cta: "Apply for Mentorship",
      link: "#",
    },
    {
      category: "Funding",
      icon: DollarSign,
      title: "African Research Grants Database",
      organization: "Partnership Network",
      description:
        "Comprehensive database of scholarships, grants, and funding opportunities specifically for African scholars and researchers.",
      type: "Free Access",
      availability: "Updated Weekly",
      location: "Africa-wide",
      contact: {
        email: "grants@graduateresearchclinic.org",
      },
      features: [
        "500+ funding opportunities",
        "Personalized alerts",
        "Application guidance",
        "Success stories",
      ],
      cta: "Browse Opportunities",
      link: "#",
    },
    {
      category: "Academic",
      icon: BookOpen,
      title: "Research Writing & Publication Support",
      organization: "Academic Services Hub",
      description:
        "Professional support for manuscript preparation, peer review responses, and journal selection for African researchers.",
      type: "Subsidized",
      availability: "On Demand",
      location: "Virtual",
      contact: {
        email: "writing@graduateresearchclinic.org",
      },
      features: [
        "Manuscript review",
        "Language editing",
        "Journal matching",
        "Submission support",
      ],
      cta: "Request Support",
      link: "#",
    },
  ];

  const supportProviders = [
    {
      name: "African Doctoral Academy",
      category: "mentorship",
      country: "South Africa",
      services: ["PhD Supervision", "Research Training", "Workshops"],
      type: "Academic Institution",
      contact: "info@africandoctoral.ac.za",
      website: "www.africandoctoral.ac.za",
      verified: true,
    },
    {
      name: "Carnegie Corporation Funding Program",
      category: "funding",
      country: "Nigeria",
      services: ["Research Grants", "Institutional Support"],
      type: "Funding Agency",
      contact: "grants@carnegie.org",
      website: "www.carnegie.org/africa",
      verified: true,
    },
    {
      name: "Kenya Research Network",
      category: "academic",
      country: "Kenya",
      services: ["Research Collaboration", "Data Collection Support"],
      type: "Research Network",
      contact: "info@kenyaresearch.org",
      website: "www.kenyaresearch.org",
      verified: true,
    },
    {
      name: "West African Mental Health Foundation",
      category: "wellness",
      country: "Ghana",
      services: ["Counseling", "Peer Support Groups", "Crisis Intervention"],
      type: "Mental Health",
      contact: "support@wamhf.org",
      website: "www.wamhf.org",
      verified: true,
    },
    {
      name: "African Career Development Hub",
      category: "career",
      country: "Nigeria",
      services: ["CV Review", "Interview Prep", "Career Counseling"],
      type: "Career Services",
      contact: "careers@acdh.org",
      website: "www.acdh.org",
      verified: true,
    },
    {
      name: "East African Scholars Network",
      category: "mentorship",
      country: "Tanzania",
      services: ["Peer Mentoring", "Research Collaboration"],
      type: "Scholar Network",
      contact: "info@easn.org",
      website: "www.easn.org",
      verified: true,
    },
  ];

  const emergencySupport = [
    {
      icon: Heart,
      title: "Mental Health Crisis Line",
      description: "24/7 support for scholars facing mental health challenges",
      contact: "+234 800 SCHOLAR (24/7)",
      availability: "Immediate",
    },
    {
      icon: DollarSign,
      title: "Emergency Financial Aid",
      description: "Quick access grants for scholars in urgent financial need",
      contact: "emergency@graduateresearchclinic.org",
      availability: "48-hour response",
    },
    {
      icon: Users,
      title: "Rapid Mentorship Connect",
      description: "Urgent academic guidance and support",
      contact: "urgent@graduateresearchclinic.org",
      availability: "Same-day response",
    },
  ];

  const supportPathways = [
    {
      title: "I need help with my research methodology",
      steps: [
        "Browse Research Methods Advisors",
        "Book a consultation session",
        "Access methodology templates",
      ],
      icon: BookOpen,
    },
    {
      title: "I'm looking for funding opportunities",
      steps: [
        "Search grants database",
        "Get application support",
        "Connect with funded scholars",
      ],
      icon: DollarSign,
    },
    {
      title: "I need career guidance",
      steps: [
        "Find career counselors",
        "Join career workshops",
        "Access job boards",
      ],
      icon: Briefcase,
    },
    {
      title: "I'm struggling with mental health",
      steps: [
        "Contact counseling services",
        "Join support groups",
        "Access wellness resources",
      ],
      icon: Heart,
    },
  ];

  const filteredProviders = supportProviders.filter((provider) => {
    const matchesCategory =
      activeCategory === "all" || provider.category === activeCategory;
    const matchesCountry =
      selectedCountry === "all" ||
      selectedCountry === "All Countries" ||
      provider.country === selectedCountry;
    const matchesSearch =
      searchQuery === "" ||
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.services.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesCategory && matchesCountry && matchesSearch;
  });

  return (
    <div className="bg-linear-to-b from-purple-50 to-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-linear-to-br from-[#95111c] via-[#7a0e16] to-[#95111c]">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4zIi8+PC9nPjwvc3ZnPg==')]"></div>

        {/* Breadcrumb Navigation */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Breadcrumb current="Find Support" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Find the Support You Need
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Connect with mentors, funding opportunities, academic services, and
            wellness resources across Africa
          </p>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search by service, organization, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 text-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-xl transition-all">
                  Search Support
                </button>
                <button className="px-4 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all">
                  <Filter className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Support Banner */}
      <section className="bg-red-50 border-y-4 border-red-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6" />
            Emergency & Urgent Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {emergencySupport.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 border-l-4 border-red-500"
              >
                <item.icon className="w-8 h-8 text-red-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <a
                  href={`mailto:${item.contact}`}
                  className="text-red-600 font-semibold text-sm hover:underline"
                >
                  {item.contact}
                </a>
                <p className="text-xs text-gray-500 mt-2">
                  ⏱️ {item.availability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-12 px-4 sticky top-16 bg-white/95 backdrop-blur-sm z-40 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {supportCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#95111c] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <cat.icon className="w-5 h-5" />
                {cat.label}
                <span className="text-sm opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Support Services */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6">
                Featured Support Services
              </h2>

              <div className="space-y-6">
                {featuredSupport.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-4 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-xl">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                            {service.category}
                          </span>
                          <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                            {service.type}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {service.organization}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, fidx) => (
                        <div
                          key={fidx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-wrap items-center gap-4 pb-6 mb-6 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {service.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {service.availability}
                      </div>
                      {service.contact.email && (
                        <a
                          href={`mailto:${service.contact.email}`}
                          className="flex items-center gap-2 text-sm text-[#95111c] hover:underline"
                        >
                          <Mail className="w-4 h-4" />
                          {service.contact.email}
                        </a>
                      )}
                      {service.contact.phone && (
                        <a
                          href={`tel:${service.contact.phone}`}
                          className="flex items-center gap-2 text-sm text-[#95111c] hover:underline"
                        >
                          <Phone className="w-4 h-4" />
                          {service.contact.phone}
                        </a>
                      )}
                    </div>

                    <button className="w-full bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                      {service.cta}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Provider Directory */}
            <div>
              <h2 className="text-3xl font-bold text-[#95111c] mb-6">
                Support Provider Directory
              </h2>
              <p className="text-gray-600 mb-6">
                Showing {filteredProviders.length} providers
                {activeCategory !== "all" &&
                  ` in ${supportCategories.find((c) => c.id === activeCategory)?.label}`}
                {selectedCountry !== "all" &&
                  selectedCountry !== "All Countries" &&
                  ` in ${selectedCountry}`}
              </p>

              <div className="grid gap-6">
                {filteredProviders.map((provider, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {provider.name}
                          </h3>
                          {provider.verified && (
                            <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="font-medium text-purple-600">
                            {provider.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {provider.country}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {provider.services.map((service, sidx) => (
                            <span
                              key={sidx}
                              className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                      <a
                        href={`mailto:${provider.contact}`}
                        className="text-sm text-gray-600 hover:text-[#95111c] flex items-center gap-1"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </a>
                      <a
                        href={`https://${provider.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-600 hover:text-[#95111c] flex items-center gap-1"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                      <button className="ml-auto bg-[#95111c] hover:bg-[#7a0e16] text-white font-semibold px-6 py-2 rounded-lg transition-all text-sm flex items-center gap-2">
                        Connect
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProviders.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    No providers found matching your criteria
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("all");
                      setSelectedCountry("all");
                      setSearchQuery("");
                    }}
                    className="text-[#95111c] hover:underline font-semibold"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Pathways */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-[#95111c] mb-6">
                Need Help Finding Support?
              </h3>

              <div className="space-y-4">
                {supportPathways.map((pathway, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer border border-purple-100"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <pathway.icon className="w-5 h-5 text-[#95111c] shrink-0 mt-0.5" />
                      <p className="font-semibold text-gray-900 text-sm">
                        {pathway.title}
                      </p>
                    </div>
                    <ol className="ml-8 space-y-1">
                      {pathway.steps.map((step, sidx) => (
                        <li
                          key={sidx}
                          className="text-xs text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-[#95111c] font-bold">
                            {sidx + 1}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact GRC */}
            <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-xl shadow-lg p-6 text-white">
              <MessageCircle className="w-12 h-12 mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-3">
                Can't Find What You Need?
              </h3>
              <p className="text-white/90 mb-6 text-sm">
                Our support team is here to help you connect with the right
                resources.
              </p>
              <div className="space-y-3 text-sm mb-6">
                <a
                  href="mailto:support@graduateresearchclinic.org"
                  className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  support@graduateresearchclinic.org
                </a>
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +234 801 234 5678
                </a>
              </div>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-all">
                Contact Support Team
              </button>
            </div>

            {/* Submit Organization */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Lightbulb className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold text-[#95111c] mb-3">
                Know a Great Support Organization?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Help us build a comprehensive directory by suggesting
                organizations that support African scholars.
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all">
                Submit Organization
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
