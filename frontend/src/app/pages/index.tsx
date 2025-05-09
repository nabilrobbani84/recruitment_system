import Header from '../components/header/page';
import JobRecommendation from '../components/JobRecommendation/page';
import JobCategory from '../components/JobCategory/page';
import ApplicationProcess from '../components/ApplicationsProcess/page';
import ContactForm from '../components/ContactForm/page';
import Footer from '../components/footer/page';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 p-6">
        <section className="text-center py-16 bg-light-gray">
          <h2 className="text-3xl font-semibold mb-4">Temukan tempat kerja yang sesuai dengan passion dan tujuan karir Anda</h2>
          <p className="text-lg mb-4">Temukan semua yang Anda butuhkan tentang perusahaan di sini.</p>
          <input
            type="text"
            placeholder="Cari Perusahaan"
            className="p-3 rounded-md border border-gray-300"
          />
        </section>

        <JobCategory />
        <JobRecommendation />
        <ApplicationProcess />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
