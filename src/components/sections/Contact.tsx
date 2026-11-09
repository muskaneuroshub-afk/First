import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../../data/site';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';
import { Icon } from '../ui/Icon';
import { validateContactForm, FormErrors } from '../../lib/validation';
import {
  submitContactForm,
  isContactFormConfigured,
} from '../../lib/submitContactForm';
import {
  Mail,
  Send,
  MessageSquare,
  MapPin,
  Clock,
  AlertCircle,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '', // Hidden field for bot detection
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'warning' | 'info';
    text: string;
  } | null>(null);

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const configured = isContactFormConfigured();

  // Listen for prefill event from Services section
  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const customEvent = event as CustomEvent<{ subject: string }>;
      if (customEvent.detail?.subject) {
        setFormData((prev) => ({
          ...prev,
          subject: customEvent.detail.subject,
        }));
      }
    };

    window.addEventListener('prefill-contact-subject', handlePrefill);
    return () => window.removeEventListener('prefill-contact-subject', handlePrefill);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for that field as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiting (prevent repeated clicks within 5 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      setStatusMessage({
        type: 'warning',
        text: 'Please wait a few seconds before submitting again.',
      });
      return;
    }

    // Run field validations
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatusMessage({
        type: 'error',
        text: 'Please correct the errors in the form before submitting.',
      });
      // Focus error summary for screen reader / keyboard accessibility
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setStatusMessage(null);

    // Call single integration service
    const result = await submitContactForm(formData);
    setIsSubmitting(false);
    setLastSubmitTime(Date.now());

    if (result.success) {
      setStatusMessage({
        type: 'success',
        text: result.message,
      });
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } else {
      setStatusMessage({
        type: result.isConfigured ? 'error' : 'warning',
        text: result.message,
      });
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Discuss Your Next Project"
          description="Whether you have an engineering opening, a consulting project, or a technical question, my inbox is open."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Methods & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card padding="lg" className="border-border space-y-6">
              <h3 className="text-xl font-bold text-text-primary">
                Direct Contact Channels
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Prefer direct communication? Reach out directly using any of the channels below.
              </p>

              <div className="space-y-4">
                {/* Email Direct */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-secondary hover:bg-bg-secondary/80 border border-border transition-colors group focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <div className="p-2 rounded-lg bg-brand/10 text-brand group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs uppercase font-semibold text-text-muted block">
                      Email Address
                    </span>
                    <span className="text-sm font-semibold text-text-primary group-hover:text-brand transition-colors break-all">
                      {siteConfig.email}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Link (if configured) */}
                {siteConfig.whatsappNumber && (
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-secondary hover:bg-bg-secondary/80 border border-border transition-colors group focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <div className="p-2 rounded-lg bg-status-success/10 text-status-success group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-semibold text-text-muted block">
                        WhatsApp Message
                      </span>
                      <span className="text-sm font-semibold text-text-primary group-hover:text-status-success transition-colors">
                        Quick Chat on WhatsApp
                      </span>
                    </div>
                  </a>
                )}

                {/* Location */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-secondary border border-border">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-text-muted block">
                      Location & Timezone
                    </span>
                    <span className="text-sm font-semibold text-text-primary">
                      {siteConfig.location}
                    </span>
                  </div>
                </div>

                {/* Response SLA */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-bg-secondary border border-border">
                  <div className="p-2 rounded-lg bg-brand/10 text-brand">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-semibold text-text-muted block">
                      Expected Response
                    </span>
                    <span className="text-sm font-semibold text-text-primary">
                      Within 24 business hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-border">
                <span className="text-xs uppercase font-semibold text-text-muted tracking-wider block mb-3">
                  Professional Networks
                </span>
                <div className="flex items-center gap-3">
                  {siteConfig.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-border bg-bg-secondary hover:bg-bg-card hover:border-brand/50 text-text-secondary hover:text-brand transition-colors focus:outline-none focus:ring-2 focus:ring-brand"
                      aria-label={social.label}
                    >
                      <Icon name={social.icon} size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Controlled Form (7 cols) */}
          <div className="lg:col-span-7">
            <Card padding="lg" className="border-border">
              {/* Unconfigured Alert Banner (Honest UI requirement) */}
              {!configured && (
                <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-sm">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-semibold text-text-primary">
                        Contact Form Service Not Configured Yet
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        To enable direct form submissions, start the backend server and set <code className="bg-bg-card px-1 py-0.5 rounded font-mono border border-border">VITE_API_BASE_URL=http://localhost:4000</code> in <code className="bg-bg-card px-1 py-0.5 rounded font-mono border border-border">.env</code>, then restart the frontend. In the meantime, use the direct email link below.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Summary focus container */}
              <div
                ref={errorSummaryRef}
                tabIndex={-1}
                className="outline-none"
                aria-live="assertive"
              >
                {statusMessage && (
                  <Toast
                    type={statusMessage.type}
                    message={statusMessage.text}
                    onClose={() => setStatusMessage(null)}
                    className="mb-6"
                  />
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from legitimate users, catches automated bots) */}
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="contact-honeypot">Leave this field blank</label>
                  <input
                    id="contact-honeypot"
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </div>

                {/* Subject */}
                <Input
                  label="Subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  placeholder="Inquiry regarding modern web application"
                  autoComplete="off"
                />

                {/* Message */}
                <Textarea
                  label="Message"
                  name="message"
                  required
                  maxLength={3000}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  placeholder="Share a brief overview of your timeline, objectives, or questions..."
                />

                {/* Submit Button & Fallback */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    leftIcon={
                      isSubmitting ? undefined : <Send className="w-4 h-4" />
                    }
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>

                  <a
                    href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(formData.subject || 'Website Inquiry')}&body=${encodeURIComponent(formData.message || '')}`}
                    className="text-xs text-text-muted hover:text-brand transition-colors text-center"
                  >
                    Or send directly via email client &rarr;
                  </a>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};
