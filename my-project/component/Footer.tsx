"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1e1e2f] text-white py-16">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Logo and Main Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center space-x-4 mb-8 md:mb-0">
            <img src="/logo.png" alt="RecruitEasy Logo" className="h-12" />
            <p className="font-semibold text-lg">RecruitEasy</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-green-500">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Untuk Pencari Kerja</h3>
            <ul>
              <li><a href="/jobs" className="hover:text-green-500">Lowongan Kerja</a></li>
              <li><a href="/about" className="hover:text-green-500">Perusahaan</a></li>
              <li><a href="/blog" className="hover:text-green-500">Blog</a></li>
              <li><a href="/help" className="hover:text-green-500">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Untuk Pemberi Kerja</h3>
            <ul>
              <li><a href="/recruitment" className="hover:text-green-500">RecruitEasy Platform</a></li>
              <li><a href="/hr-tips" className="hover:text-green-500">HR Tips</a></li>
              <li><a href="/post-job" className="hover:text-green-500">Post a Job</a></li>
              <li><a href="/manage-job" className="hover:text-green-500">Manage Jobs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Perusahaan</h3>
            <ul>
              <li><a href="/about-us" className="hover:text-green-500">Tentang Kami</a></li>
              <li><a href="/privacy-policy" className="hover:text-green-500">Privasi</a></li>
              <li><a href="/terms" className="hover:text-green-500">Syarat dan Ketentuan</a></li>
              <li><a href="/careers" className="hover:text-green-500">Karir</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Us */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-sm mb-4">Contact Us</p>
          <p className="text-sm">4517 Washington Ave. Manchester, Kentucky 39495</p>
          <p className="text-sm">Phone: +6285777659082</p>
          <p className="text-sm">Opening Hours: Mon - Sat, 10:00 AM - 4:00 PM</p>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6">
          <p className="text-sm">&copy; 2025 PT. RecruitEasy Indonesia Group</p>
        </div>
      </div>
    </footer>
  );
}
