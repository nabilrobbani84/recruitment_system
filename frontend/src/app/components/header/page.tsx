export default function Header() {
    return (
      <header className="bg-dark-blue text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Recruiteasy</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#">Lowongan Kerja</a></li>
              <li><a href="#">Perusahaan</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Komunitas</a></li>
              <li><a href="#">Bahasa</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  