import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Users,
  Target,
  Eye,
  Heart,
  Globe,
  Award,
  Lightbulb,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Handshake,
  Mail,
  Linkedin,
  Twitter,
  MapPin,
  Building2,
  CheckCircle,
  Star,
  ArrowRight,
  Shield,
  Sparkles,
  Users2,
  Zap,
  Phone,
} from "lucide-react";

export default function AboutPage(): React.ReactElement {
  const [activeSection, setActiveSection] = useState("story");

  // Core Values
  const coreValues = [
    {
      icon: Heart,
      title: "Excellence",
      description:
        "We uphold the highest standards in research, mentorship, and academic support.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of networks, partnerships, and knowledge co-production.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Globe,
      title: "Pan-Africanism",
      description:
        "We are committed to advancing African scholarship and sustainable development across the continent and diaspora.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace interdisciplinary approaches and creative solutions to complex challenges.",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We operate with transparency, accountability, and ethical responsibility in all our engagements.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Empowerment",
      description:
        "We equip scholars with skills, resources, and networks to thrive in academia and beyond.",
      color: "from-pink-500 to-pink-600",
    },
  ];

  // Leadership Team
  const leadershipTeam = [
    {
      name: "Dr. Chidinma Okafor",
      role: "Founder & Executive Director",
      image: null,
      bio: "PhD in Development Studies with 15+ years experience in African higher education. Passionate about empowering the next generation of African scholars.",
      expertise: [
        "Research Methodology",
        "Academic Mentorship",
        "Development Studies",
      ],
      contact: {
        email: "c.okafor@graduateresearchclinic.org",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Prof. Kwame Asante",
      role: "Director of Research & Partnerships",
      image: null,
      bio: "Former Dean of Graduate Studies with extensive experience in international research collaboration and grant management.",
      expertise: [
        "Research Partnerships",
        "Grantsmanship",
        "Higher Education Policy",
      ],
      contact: {
        email: "k.asante@graduateresearchclinic.org",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Dr. Amina Ibrahim",
      role: "Director of Capacity Building",
      image: null,
      bio: "Educational psychologist specializing in doctoral training, academic writing, and mental health support for graduate students.",
      expertise: ["Academic Writing", "Mental Health", "Doctoral Training"],
      contact: {
        email: "a.ibrahim@graduateresearchclinic.org",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Mr. Oluwaseun Adeyemi",
      role: "Head of Programs & Operations",
      image: null,
      bio: "Project management specialist with a track record of delivering impactful programs across 15 African countries.",
      expertise: ["Program Management", "Operations", "Impact Assessment"],
      contact: {
        email: "o.adeyemi@graduateresearchclinic.org",
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  // Advisory Board
  const advisoryBoard = [
    {
      name: "Prof. Fatima Nkrumah",
      title: "Board Chair",
      affiliation: "University of Ghana",
      expertise: "Political Science & Governance",
      image: null,
    },
    {
      name: "Dr. Thierry Kamau",
      title: "Board Member",
      affiliation: "African Union Commission",
      expertise: "Research Policy & Innovation",
      image: null,
    },
    {
      name: "Prof. Zainab Alkali",
      title: "Board Member",
      affiliation: "Ahmadu Bello University",
      expertise: "Gender Studies & Development",
      image: null,
    },
    {
      name: "Dr. Jean-Baptiste Ngoma",
      title: "Board Member",
      affiliation: "Independent Scholar & Consultant",
      expertise: "Public Health & Epidemiology",
      image: null,
    },
    {
      name: "Prof. Naledi Mokoena",
      title: "Board Member",
      affiliation: "University of Cape Town",
      expertise: "Economics & Public Policy",
      image: null,
    },
    {
      name: "Dr. Ahmed Hassan",
      title: "Board Member",
      affiliation: "African Development Bank",
      expertise: "Infrastructure & Development Finance",
      image: null,
    },
  ];

  // Strategic Partners
  const strategicPartners = [
    {
      name: "African Research Universities Alliance (ARUA)",
      type: "Academic Network",
      partnership: "Research Collaboration & Knowledge Exchange",
      since: "2022",
      logo: null,
    },
    {
      name: "Pan-African University",
      type: "Educational Institution",
      partnership: "Joint Doctoral Programs & Workshops",
      since: "2021",
      logo: null,
    },
    {
      name: "African Academy of Sciences",
      type: "Scientific Organization",
      partnership: "Research Grants & Capacity Building",
      since: "2022",
      logo: null,
    },
    {
      name: "Gates Foundation Africa",
      type: "Philanthropic Organization",
      partnership: "Funding for Health & Development Research",
      since: "2023",
      logo: null,
    },
    {
      name: "African Development Bank",
      type: "Financial Institution",
      partnership: "Economic Research & Policy Analysis",
      since: "2023",
      logo: null,
    },
    {
      name: "Council for the Development of Social Science Research in Africa (CODESRIA)",
      type: "Research Network",
      partnership: "Social Sciences Research & Publishing",
      since: "2020",
      logo: null,
    },
  ];

  // Impact Statistics
  const impactStats = [
    { number: "2,500+", label: "Scholars Supported", icon: GraduationCap },
    { number: "15", label: "African Countries", icon: Globe },
    { number: "50+", label: "Partner Organizations", icon: Handshake },
    { number: "120+", label: "Research Projects", icon: BookOpen },
    { number: "85%", label: "Graduation Rate", icon: Award },
    { number: "200+", label: "Publications Supported", icon: Star },
  ];

  // Milestones
  const milestones = [
    {
      year: "2019",
      title: "Foundation Year",
      description:
        "The Graduate Research Clinic was established with a vision to transform African scholarship.",
      icon: Sparkles,
    },
    {
      year: "2020",
      title: "First Cohort Launch",
      description:
        "Launched our inaugural mentorship program with 50 graduate students across 5 countries.",
      icon: Users,
    },
    {
      year: "2021",
      title: "Pan-African Expansion",
      description:
        "Expanded operations to 10 African countries and established strategic partnerships.",
      icon: Globe,
    },
    {
      year: "2022",
      title: "Research Excellence Awards",
      description:
        "Introduced annual awards recognizing outstanding research by early career scholars.",
      icon: Award,
    },
    {
      year: "2023",
      title: "Digital Transformation",
      description:
        "Launched comprehensive online platform and virtual workshops reaching 1,000+ scholars.",
      icon: Zap,
    },
    {
      year: "2024",
      title: "Global Recognition",
      description:
        "Recognized by UNESCO and African Union as a leading capacity-building organization.",
      icon: Star,
    },
  ];

  // Priority Areas
  const priorityAreas = [
    "Setting high-level research and publishing goals",
    "Embracing Inter/Multi/Trans-disciplinarity and Improving the use of mixed methodology",
    "Thriving in graduate school and graduating in record time",
    "Soft skills for graduate students, early career scholars and tenured professors",
    "Entering the Job Market after (graduate) School",
    "Strategies for achieving tenure/professorship in record time",
    "Building a mental health support system",
    "Achieving Work-Study-Life-Family-Spirit balance",
    "Digital and Information Technology skills for researchers",
    "How to become a Public Scholar",
    "How to Become an Academic Consultant (Acadepreneurship)",
    "Leaving the Academia and Becoming an Independent Scholar",
    "Preparing for Post-Retirement",
  ];

  return (
    <div className="bg-linear-to-b from-purple-50 to-white min-h-screen font-montserrat">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-[#95111c] via-[#7a0e16] to-[#95111c]">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4zIi8+PC9nPjwvc3ZnPg==')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400 px-6 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                About Us
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Empowering African Scholars to Transform the World
            </h1>

            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              We are a pan-African non-profit organization dedicated to
              fostering research excellence, building networks, and empowering
              the next generation of African scholars and researchers.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 bg-white/95 backdrop-blur-sm z-40 shadow-sm py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "story", label: "Our Story" },
              { id: "vision", label: "Vision & Mission" },
              { id: "values", label: "Core Values" },
              { id: "team", label: "Leadership Team" },
              { id: "board", label: "Advisory Board" },
              { id: "partners", label: "Partners" },
              { id: "impact", label: "Our Impact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-2 cursor-pointer rounded-full font-medium transition-all ${
                  activeSection === tab.id
                    ? "bg-[#95111c] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-[#95111c] mb-8 flex items-center gap-3">
              <BookOpen className="w-10 h-10" />
              Our Story
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                The Graduate Research Clinic was born from a simple but powerful
                observation: African graduate students and early career scholars
                often face unique challenges that impede their academic progress
                and professional development. From limited access to mentorship
                and resources to navigating complex academic systems, these
                barriers were preventing brilliant minds from reaching their
                full potential.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Founded in 2019, our organization emerged as a direct response
                to these challenges. We recognized that African scholarship
                needed more than just funding—it needed a comprehensive support
                system that would address the entire academic value chain, from
                undergraduate research to post-retirement planning.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                What began as a small mentorship initiative connecting 50
                graduate students with experienced researchers has evolved into
                a pan-African movement spanning 15 countries, supporting over
                2,500 scholars, and partnering with 50+ leading institutions and
                organizations.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Today, The Graduate Research Clinic stands as a testament to the
                power of collaboration, mentorship, and community. We have
                facilitated hundreds of research projects, supported countless
                publications, and created pathways for academic excellence that
                are uniquely African yet globally competitive.
              </p>

              <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-xl p-8 my-8 border border-purple-200">
                <p className="text-lg font-semibold text-[#95111c] italic">
                  "Our vision is not just to support African scholars—it's to
                  create a thriving ecosystem where African research leads
                  global conversations on development, innovation, and social
                  transformation."
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  — Founder's Vision Statement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-10 h-10 text-yellow-400" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>

              <p className="text-white/95 leading-relaxed text-lg">
                To be one of the topmost African non-profit organizations that
                fosters innovative research and collaboration across
                disciplines, generations, and geographical boundaries,
                empowering African scholars and professionals to address complex
                global challenges and contribute to the advancement of
                African/African Diaspora studies and sustainable development in
                Africa and beyond!
              </p>
            </div>

            {/* Mission */}
            <div className="bg-linear-to-br from-purple-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-10 h-10 text-yellow-400" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>

              <p className="text-white/95 leading-relaxed text-lg">
                To create a powerful support system/network at all levels of the
                academic value chain, especially for (under)graduate students,
                early career scholars and budding acadepreneurs from various
                disciplines, backgrounds, research interests, ideological
                persuasions, cultural orientations, countries etc. by connecting
                them to established, skilled experts and mentors within and
                outside the academia for knowledge transfer and co-production.
              </p>

              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-white/90">
                  <strong>Ultimate Purpose:</strong> Fostering collaboration for
                  finding solutions to development challenges in Africa and her
                  Diaspora, opening doors of opportunities for career mobility,
                  and empowering the next generation of African researchers and
                  development practitioners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our commitment to
              African scholarship
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100 group"
              >
                <div
                  className={`inline-flex p-4 bg-linear-to-br ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Priority Areas */}
        <section className="mb-20">
          <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12 border border-blue-100">
            <h2 className="text-3xl font-bold text-[#95111c] mb-8 flex items-center gap-3">
              <Target className="w-8 h-8" />
              Priority Areas of Intervention
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {priorityAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-800">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals with deep expertise in African higher
              education and research
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {leadershipTeam.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-lg text-[#95111c] font-semibold mb-4">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {member.bio}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Areas of Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((exp, eidx) => (
                      <span
                        key={eidx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <a
                    href={`mailto:${member.contact.email}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#95111c] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  <a
                    href={member.contact.linkedin}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#95111c] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href={member.contact.twitter}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#95111c] transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advisory Board */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Advisory Board
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Distinguished scholars and practitioners providing strategic
              guidance and oversight
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisoryBoard.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 text-center"
              >
                <div className="w-20 h-20 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>

                <p className="text-sm text-[#95111c] font-semibold mb-3">
                  {member.title}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  {member.affiliation}
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-700">
                    <strong>Expertise:</strong> {member.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Partners */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Our Strategic Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with leading institutions to amplify our impact
              across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {strategicPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-white to-purple-50 rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-purple-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#95111c] rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {partner.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {partner.type}
                      </span>
                      <span className="text-xs text-gray-600">
                        Since {partner.since}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700">
                  <strong>Partnership Focus:</strong> {partner.partnership}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="cursor-pointer bg-[#95111c] hover:bg-[#7a0e16] text-white font-bold px-8 py-4 rounded-xl transition-all flex items-center gap-2 mx-auto shadow-lg hover:scale-105">
              Become a Partner
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Our Impact */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#95111c] mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforming African scholarship one scholar at a time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {impactStats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-[#95111c]" />
                </div>
                <div className="text-4xl font-bold text-[#95111c] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Milestones Timeline */}
          <div className="bg-linear-to-br from-gray-50 to-purple-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-[#95111c] mb-12 text-center">
              Our Journey: Key Milestones
            </h3>

            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <milestone.icon className="w-6 h-6 text-white" />
                    </div>
                    {idx < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 my-2"></div>
                    )}
                  </div>
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl font-bold text-[#95111c]">
                        {milestone.year}
                      </span>
                      <div className="h-px bg-gray-300 flex-1"></div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-linear-to-br from-[#95111c] to-[#7a0e16] rounded-2xl shadow-2xl p-12 text-white text-center">
          <Users2 className="w-16 h-16 mx-auto mb-6 text-yellow-400" />

          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>

          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether you're a graduate student seeking mentorship, an established
            scholar wanting to give back, or an organization looking to
            partner—there's a place for you in our community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105">
              <GraduationCap className="w-5 h-5" />
              Join as a Scholar
            </button>
            <button className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/30 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Become a Mentor
            </button>
            <button className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-xl transition-all border-2 border-white/30 flex items-center justify-center gap-2">
              <Handshake className="w-5 h-5" />
              Partner With Us
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@graduateresearchclinic.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Pan-African | Based in Nigeria</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
