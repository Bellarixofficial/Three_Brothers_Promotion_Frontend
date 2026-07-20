import { useState, useEffect } from 'react';
import { api } from '../services/api';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ResultsSection from '../components/ResultsSection';
import ProtocolSection from '../components/ProtocolSection';
import PackagesSection from '../components/PackagesSection';
import FaqSection from '../components/FaqSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TeamSection from '../components/TeamSection';
import ContactSection from '../components/ContactSection';
import LeadModal from '../components/LeadModal';
import Footer from '../components/Footer';
import TopBanner from '../components/TopBanner';

export default function HomePage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState({
    topBanner: true,
    heroSection: true,
    statsSection: true,
    resultSection: true,
    protocolSection: true,
    packagesSection: true,
    faqSection: true,
    contactSection: true,
  });

  useEffect(() => {
    const fetchSequentially = async () => {
      try {
        let res = await api.getSectionData('top-banner');
        setData(prev => ({ ...prev, topBanner: res }));
        setLoading(prev => ({ ...prev, topBanner: false }));

        res = await api.getSectionData('hero-section');
        setData(prev => ({ ...prev, heroSection: res }));
        setLoading(prev => ({ ...prev, heroSection: false }));

        res = await api.getSectionData('stat-section');
        setData(prev => ({ ...prev, statsSection: res }));
        setLoading(prev => ({ ...prev, statsSection: false }));

        res = await api.getSectionData('result-section');
        setData(prev => ({ ...prev, resultSection: res }));
        setLoading(prev => ({ ...prev, resultSection: false }));

        res = await api.getSectionData('protocol-section');
        setData(prev => ({ ...prev, protocolSection: res }));
        setLoading(prev => ({ ...prev, protocolSection: false }));

        res = await api.getSectionData('package-section');
        setData(prev => ({ ...prev, packagesSection: res }));
        setLoading(prev => ({ ...prev, packagesSection: false }));

        res = await api.getSectionData('faqs-section');
        setData(prev => ({ ...prev, faqSection: res }));
        setLoading(prev => ({ ...prev, faqSection: false }));

        res = await api.getSectionData('contact-section');
        setData(prev => ({ ...prev, contactSection: res }));
        setLoading(prev => ({ ...prev, contactSection: false }));
      } catch (err) {
        console.error("Error fetching sequential data:", err);
      }
    };
    fetchSequentially();
  }, []);

  return (
    <>
      <Header />
      <main>
        <TopBanner apiData={data.topBanner} loading={loading.topBanner} heroData={data.heroSection} />
        <HeroSection apiData={data.heroSection} loading={loading.heroSection} />
        <StatsSection apiData={data.statsSection} loading={loading.statsSection} />
        <ResultsSection limit={6} apiData={data.resultSection} loading={loading.resultSection} />
        <ProtocolSection apiData={data.protocolSection} loading={loading.protocolSection} />
        <PackagesSection apiData={data.packagesSection} loading={loading.packagesSection} heroData={data.heroSection} />
        <FaqSection apiData={data.faqSection} loading={loading.faqSection} />
        <TestimonialsSection />
        <TeamSection apiData={data.heroSection} loading={loading.heroSection} />
        <ContactSection apiData={data.contactSection} loading={loading.contactSection} heroData={data.heroSection} />
      </main>
      <Footer />
      <LeadModal />
    </>
  );
}
