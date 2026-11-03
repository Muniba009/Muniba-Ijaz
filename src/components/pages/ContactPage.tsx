import React, { useState } from 'react';
import { PageId } from '../../types';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../data/portfolioData';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, Github, Linkedin, Twitter, MapPin, Clock, MessageSquare } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [emailCopied, setEmailCopied] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject line is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message body cannot be empty.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters in your message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate client-side transmission / EmailJS API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Github':
        return <Github className="w-5 h-5" />;
      case 'Linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'Twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return <Mail className="w-5 h-5" />;
    }
  };

  return (
    <div className="pt-24 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="space-y-3 text-left">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00A6FF]">
          <span>Get in Touch</span>
          <span aria-hidden="true">·</span>
          <span>Open for AI Internships & Roles</span>
          <span aria-hidden="true">·</span>
          <span>Quick Response</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Contact Muniba Ijaz
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
          Whether you want to discuss an AI engineering opportunity, collaborate on Python research, or explore my projects, I'd love to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Contact Cards & Social Presence */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card with One-Click Copy */}
          <div className="glass-card p-6 rounded-2xl border border-[#38BDF8]/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#00A6FF] uppercase">Direct Email</span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#050816] border border-[#38BDF8]/20 text-[11px] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                title="Copy email to clipboard"
              >
                {emailCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#00A6FF]" />}
                <span>{emailCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-lg font-bold text-white hover:text-[#00A6FF] transition-colors break-all"
              >
                {PERSONAL_INFO.email}
              </a>
              <p className="text-xs text-[#94A3B8] mt-1">
                Monitored daily for technical inquiries, interviews, and project discussions.
              </p>
            </div>
          </div>

          {/* Quick Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0B1220]/70 border border-[#38BDF8]/15 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 border border-[#00A6FF]/30 flex items-center justify-center text-[#00A6FF]">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">Response Time</span>
              <p className="text-sm font-semibold text-white">Within 24 Hours</p>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1220]/70 border border-[#38BDF8]/15 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00A6FF]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8] block uppercase">Location & Modality</span>
              <p className="text-sm font-semibold text-white">Remote / Worldwide</p>
            </div>
          </div>

          {/* Professional Status */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#0B1220] to-[#050816] border border-[#00A6FF]/25 space-y-2">
            <span className="text-xs font-mono text-[#00A6FF] uppercase block">
              Engagement Availability
            </span>
            <p className="text-sm font-semibold text-white">
              {PERSONAL_INFO.availability}
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Seeking teams focused on machine learning engineering, algorithmic automation, and real-world intelligence solutions.
            </p>
          </div>

          {/* Social Profiles */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#94A3B8] uppercase block">
              Professional & Code Profiles
            </span>
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_LINKS.filter(s => s.platform !== 'Email').map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#0B1220] border border-[#38BDF8]/20 hover:border-[#00A6FF]/50 text-slate-300 hover:text-white transition-all flex items-center gap-3 group"
                >
                  <div className="text-[#00A6FF] group-hover:scale-110 transition-transform">
                    {getSocialIcon(social.iconName)}
                  </div>
                  <div className="truncate">
                    <span className="text-xs font-bold block">{social.platform}</span>
                    <span className="text-[10px] text-[#94A3B8] font-mono truncate block">{social.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl border border-[#38BDF8]/25 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Send a Direct Message
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Fill out the form below and your message will be forwarded directly to Muniba's inbox.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-3 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-300">Message Delivered Successfully!</p>
                <p className="mt-0.5 text-emerald-200/90">
                  Thank you for reaching out. Muniba has received your transmission and will respond shortly.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-rose-300">Failed to send message</p>
                <p className="mt-0.5 text-rose-200/90">
                  Please try again or email directly to <a href={`mailto:${PERSONAL_INFO.email}`} className="underline font-mono">{PERSONAL_INFO.email}</a>.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name field */}
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                  Your Name <span className="text-[#00A6FF]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Mercer"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#050816] border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500 focus:border-rose-400' : 'border-[#38BDF8]/20 focus:border-[#00A6FF]'
                  }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              {/* Email field */}
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                  Your Email Address <span className="text-[#00A6FF]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.mercer@company.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#050816] border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500 focus:border-rose-400' : 'border-[#38BDF8]/20 focus:border-[#00A6FF]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Subject field */}
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                Subject <span className="text-[#00A6FF]">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="AI Engineering Internship / Python Collaboration Inquiry"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#050816] border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.subject ? 'border-rose-500 focus:border-rose-400' : 'border-[#38BDF8]/20 focus:border-[#00A6FF]'
                }`}
              />
              {errors.subject && <p className="text-[11px] text-rose-400 mt-1">{errors.subject}</p>}
            </div>

            {/* Message body */}
            <div>
              <label className="block text-xs font-mono text-[#94A3B8] mb-1.5">
                Message <span className="text-[#00A6FF]">*</span>
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hello Muniba, I reviewed your Python ATM simulation and AI models and would like to discuss an opportunity..."
                className={`w-full px-4 py-2.5 rounded-xl bg-[#050816] border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                  errors.message ? 'border-rose-500 focus:border-rose-400' : 'border-[#38BDF8]/20 focus:border-[#00A6FF]'
                }`}
              />
              {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#00A6FF] text-white hover:text-[#050816] font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,166,255,0.3)] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
