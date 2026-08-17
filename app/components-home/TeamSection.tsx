import type { TeamMember } from '@/lib/content/types';

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#00AD8E,#3B6EEA)',
  'linear-gradient(135deg,#F59E0B,#EF4444)',
  'linear-gradient(135deg,#7C3AED,#00AD8E)',
  'linear-gradient(135deg,#3B6EEA,#7C3AED)',
];

export default function TeamSection({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;

  return (
    <section id="team">
      <div className="team-inner">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            The Team
          </div>
          <h2 className="section-title">
            Experts who <span className="grad-text">live in the data</span>
          </h2>
          <p className="section-sub" style={{ margin: '14px auto 0' }}>
            Senior practitioners — not junior analysts. Every engagement is handled by people who have done this
            before.
          </p>
        </div>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={member.id} className={`team-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ''}`}>
              <div className="team-avatar-wrap">
                <div className="team-avatar" style={{ background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] }}>
                  {member.avatar_initials}
                </div>
                <div className="team-ring"></div>
              </div>
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <div className="team-bio">{member.bio}</div>
              <div className="team-skills">
                {member.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
