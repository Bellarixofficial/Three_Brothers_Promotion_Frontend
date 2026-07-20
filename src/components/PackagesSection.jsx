
import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';
import './PackagesSection.css';

export default function PackagesSection({ apiData, loading, heroData }) {

  const phone = heroData?.whatsappNumber ? heroData.whatsappNumber.replace(/\D/g, '') : '917020061418';

  const getWaUrl = (heading) => {
    const isMentorship = heading.toLowerCase().includes('mentorship');
    const msg = isMentorship 
      ? 'Hi, I would like to book a 1:1 Mentorship Session with Vibhav Raj.' 
      : `Hi, I'm interested in the ${heading} package.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const getDynamicWaUrl = (p) => {
    const msg = `Hi, I want to know more about the "${p.heading}" plan (Price: ₹${p.price}, Tagline: ${p.desc}). I'd like to explore this plan.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const hasDynamicPackages = apiData?.packData?.length > 0;

  return (
    <div className="packages-section-wrapper" id="packages">
      <section className="packages-section">
        <div className="packages-glow glow-center" />

        <ScrollReveal className="packages-header">
          <div className="packages-badge">
            {loading ? <Skeleton width="120px" height="1em" /> : (apiData?.packTag || '')}
          </div>
          <h2 className="packages-title">
            {loading ? (
              <Skeleton width="60%" height="1.5em" />
            ) : apiData?.heading1 ? (
              <>
                {apiData.heading1} <span className="gradient-text">{apiData.heading2}</span>
              </>
            ) : null}
          </h2>
            {loading ? <Skeleton width="80%" /> : (apiData?.desc || '')}
        </ScrollReveal>

        <div className="packages-row">
          {loading ? (
            Array(2).fill(0).map((_, i) => (
              <div key={i} className="package-card">
                <Skeleton width="60%" height="1.5em" style={{ marginBottom: '20px' }} />
                <Skeleton width="40%" height="2em" style={{ marginBottom: '20px' }} />
                <Skeleton type="text" width="80%" />
                <Skeleton type="text" width="90%" />
                <div className="package-line" style={{ margin: '20px 0' }} />
                <Skeleton type="text" width="100%" />
                <Skeleton type="text" width="100%" />
                <Skeleton type="text" width="100%" />
                <Skeleton type="btn" style={{ marginTop: 'auto' }} />
              </div>
            ))
          ) : hasDynamicPackages ? (
            apiData.packData.map((p, i) => (
              <ScrollReveal key={i} style={{ flex: 1, minWidth: '320px', maxWidth: '400px', display: 'flex' }} delay={i * 150}>
                <div className={`package-card ${p.badge ? 'featured' : ''}`} style={{ width: '100%' }}>
                  {p.badge && <div className="package-tag tag-popular">{p.badge}</div>}
                  <div className="package-name">{p.heading}</div>
                  <div className="package-price">₹
                    {p.price.split('/').map((part, pi) => (
                      pi === 0 ? part : <span key={pi}>/{part}</span>
                    ))}
                  </div>
                  <p className="package-desc">{p.desc}</p>
                  <div className="package-line" />

                  {p.guaranteeTitle && (
                    <div className="guarantee-box">
                      <div className="guarantee-title"><i className="fa-solid fa-shield-check" /> {p.guaranteeTitle}</div>
                      <div className="guarantee-text">{p.guaranteeText}</div>
                    </div>
                  )}

                  {p.tag1 && <div className="highlight-text">{p.tag1}</div>}
                  <ul className="package-features">
                    {(p.points || []).map((feat, fi) => (
                      <li key={fi}><i className="fa-solid fa-check" />
                        <span dangerouslySetInnerHTML={{ __html: feat }} />
                      </li>
                    ))}
                  </ul>
                  {p.tag2 && (
                    <div className="highlight-text" style={{ marginTop: 'auto' }}>
                      <span dangerouslySetInnerHTML={{ __html: p.tag2.replace(/\\n/g, '<br/>') }} />
                    </div>
                  )}
                  <a href={getDynamicWaUrl(p)} target="_blank" rel="noopener noreferrer" className={`package-btn ${p.badge ? 'btn-filled' : 'btn-outline'}`}>
                    {p.btnName || 'Get Started'}
                  </a>
                </div>
              </ScrollReveal>
            ))
          ) : null}
        </div>
      </section>
    </div>
  );
}
