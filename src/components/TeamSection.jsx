
import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';
import './TeamSection.css';




export default function TeamSection({ apiData, loading }) {

  // Show ALL members (admins + team members) in the Team Section
  const teamMembers = apiData?.teamMember?.length > 0 ? apiData.teamMember.map(m => {
    const links = [];
    if (m.instagramId) {
      links.push({ href: m.instagramId, cls: 'instagram', icon: 'fa-brands fa-instagram', label: 'Instagram' });
    }
    if (m.linkedInId) {
      links.push({ href: m.linkedInId, cls: 'linkedin', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' });
    }
    
    const badges = [];
    if (m.role) {
      badges.push({ label: m.role, cls: 'role-badge' });
    }
    if (m.badge) {
      badges.push({ label: m.badge, cls: 'role-badge expert-badge' });
    }

    return {
      img: m.image,
      alt: m.name,
      badges: badges,
      name: m.name,
      bio: m.desc || '',
      links: links
    };
  }) : [];

  return (
    <div className="about-section-wrapper" id="team">
      <section className="about-team-section">
        <div className="team-bg-grid-wrap">
          <div className="team-bg-grid" />
          <div className="team-bg-glow-spot" />
        </div>

        <ScrollReveal className="about-header">
          <div className="team-badge">MEET THE MINDS</div>
          <h2 className="about-team-title">
            Our <span className="gradient-text">Leadership</span>
          </h2>
          <p className="about-team-subtitle">
            Strategy, creativity, and execution. We are the team behind the screens.
          </p>
        </ScrollReveal>

        <div className="team-container">
          <div className="founders-row">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="member-card founder-card">
                  <div className="avatar-wrapper">
                    <Skeleton type="circle" width="150px" height="150px" />
                  </div>
                  <div className="badges-row">
                    <Skeleton width="80px" height="1.5em" />
                    <Skeleton width="120px" height="1.5em" />
                  </div>
                  <Skeleton width="150px" height="1.5em" style={{ marginTop: '15px' }} />
                  <Skeleton type="text" width="90%" style={{ marginTop: '10px' }} />
                  <Skeleton type="text" width="80%" />
                  <div className="social-links-team">
                    <Skeleton width="100px" height="2.5em" />
                    <Skeleton width="100px" height="2.5em" />
                  </div>
                </div>
              ))
            ) : teamMembers.map((f, i) => (
              <ScrollReveal key={f.name || i} style={{ display: 'flex', justifyContent: 'center' }} delay={i * 150}>
                <div className="member-card founder-card" style={{ width: '100%' }}>
                  <div className="avatar-wrapper">
                    <div className="founder-ring" />
                    <img src={f.img} alt={f.alt} className="avatar-img" decoding="async" />
                  </div>
                  <div className="badges-row">
                    {f.badges.map((b) => (
                      <span key={b.label} className={b.cls}>{b.label}</span>
                    ))}
                  </div>
                  <h3 className="member-name">{f.name}</h3>
                  <div className="member-bio" dangerouslySetInnerHTML={{ __html: f.bio || '' }} />
                  <div className="social-links-team">
                    {f.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={`social-btn ${l.cls}`}>
                        <i className={l.icon} /> {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
