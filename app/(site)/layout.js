import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import ScrollToTop from "@/components/common/scroll-to-top";
import { getSettings } from "@/lib/db";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }) {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  return (
    <>
      <Navbar settings={settings} />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer settings={settings} />
      <ScrollToTop />
    </>
  );
}
