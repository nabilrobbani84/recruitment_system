import Link from 'next/link';
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 RecruitEasy. All Rights Reserved.</p>
        <p className="mt-4">
          <Link href="/terms" className="hover:text-orange-500">Terms & Conditions</Link> | 
          <Link href="/privacy" className="hover:text-orange-500"> Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
