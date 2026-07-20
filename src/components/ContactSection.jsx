import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';
import './ContactSection.css';

const WA_URL = 'https://wa.me/917020061418';

const PARTICLES = [
  { left: '10%', animationDelay: '0s' },
  { left: '25%', animationDelay: '4s' },
  { left: '40%', animationDelay: '7s' },
  { left: '65%', animationDelay: '2s' },
  { left: '82%', animationDelay: '9s' },
];

export default function ContactSection({ apiData, loading, heroData }) {
  const whatsappUrl = heroData?.whatsappUrl || '';
  const whatsappNumber = heroData?.whatsappNumber || '';

  return (
    <div className="contact-section-wrapper" id="contact">
      <div className="contact-grid-proof">
        <div className="contact-bg-grid-wrap">
          <div className="contact-bg-grid" />
          <div className="contact-bg-glow" />
        </div>

        {PARTICLES.map((p, i) => (
          <div key={i} className="contact-particle" style={{ left: p.left, animationDelay: p.animationDelay }} />
        ))}

        <div className="contact-grid">
          <ScrollReveal delay={0}>
            <div className="img-wrap">
              {loading ? (
                <Skeleton type="rect" height="400px" />
              ) : (
                <img src={apiData?.image} alt="Contact Three Brothers Promotion" decoding="async" />
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal className="contact-text" delay={150}>
            <div className="contact-badge">
              {loading ? <Skeleton width="100px" height="1em" /> : (apiData?.contactTag || '')}
            </div>
            <h2>
              {loading ? (
                <Skeleton width="60%" height="1.5em" />
              ) : apiData?.heading1 ? (
                <>
                  {apiData.heading1} <span className="gradient-text">{apiData.heading2}</span>
                </>
              ) : null}
            </h2>
            <div style={{ marginBottom: '20px' }}>
              {loading ? (
                <>
                  <Skeleton type="text" width="90%" />
                  <Skeleton type="text" width="80%" />
                  <Skeleton type="text" width="85%" />
                </>
              ) : (
                <p>
                  {apiData?.desc1 ? (
                    apiData.desc1.includes('<strong>') ? (
                      <span dangerouslySetInnerHTML={{ __html: apiData.desc1 }} />
                    ) : (
                      apiData.desc1
                    )
                  ) : null}
                  {apiData?.desc2 && (
                    <>
                      <br /><br />
                      {apiData.desc2.includes('<strong>') ? (
                        <span dangerouslySetInnerHTML={{ __html: apiData.desc2 }} />
                      ) : (
                        apiData.desc2
                      )}
                    </>
                  )}
                </p>
              )}
            </div>
            {loading ? (
              <Skeleton type="btn" width="200px" />
            ) : (
              <a href={whatsappUrl || WA_URL} className="wa-btn" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp
              </a>
            )}
            <div className="contact-note">
              {loading ? (
                <Skeleton width="150px" height="1em" />
              ) : (
                <>
                  <i className="fa-brands fa-whatsapp" /> WhatsApp: <strong>{whatsappNumber}</strong>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
