import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import siteSettings from "../config/site-settings.json";
import { getSettings } from "@/lib/db";
import { CartProvider } from "@/components/common/cart-context";
import CartDrawer from "@/components/common/cart-drawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const runtime = "edge";



function parseCustomMetaTags(htmlString) {
  if (!htmlString) return {};
  const otherObj = {};

  const metaNameContent = /<meta\s+[^>]*name=["']([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*\/?>/gi;
  let match;
  while ((match = metaNameContent.exec(htmlString)) !== null) {
    if (match[1] && match[2]) {
      otherObj[match[1]] = match[2];
    }
  }

  const metaContentName = /<meta\s+[^>]*content=["']([^"']+)["'][^>]*name=["']([^"']+)["'][^>]*\/?>/gi;
  while ((match = metaContentName.exec(htmlString)) !== null) {
    if (match[1] && match[2]) {
      otherObj[match[2]] = match[1];
    }
  }

  const metaPropContent = /<meta\s+[^>]*property=["']([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*\/?>/gi;
  while ((match = metaPropContent.exec(htmlString)) !== null) {
    if (match[1] && match[2]) {
      otherObj[match[1]] = match[2];
    }
  }

  return otherObj;
}

export async function generateMetadata() {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const siteName = settings.site_name || siteSettings.siteName || "FiltersPro";
  const defaultTitle = settings.meta_title || siteSettings.seoTitle || "FiltersPro - Premium Refrigerator Water Filter Replacements";
  const defaultDescription = settings.meta_description || siteSettings.seoDescription || "Shop premium refrigerator water filter replacements for Samsung, GE, LG, Whirlpool & more. NSF certified, easy installation, up to 60% savings vs OEM. Free shipping on orders over $35.";

  const icons = {};
  if (settings.site_favicon) {
    icons.icon = settings.site_favicon;
    icons.shortcut = settings.site_favicon;
    icons.apple = settings.site_favicon;
  } else {
    icons.icon = "/favicon.ico";
  }

  const customHtmlTags = settings.custom_html_tags || "";
  const customOtherMetas = parseCustomMetaTags(customHtmlTags);

  return {
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    icons,
    other: {
      ...customOtherMetas,
    },
    keywords: [
      "refrigerator water filter replacement",
      "water filter replacement",
      "refrigerator water filter",
      "samsung water filter",
      "ge water filter",
      "lg water filter",
      "whirlpool water filter",
      "fridge water filter",
      "water filter cartridge",
      "NSF certified water filter",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: `https://www.${siteSettings.domain || "filterspro.com"}`,
      siteName: siteName,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: `${siteName} - Premium Water Filter Replacements`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: ["/opengraph-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children }) {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const activeThemeClass = `theme-${settings.site_theme || 'default'}`;
  const customHtmlTags = settings.custom_html_tags || '';

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${activeThemeClass}`}>
      <head>
        {customHtmlTags && (
          <script
            id="custom-html-tags-injector"
            dangerouslySetInnerHTML={{
              __html: `(function(){
                try {
                  var temp = document.createElement('div');
                  temp.innerHTML = ${JSON.stringify(customHtmlTags)};
                  Array.from(temp.childNodes).forEach(function(node){
                    if (node.tagName === 'SCRIPT') {
                      var s = document.createElement('script');
                      Array.from(node.attributes).forEach(function(attr){ s.setAttribute(attr.name, attr.value); });
                      s.appendChild(document.createTextNode(node.innerHTML));
                      document.head.appendChild(s);
                    } else if (node.tagName === 'LINK' || node.tagName === 'STYLE') {
                      document.head.appendChild(node.cloneNode(true));
                    }
                  });
                } catch(e){}
              })();`
            }}
          />
        )}
      </head>
      <body className="font-body antialiased">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
