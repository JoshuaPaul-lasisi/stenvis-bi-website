import type { SiteSettings } from '@/lib/content/types';

export default function ContactSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="reveal">
          <div className="section-label">Contact</div>
          <h2 className="section-title">
            Let&apos;s talk <span className="grad-text">about your data</span>
          </h2>
          <p className="section-sub">
            Tell us about your business. We respond within 24 hours with an honest assessment — no jargon, no
            pressure.
          </p>
          <div className="contact-items">
            <div className="c-item">
              <div className="c-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>
                  {settings.location_line1}
                  <br />
                  {settings.location_line2}
                </p>
              </div>
            </div>
            <div className="c-item">
              <div className="c-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p>
                  <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>{settings.phone}</a>
                </p>
              </div>
            </div>
            <div className="c-item">
              <div className="c-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </p>
              </div>
            </div>
          </div>
          <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noreferrer" className="wa-contact-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        <div className="contact-form reveal reveal-delay-1">
          <h3>Send an Inquiry</h3>
          <p className="form-sub">We&apos;ll get back to you within 24 hours.</p>

          <div
            id="formSuccess"
            style={{
              display: 'none',
              background: 'var(--teal-light)',
              border: '1px solid var(--teal-border)',
              borderRadius: 12,
              padding: '20px 22px',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>✅</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>Message sent!</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>We&apos;ll be in touch within 24 hours.</div>
          </div>

          <form id="contactForm" action="https://formspree.io/f/mqejlyyp" method="POST" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="company" placeholder="Your company" required />
              </div>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="name" placeholder="Full name" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" name="phone" placeholder="+234..." />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="you@company.com" required />
              </div>
            </div>
            <div className="form-group">
              <label>Service of Interest</label>
              <select name="service">
                <option value="">Select a service...</option>
                <option>BI Consulting</option>
                <option>Predictive Analytics</option>
                <option>Market Research &amp; Feasibility</option>
                <option>Custom Data Solutions</option>
                <option>Training Workshops</option>
                <option>Strategic Consultation</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Tell us about your data challenges and business goals..." required />
            </div>
            <div className="form-check">
              <input type="checkbox" id="privacy" name="privacy" required />
              <label htmlFor="privacy">
                I have read and agree to the <a href="#">privacy policy</a>
              </label>
            </div>
            <button
              type="submit"
              id="formSubmit"
              className="btn-teal"
              style={{ width: '100%', border: 'none', justifyContent: 'center', fontSize: '0.88rem' }}
            >
              <span id="submitLabel">Submit Inquiry →</span>
              <span id="submitSpinner" style={{ display: 'none' }}>
                Sending…
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
