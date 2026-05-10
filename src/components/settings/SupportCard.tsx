import { useState } from "react";
import { ExternalLink, HelpCircle, Mail, MessageSquare, X, Send, Check } from "lucide-react";
import { supportRows } from "@/data/settings";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const rowIcons: Record<string, LucideIcon> = {
  help: HelpCircle,
  contact: Mail,
  feedback: MessageSquare,
};

const helpFAQs = [
  { q: "How do I add a new trip?", a: "Go to My Trips and click '+ Plan New Trip' to start planning." },
  { q: "Can I share my itinerary?", a: "Yes! Open any trip and use the Share button to invite collaborators." },
  { q: "How do I export my data?", a: "Go to Settings → Data & Storage → Export My Data." },
];

export function SupportCard() {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const [feedbackForm, setFeedbackForm] = useState({ rating: 0, message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => { setContactSent(false); setContactForm({ subject: "", message: "" }); setOpenPanel(null); }, 2000);
  }

  function handleFeedback(e: React.FormEvent) {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => { setFeedbackSent(false); setFeedbackForm({ rating: 0, message: "" }); setOpenPanel(null); }, 2000);
  }

  const inputCls = "w-full rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2.5 text-sm font-medium text-[#1F261F] outline-none focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all";

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3EDF8]">
          <HelpCircle className="h-5 w-5 text-[#9B6BB5]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F261F]">Support</h3>
          <p className="text-xs font-medium text-[#7F7A70]">We're here to help you.</p>
        </div>
      </div>

      <ul className="mt-5 space-y-0">
        {supportRows.map((row) => {
          const Icon = rowIcons[row.id] ?? HelpCircle;
          const isOpen = openPanel === row.id;

          return (
            <li key={row.id}>
              <button type="button" onClick={() => setOpenPanel(isOpen ? null : row.id)}
                className="group flex w-full items-center gap-4 rounded-xl px-2 py-3.5 transition-all duration-200 hover:bg-[#F7F4EE]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EE] transition-colors duration-200 group-hover:bg-[#F3EDF8]">
                  <Icon className="h-4 w-4 text-[#7F7A70] group-hover:text-[#9B6BB5]" strokeWidth={1.8} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-[#1F261F]">{row.title}</p>
                  <p className="text-xs font-medium text-[#7F7A70]">{row.description}</p>
                </div>
                {isOpen
                  ? <X className="h-4 w-4 text-[#7F7A70]" />
                  : <ExternalLink className="h-4 w-4 text-[#B0A898] transition-all duration-200 group-hover:text-[#9B6BB5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                }
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">

                    {/* Help Center */}
                    {row.id === "help" && (
                      <div className="mb-3 space-y-2 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Frequently Asked Questions</p>
                        {helpFAQs.map((faq, i) => (
                          <details key={i} className="group rounded-xl border border-[#E8DED1] bg-white">
                            <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-[#1F261F] hover:text-[#2F4F3E]">
                              {faq.q}
                            </summary>
                            <p className="border-t border-[#F0EDE8] px-3 py-2.5 text-xs font-medium text-[#7F7A70]">{faq.a}</p>
                          </details>
                        ))}
                      </div>
                    )}

                    {/* Contact Support */}
                    {row.id === "contact" && (
                      <form onSubmit={handleContact} className="mb-3 space-y-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Contact Support</p>
                        {contactSent
                          ? <p className="flex items-center gap-2 text-sm font-semibold text-[#3C8B68]"><Check className="h-4 w-4" /> Message sent! We'll reply within 24 hours.</p>
                          : <>
                              <input className={inputCls} placeholder="Subject" value={contactForm.subject}
                                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} required />
                              <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Describe your issue..."
                                value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} required />
                              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F4F3E] py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52]">
                                <Send className="h-4 w-4" /> Send Message
                              </button>
                            </>
                        }
                      </form>
                    )}

                    {/* Give Feedback */}
                    {row.id === "feedback" && (
                      <form onSubmit={handleFeedback} className="mb-3 space-y-3 rounded-2xl border border-[#E8DED1] bg-[#F7F4EE] p-4">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#7F7A70]">Give Feedback</p>
                        {feedbackSent
                          ? <p className="flex items-center gap-2 text-sm font-semibold text-[#3C8B68]"><Check className="h-4 w-4" /> Thanks for your feedback!</p>
                          : <>
                              <div className="flex gap-2">
                                {[1,2,3,4,5].map((star) => (
                                  <button key={star} type="button" onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                                    className={`text-2xl transition-transform hover:scale-110 ${feedbackForm.rating >= star ? "opacity-100" : "opacity-30"}`}>
                                    ⭐
                                  </button>
                                ))}
                              </div>
                              <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Tell us what you think..."
                                value={feedbackForm.message} onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })} required />
                              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F4F3E] py-2.5 text-sm font-semibold text-white hover:bg-[#3C6B52]">
                                <Send className="h-4 w-4" /> Submit Feedback
                              </button>
                            </>
                        }
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mx-2 h-px bg-[#F0EDE8] last:hidden" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
