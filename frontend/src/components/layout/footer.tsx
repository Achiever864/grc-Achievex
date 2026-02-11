import { Link, useLocation } from "wouter";
import React, { useState } from "react";
import logo from "@/assets/logo/logo.png";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebookF,
} from "react-icons/fa";
import { API_ENDPOINTS } from "@/config/api";

export default function Footer() {
  const [location, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(API_ENDPOINTS.NEWSLETTER_SUBSCRIBE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: "", // Quick signup - they can add details later
          lastName: "",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setMessage("Successfully subscribed! Check your email.");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setMessage(data.message || "Subscription failed. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setMessage("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFullSignup = () => {
    setLocation("/newsletter");
  };

  const footerLinks = {
    about: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/about#mission" },
      { label: "Our Team", href: "/about#team" },
    ],
    programs: [
      { label: "Capacity Building", href: "/programs/capacity" },
      { label: "Mentorship", href: "/programs/mentorship" },
      { label: "Research Support", href: "/programs/research" },
      { label: "Events", href: "/events" },
    ],
    resources: [
      { label: "Research Library", href: "/library" },
      { label: "Publications", href: "/publications" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  };

  const socialLinks = [
    { Icon: FaYoutube, href: "#", label: "YouTube", color: "hover:bg-red-600" },
    {
      Icon: FaInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      Icon: FaLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:bg-blue-600",
    },
    {
      Icon: FaFacebookF,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-700",
    },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");

      if (location === path || path === location) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  };
  return (
    <footer className="bg-linear-to-br from-[#95111c] via-[#8f2029] to-[#7a0e16] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Organization Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="GRC Logo" className="h-12 w-auto" />
              <h3 className="text-xl font-bold">Graduate Research Clinic</h3>
            </div>

            <div className="space-y-3 text-sm text-white/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-yellow-400" />
                <p>
                  Script Building,
                  <br />
                  University of Ibadan,
                  <br />
                  Ibadan, Oyo State, Nigeria
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-yellow-400" />
                <a
                  href="mailto:info@graduateresearchclinic.org"
                  className="hover:text-yellow-400 transition-colors hover:underline"
                >
                  info@graduateresearchclinic.org
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-yellow-400" />
                <a
                  href="tel:+2348012345678"
                  className="hover:text-yellow-400 transition-colors"
                >
                  +234 801 234 5678
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-yellow-400">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {socialLinks.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`p-2.5 bg-white/10 rounded-lg ${color} transition-all hover:scale-110`}
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: About */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-4 text-yellow-400">About</h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="text-sm text-white/90 hover:text-yellow-400 hover:pl-2 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Programs</h4>
            <ul className="space-y-2.5">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 hover:text-yellow-400 hover:pl-2 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-4 text-yellow-400">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 hover:text-yellow-400 hover:pl-2 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter Signup */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold mb-4 text-yellow-400">
              Stay Updated
            </h4>
            <p className="text-sm text-white/90 mb-4">
              Subscribe to our newsletter for latest updates
            </p>

            {/* Success/Error Messages */}
            {status === "success" && (
              <div className="mb-3 p-3 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <p className="text-sm text-green-100">{message}</p>
              </div>
            )}

            {status === "error" && (
              <div className="mb-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-100">{message}</p>
              </div>
            )}

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:bg-white/20 focus:border-yellow-400 focus:outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2.5 rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Link to full signup */}
            <button
              onClick={handleFullSignup}
              className="mt-3 text-xs text-white/70 hover:text-yellow-400 transition-colors underline"
            >
              Want to customize your preferences? Click here
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
            <p>
              © {new Date().getFullYear()} Graduate Research Clinic. All rights
              reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
