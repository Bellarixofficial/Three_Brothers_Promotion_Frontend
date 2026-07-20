

import Skeleton from './Skeleton';
import './FaqSection.css';

export default function FaqSection({ apiData, loading }) {
  const activeFaqs = apiData?.faqData?.length > 0
    ? apiData.faqData.map((f) => ({
        q: f.que,
        a: f.ans
      }))
    : [];

  return (
    <div className="faq-section-wrapper" id="faq">
      <section className="faq-section">
        <div className="faq-glow faq-glow-left" />
        <div className="faq-glow faq-glow-right" />

        <div className="faq-header">
          <div className="faq-badge">
            {loading ? <Skeleton width="120px" height="1em" /> : (apiData?.faqTag || '')}
          </div>
          <h2 className="faq-title">
            {loading ? (
              <Skeleton width="60%" height="1.5em" />
            ) : apiData?.heading1 ? (
              <>
                {apiData.heading1} <span className="gradient-text">{apiData.heading2}</span>
              </>
            ) : null}
          </h2>
          <p className="faq-desc">
            {loading ? <Skeleton width="80%" /> : (apiData?.desc || '')}
          </p>
        </div>

        <div className="faq-container">
          {loading ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="faq-item" style={{ padding: '20px' }}>
                <Skeleton width="90%" height="1.2em" />
              </div>
            ))
          ) : activeFaqs.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>
                {item.q}
                <div className="faq-icon"><i className="fa-solid fa-chevron-down" /></div>
              </summary>
              <div className="faq-content">
                {typeof item.a === 'string' && item.a.includes('<span') ? (
                  <span dangerouslySetInnerHTML={{ __html: item.a }} />
                ) : (
                  item.a
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
