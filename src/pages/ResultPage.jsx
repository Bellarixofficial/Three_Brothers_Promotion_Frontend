import Header from '../components/Header';
import ResultsSection from '../components/ResultsSection';
import Footer from '../components/Footer';
import LeadModal from '../components/LeadModal';

export default function ResultPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '90px', background: 'var(--bg-deep)' }}>
        <ResultsSection />
      </main>
      <Footer />
      <LeadModal />
    </>
  );
}
