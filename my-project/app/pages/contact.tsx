import Header from '../../component/Header';
import Footer from '../../component/Footer';
import Form from '../../component/Form';

const Contact = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-10">
        <h2 className="text-3xl font-semibold text-center">Contact Us</h2>
        <Form />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
