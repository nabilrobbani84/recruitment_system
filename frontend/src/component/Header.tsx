import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-semibold">RecruitEasy</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-orange-500">Home</Link></li>
            <li><Link href="/jobs" className="hover:text-orange-500">Jobs</Link></li>
            <li><Link href="/contact" className="hover:text-orange-500">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
