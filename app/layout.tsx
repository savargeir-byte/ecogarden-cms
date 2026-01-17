import AdminEditButton from "@/components/admin/AdminEditButton";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Eco Garden",
  description: "Vistvænar lausnir fyrir garð og ræktun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="is" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        {/* Announcement Banner */}
        <AnnouncementBanner />
        
        {/* Navbar with Hamburger Menu */}
        <Navbar />

        <main className="flex-1">{children}</main>

        <footer className="bg-gray-900 text-white mt-8">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <h3 className="text-base font-bold mb-2">Eco Garden</h3>
                <p className="text-gray-400 text-xs">Vistvænar lausnir fyrir garð og ræktun</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-xs">Flýtileiðir</h4>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li><a href="/" className="hover:text-white transition">Heim</a></li>
                  <li><a href="/products" className="hover:text-white transition">Vörur</a></li>
                  <li><a href="/about" className="hover:text-white transition">Um okkur</a></li>
                  <li><a href="/contact" className="hover:text-white transition">Hafa samband</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-xs">Hafðu samband</h4>
                <p className="text-gray-400 text-xs">Sendu okkur skilboð</p>
                <a href="/contact" className="inline-block mt-2 px-4 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition">
                  Hafa samband
                </a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-5 pt-4 text-center text-gray-400 text-xs">
              © 2024 Eco Garden. Allur réttur áskilinn.
            </div>
          </div>
        </footer>

        {/* Admin edit button - only visible to authenticated admins */}
        <AdminEditButton />
      </body>
    </html>
  );
}
