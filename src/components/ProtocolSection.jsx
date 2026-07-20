import { useEffect, useRef, useState, useMemo } from 'react';
import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';
import './ProtocolSection.css';



export default function ProtocolSection({ apiData, loading }) {
  const containerRef = useRef(null);
  const fillRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const activeSteps = useMemo(() => {
    if (apiData?.protocol?.length > 0) {
      return apiData.protocol.map((p) => ({
        icon: p.icon || 'fa-solid fa-circle-check',
        title: p.heading,
        img: p.image,
        desc: p.desc
      }));
    }
    return [];
  }, [apiData, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const fill = fillRef.current;
      if (!container || !fill) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Logic from Protocol.html
      const startPoint = windowH * 0.6;
      const endPoint = rect.height;

      let scrollY = startPoint - rect.top;

      if (scrollY < 0) scrollY = 0;
      if (scrollY > endPoint) scrollY = endPoint;

      fill.style.height = `${scrollY}px`;

      const items = container.querySelectorAll('.timeline-item');
      let newActive = -1;
      items.forEach((item, i) => {
        const ir = item.getBoundingClientRect();
        const triggerPoint = windowH * 0.7; // Logic from Protocol.html
        if (ir.top < triggerPoint) newActive = i;
      });
      setActiveIdx(newActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Small delay to ensure DOM is updated and measurements are correct
    const timer = setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, [activeSteps]);

  return (
    <section className="timeline-section" id="protocol">
      <div className="timeline-glow glow-top-left" />
      <div className="timeline-glow glow-bottom-right" />

      <ScrollReveal className="timeline-header">
        <div className="timeline-badge">
          {loading ? <Skeleton width="120px" height="1em" /> : (apiData?.protocolTag || '')}
        </div>
        <h2 className="timeline-title">
          {loading ? (
            <Skeleton width="60%" height="1.5em" />
          ) : apiData?.heading1 ? (
            <>
              {apiData.heading1} <span className="gradient-text">{apiData.heading2}</span>
            </>
          ) : null}
        </h2>
        <p className="timeline-desc">
          {loading ? <Skeleton width="80%" /> : (apiData?.desc || '')}
        </p>
      </ScrollReveal>

      <div className="timeline-container" ref={containerRef}>
        <div className="timeline-line-bg" />
        <div className="timeline-line-fill" ref={fillRef} />

        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="timeline-item active">
              <div className="timeline-content-side">
                <Skeleton type="rect" height="150px" />
              </div>
              <div className="timeline-dot" />
              <div className="timeline-empty-side">
                <Skeleton type="rect" height="150px" />
              </div>
            </div>
          ))
        ) : activeSteps.map((step, i) => (
          <div key={i} className={`timeline-item${activeIdx >= i ? ' active' : ''}`}>
            {/* Odd → content left, image right */}
            {i % 2 === 0 ? (
              <>
                <ScrollReveal className="timeline-content-side" delay={0}>
                  <div className="glass-card-tl">
                    <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                    <div className="step-details">
                      <div className="step-icon"><i className={step.icon} /></div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
                <div className="timeline-dot" />
                <ScrollReveal className="timeline-empty-side" delay={150}>
                  <div className="timeline-image-card">
                    <img src={step.img} alt={step.title} loading="lazy" />
                  </div>
                </ScrollReveal>
              </>
            ) : (
              <>
                <ScrollReveal className="timeline-empty-side" delay={0}>
                  <div className="timeline-image-card">
                    <img src={step.img} alt={step.title} loading="lazy" />
                  </div>
                </ScrollReveal>
                <div className="timeline-dot" />
                <ScrollReveal className="timeline-content-side" delay={150}>
                  <div className="glass-card-tl">
                    <div className="step-number">{String(i + 1).padStart(2, '0')}</div>
                    <div className="step-details">
                      <div className="step-icon"><i className={step.icon} /></div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
