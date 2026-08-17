import type { Testimonial } from '@/lib/content/types';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#00AD8E,#3B6EEA)',
  'linear-gradient(135deg,#F59E0B,#EF4444)',
  'linear-gradient(135deg,#7C3AED,#00AD8E)',
  'linear-gradient(135deg,#3B6EEA,#7C3AED)',
];

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials">
      <div className="t-inner">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Client Stories
          </div>
          <h2 className="section-title">
            Trusted by <span className="grad-text">growing businesses</span>
          </h2>
        </div>
        <div className="t-grid">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`t-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ''}`}>
              <div className="t-stars">
                {'★'.repeat(t.stars)}
                {t.stars < 5 && <span style={{ opacity: 0.3 }}>{'★'.repeat(5 - t.stars)}</span>}
              </div>
              <div className="t-quote">&quot;</div>
              <p>{t.quote}</p>
              <div className="t-author">
                <div className="t-avatar" style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}>
                  {t.avatar_initials}
                </div>
                <div>
                  <div className="t-name">{t.author_name}</div>
                  <div className="t-role">{t.author_role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
