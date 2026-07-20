import { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';
import './StatsSection.css';

export default function StatsSection({ apiData, loading }) {

  return (
    <section className="two-day-section" id="stats">
      <div className="glow-spot glow-left" />
      <div className="glow-spot glow-right" />

      <div className="stats-container">
        <ScrollReveal className="text-content">
          <div className="stats-highlight-box">
            {loading ? (
              <Skeleton width="150px" height="1em" />
            ) : (
              <>
                <i className={apiData?.statIcon || "fa-solid fa-rocket"} /> &nbsp;
                {apiData?.statTag || ''}
              </>
            )}
          </div>
          <h2>
            {loading ? <Skeleton width="80%" height="1.5em" /> : (apiData?.heading || '')}
          </h2>
          <p className="sub-heading">
            {loading ? <Skeleton width="60%" /> : (apiData?.subHeading1 || '')}
          </p>
          <p className="sub-heading" style={{ marginTop: '15px' }}>
            {loading ? (
              <Skeleton width="90%" />
            ) : apiData?.subHeading2 ? (
              <strong>{apiData.subHeading2}</strong>
            ) : null}
          </p>
        </ScrollReveal>

        <div className="stats-deck">
          {/* Card 1: Revenue */}
          <ScrollReveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} delay={0}>
            <div className="glass-card stat-card-side purple">
              {loading ? (
                <div style={{ width: '100%' }}>
                  <Skeleton width="60%" height="2em" style={{ marginBottom: '10px' }} />
                  <Skeleton width="40%" height="1em" />
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="stat-value">{apiData?.card1?.field1 || ''}</h4>
                    <p className="stat-label">{apiData?.card1?.field2 || ''}</p>
                  </div>
                  <i className={`${apiData?.card1?.field3 || 'fa-solid fa-dollar-sign'} icon-float`} style={{ color: '#fbbf24' }} />
                  <svg className="sparkline" viewBox="0 0 100 40">
                    <path d="M0 30 Q 20 25 40 10 T 80 15 T 100 5" stroke="#c084fc" />
                  </svg>
                </>
              )}
            </div>
          </ScrollReveal>

          {/* Card 2: Followers (Center Hero) */}
          <ScrollReveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} delay={150}>
            <div className="glass-card stat-card-center">
              <div className="progress-ring">
                <div className="stat-text-center">
                  {loading ? (
                    <>
                      <Skeleton width="80px" height="2em" style={{ marginBottom: '5px' }} />
                      <Skeleton width="60px" height="1em" />
                    </>
                  ) : (
                    <>
                      <h3>{apiData?.card2?.field1 || ''}</h3>
                      <p>{apiData?.card2?.field2 || ''}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Views */}
          <ScrollReveal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} delay={300}>
            <div className="glass-card stat-card-side blue">
              {loading ? (
                <div style={{ width: '100%' }}>
                  <Skeleton width="60%" height="2em" style={{ marginBottom: '10px' }} />
                  <Skeleton width="40%" height="1em" />
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="stat-value">{apiData?.card3?.field1 || ''}</h4>
                    <p className="stat-label">{apiData?.card3?.field2 || ''}</p>
                  </div>
                  <i className={`${apiData?.card3?.field3 || 'fa-solid fa-eye'} icon-float`} style={{ color: '#22d3ee' }} />
                  <svg className="sparkline" viewBox="0 0 100 40">
                    <path d="M0 35 Q 25 30 50 15 T 100 10" stroke="#22d3ee" />
                  </svg>
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
