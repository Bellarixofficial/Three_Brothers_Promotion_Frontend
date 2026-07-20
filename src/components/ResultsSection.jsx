import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';
import ScrollReveal from './ScrollReveal';
import './ResultsSection.css';


export default function ResultsSection({ limit, apiData, loading }) {
  const clientsData = apiData?.clients?.length > 0 ? apiData.clients : [];
  const slicedClients = limit ? clientsData.slice(-limit) : clientsData;

  const activeCards = slicedClients.map((c, i) => ({
    img: c.image || c.img,
    tag: c.name || c.tag,
    tagClass: i % 2 === 0 ? 'tag-months' : 'tag-starting',
    href: c.instagramId || c.href || '#'
  }));

  return (
    <div className="fobet-results-wrapper" id="results">
      <section className="results-section">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <i className="fa-solid fa-star sparkle" />
        <i className="fa-solid fa-star sparkle" />
        <i className="fa-solid fa-star sparkle" />
        <i className="fa-solid fa-star sparkle" />

        <ScrollReveal>
          <div className="results-badge">
            {loading ? <Skeleton width="120px" height="1em" /> : (apiData?.resultTag || '')}
          </div>
          <h2 className="results-title">
            {loading ? (
              <Skeleton width="60%" height="1.5em" />
            ) : apiData?.heading1 ? (
              <>
                {apiData.heading1} <span className="gradient-text">{apiData.heading2}</span>
              </>
            ) : (
              null
            )}
          </h2>
          <p className="results-subtext">
            {loading ? <Skeleton width="80%" /> : (apiData?.desc || '')}
          </p>
        </ScrollReveal>

        <div className="results-grid">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="result-card">
                <Skeleton type="rect" height="400px" />
              </div>
            ))
          ) : activeCards.map((c, i) => (
            <ScrollReveal key={i} delay={(i % 4) * 150}>
              <a
                href={c.href}
                className="result-card"
                target={c.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <div className="result-static">
                  <img src={c.img} alt={`Result ${i + 1}`} className="result-static-img" loading="lazy" />
                  <div className={`card-tag ${c.tagClass}`}>{c.tag}</div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {limit && (
          <Link to="/results" className="many-more-link">
            <p className="many-more-text">
              {loading ? (
                <Skeleton width="150px" height="1em" />
              ) : apiData?.endText ? (
                <>
                  <span className="gradient-text">&amp;</span> {apiData.endText}
                </>
              ) : (
                <>
                  <span className="gradient-text">&amp;</span> Many more
                </>
              )}
            </p>
          </Link>
        )}
      </section>
    </div>
  );
}
