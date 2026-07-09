import { useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePaperAirplane } from 'react-icons/hi';
import api from '../services/api';
import { personalInfo } from '../constants/personalData';

const initialForm = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/messages', form);
      toast.success("Message sent! I'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      if (err.response) {
        // Backend is running but rejected the request (validation, rate limit, etc.)
        const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
        toast.error(msg);
      } else {
        // Backend/database not reachable - fall back to opening the user's email app
        const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
          form.subject
        )}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
        window.location.href = mailtoLink;
        toast.info('Opening your email app to send this message directly.');
        setForm(initialForm);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-16">
      <section className="section-container">
        <p className="section-eyebrow" data-aos="fade-up">// contact.send()</p>
        <h1 className="section-heading" data-aos="fade-up">Get In Touch</h1>
        <p className="text-slate-400 max-w-2xl mb-10" data-aos="fade-up">
          Have an internship opportunity, project idea, or just want to say hi? Drop a message below.
        </p>

        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10">
          <div className="space-y-4" data-aos="fade-right">
            <div className="glass-card p-5 flex items-center gap-4">
              <HiOutlineMail className="text-accent" size={22} />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm text-white">{personalInfo.email}</p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <HiOutlinePhone className="text-accent" size={22} />
              <div>
                <p className="text-xs text-slate-500">Phone</p>
                <p className="text-sm text-white">{personalInfo.phone}</p>
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <HiOutlineLocationMarker className="text-accent" size={22} />
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm text-white">{personalInfo.location}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5" data-aos="fade-left" noValidate>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 outline-none transition-colors ${
                    errors.name ? 'border-red-500/60' : 'border-white/10 focus:border-accent/50'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 outline-none transition-colors ${
                    errors.email ? 'border-red-500/60' : 'border-white/10 focus:border-accent/50'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 outline-none transition-colors ${
                  errors.subject ? 'border-red-500/60' : 'border-white/10 focus:border-accent/50'
                }`}
                placeholder="What's this about?"
              />
              {errors.subject && <p className="text-xs text-red-400 mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Message</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-slate-500 outline-none transition-colors resize-none ${
                  errors.message ? 'border-red-500/60' : 'border-white/10 focus:border-accent/50'
                }`}
                placeholder="Tell me a bit more..."
              />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            <button type="submit" disabled={submitting} className="btn-gradient w-full md:w-auto justify-center disabled:opacity-60">
              <HiOutlinePaperAirplane size={18} className="rotate-90" />
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
