import type { ClientIndustry, SiteSettings } from '@/lib/content/types';

const RADIUS = 58;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function AboutSection({
  industries,
  settings,
}: {
  industries: ClientIndustry[];
  settings: SiteSettings;
}) {
  let cumulative = 0;
  const segments = industries.map((industry) => {
    const arc = (industry.percentage / 100) * CIRCUMFERENCE;
    const dashoffset = -cumulative;
    cumulative += arc;
    return { ...industry, arc, dashoffset };
  });

  return (
    <section id="about">
      <div className="about-inner">
        <div className="reveal">
          <div className="section-label">Who We Are</div>
          <h2 className="section-title">
            Data intelligence <span className="grad-text">built for your context</span>
          </h2>
          <p className="section-sub">
            We don&apos;t parachute in generic solutions. Stenvis BI is built around the realities of African
            business — inconsistent data infrastructure, mixed-source records, lean teams. We meet you where you are
            and build from there.
          </p>
          <div className="about-features">
            <div className="fi-wrap">
              <div className="fi-icon">🎯</div>
              <div>
                <h4>Industry-Specific Intelligence</h4>
                <p>Every engagement starts with understanding your business model, not adapting a template to it.</p>
              </div>
            </div>
            <div className="fi-wrap">
              <div className="fi-icon">💡</div>
              <div>
                <h4>Enterprise Quality, SME Pricing</h4>
                <p>Top-tier BI without the enterprise price tag. We structure engagements that deliver ROI from week one.</p>
              </div>
            </div>
            <div className="fi-wrap">
              <div className="fi-icon">📈</div>
              <div>
                <h4>Outcome-Tied Delivery</h4>
                <p>
                  Every dashboard and report is mapped to a business metric — revenue growth, churn reduction, or
                  operational efficiency.
                </p>
              </div>
            </div>
          </div>
          <a href="#contact" className="btn-teal" style={{ marginTop: 36 }}>
            Work With Us →
          </a>
        </div>

        <div className="about-visual reveal reveal-delay-2">
          <div style={{ position: 'relative' }}>
            <div className="about-bg-card"></div>
            <div className="about-visual-inner">
              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-sub)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}
              >
                Client Industries
              </div>
              {segments.length > 0 && (
                <>
                  <div className="donut-wrapper">
                    <svg className="donut-svg" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r={RADIUS} fill="none" stroke="var(--bg-alt)" strokeWidth="26" />
                      {segments.map((s) => (
                        <circle
                          key={s.id}
                          cx="80"
                          cy="80"
                          r={RADIUS}
                          fill="none"
                          stroke={s.color}
                          strokeWidth="26"
                          strokeDasharray={`${s.arc} ${CIRCUMFERENCE - s.arc}`}
                          strokeDashoffset={s.dashoffset}
                          transform="rotate(-90 80 80)"
                        />
                      ))}
                      <text
                        x="80"
                        y="75"
                        textAnchor="middle"
                        fontFamily="Syne,sans-serif"
                        fontSize="18"
                        fontWeight="800"
                        fill={segments[0]?.color ?? '#00AD8E'}
                      >
                        {settings.stat_businesses}+
                      </text>
                      <text x="80" y="90" textAnchor="middle" fontSize="8" fill="#8FA3BC" fontWeight="600" letterSpacing="1">
                        CLIENTS
                      </text>
                    </svg>
                  </div>
                  <div className="legend">
                    {segments.map((s) => (
                      <div key={s.id} className="legend-item">
                        <div className="legend-dot" style={{ background: s.color }}></div>
                        <div className="legend-label">{s.label}</div>
                        <div className="legend-val" style={{ color: s.color }}>
                          {s.percentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
