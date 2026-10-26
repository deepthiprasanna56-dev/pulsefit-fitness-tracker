import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { faqList } from '../data/goalsData';

export default function Contact({ onSubmitMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goalFocus: 'Strength Training & Hypertrophy',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitMessage(`Thank you, ${formData.name}! Your message has been sent to our fitness coaching team.`);
      setFormData({
        name: '',
        email: '',
        goalFocus: 'Strength Training & Hypertrophy',
        message: '',
      });
    }, 700);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/40 relative border-t border-slate-800/80 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            Connect & Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Get in Touch with PulseFit
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Have questions about your fitness plan, biometrics tracking, or customized coaching? We're here to assist 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Direct Support Channels</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Support</span>
                    <a href="mailto:support@pulsefit.app" className="text-white font-semibold hover:text-emerald-400 transition-colors">
                      support@pulsefit.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Toll-Free Helpline</span>
                    <span className="text-white font-semibold">+1 (800) 845-PULSE</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Global Headquarters</span>
                    <span className="text-slate-300">PulseFit Center, 420 High Performance Blvd, San Francisco, CA</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Coach Availability</span>
                    <span className="text-slate-300">24 Hours / 7 Days a Week, Live Sync Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Guarantee Pill */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <p className="text-xs text-slate-300 leading-snug">
                Average reply time is under 15 minutes. Certified sports nutritionists and strength coaches are on standby.
              </p>
            </div>

            {/* HD Coaching Team Image */}
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=85&fit=crop&auto=format"
                alt="Personal trainer coaching session"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/50" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-xs font-bold">🏋️‍♀️ Expert coaches ready to guide your transformation</p>
                <p className="text-slate-300 text-[11px] mt-0.5">1-on-1 sessions available 24/7</p>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Send us a Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill in your details below and a personal trainer will get back to you with custom guidance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@athlete.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Primary Fitness Goal
                </label>
                <select
                  value={formData.goalFocus}
                  onChange={(e) => setFormData({ ...formData, goalFocus: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:border-emerald-500 outline-none"
                >
                  <option value="Strength Training & Hypertrophy">Strength Training & Hypertrophy</option>
                  <option value="Fat Loss & Calorie Deficit">Fat Loss & Calorie Deficit</option>
                  <option value="Endurance & Half-Marathon Prep">Endurance & Half-Marathon Prep</option>
                  <option value="Mobility, Flexibility & Yoga">Mobility, Flexibility & Yoga</option>
                  <option value="Personalized Macro Nutrition Plan">Personalized Macro Nutrition Plan</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Your Message or Question
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your current training routine, any physical injuries, or specific milestones you want to hit..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/25 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 justify-center mb-8">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-2xl font-black text-white text-center">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
