export default function About() {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <nav className="bg-indigo-900 text-white p-5">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold">RecruitEasy</div>
          <ul className="flex space-x-6">
            <li><a href="/jobs">Lowongan Kerja</a></li>
            <li><a href="/about">Perusahaan</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/login" className="text-green-500">Login</a></li>
          </ul>
        </div>
      </nav>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Who We Are</h2>
          <p className="text-lg mb-6">
            Selamat datang di RecruitEasy, platform rekrutmen yang mempermudah perusahaan menemukan talenta terbaik di bidang teknologi dan IT.
          </p>
          <div className="text-left max-w-2xl mx-auto">
            <h3 className="font-semibold">Our Services:</h3>
            <ul className="list-disc pl-5">
              <li>Technology Consultancy</li>
              <li>Maintenance And Support</li>
              <li>Requirements Gathering</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 PT. RecruitEasy Indonesia Group</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="/terms" className="text-white">Terms & Conditions</a>
            <a href="/privacy" className="text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
