import type { CaseStudy } from '@/lib/content/types';

export default function CaseStudiesSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section id="cases">
      <div className="max-w">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Real Results
          </div>
          <h2 className="section-title">
            What <span className="grad-text">happens</span> when clients work with us
          </h2>
          <p className="section-sub" style={{ margin: '14px auto 0' }}>
            Numbers from actual engagements — not projections, not estimates.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <p className="admin-empty-row" style={{ textAlign: 'center', marginTop: 40 }}>
            Case studies coming soon.
          </p>
        ) : (
          <div className="cases-grid" style={{ marginTop: 56 }}>
            {caseStudies.map((cs, i) => (
              <div key={cs.id} className={`case-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ''}`}>
                <div className="case-tag">{cs.tag}</div>
                <h3>{cs.title}</h3>
                <p className="challenge">{cs.challenge}</p>
                <div className="case-metrics">
                  {cs.metrics.map((m, j) => (
                    <div key={j} className="case-metric">
                      <div className="m-val">{m.value}</div>
                      <div className="m-lbl">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
