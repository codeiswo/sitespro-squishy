import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import siteSettings from "../config/site-settings.json";
import { getSettings } from "@/lib/db";
import { CartProvider } from "@/components/common/cart-context";
import CartDrawer from "@/components/common/cart-drawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const runtime = "edge";

function getBaseUrl(settings) {
  let domain = settings.site_url || siteSettings.domain || "squishyworld.pages.dev";
  if (!domain.startsWith("http://") && !domain.startsWith("https://")) {
    domain = `https://${domain}`;
  }
  return domain.replace(/\/$/, "");
}

function parseCustomMetaTags(htmlString) {
  if (!htmlString || typeof htmlString !== 'string') return { verification: {}, other: {} };
  const verification = {};
  const other = {};

  const metaTagRegex = /<meta\s+([^>]+)\/?>/gi;
  let match;

  while ((match = metaTagRegex.exec(htmlString)) !== null) {
    try {
      const attrString = match[1];
      const nameMatch = attrString.match(/name\s*=\s*["']([^"']+)["']/i);
      const propMatch = attrString.match(/(?:property|http-equiv)\s*=\s*["']([^"']+)["']/i);
      const contentMatch = attrString.match(/content\s*=\s*["']([^"']+)["']/i);

      const key = (nameMatch && nameMatch[1]) || (propMatch && propMatch[1]);
      const value = contentMatch && contentMatch[1];

      if (key && value) {
        const cleanKey = key.trim();
        const cleanVal = value.trim();
        
        if (cleanKey.toLowerCase().includes('verification') || cleanKey.toLowerCase().includes('validate')) {
          verification[cleanKey] = cleanVal;
        } else {
          other[cleanKey] = cleanVal;
        }
      }
    } catch (_) {}
  }

  return { verification, other };
}

export async function generateMetadata() {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || "NeeDoh Squishy World";
  const defaultTitle = settings.meta_title || siteSettings.seoTitle || "NeeDoh Squishy World | Premium Squishy & Sensory Relief Toys";
  const defaultDescription = settings.meta_description || siteSettings.seoDescription || "Shop authentic NeeDoh Squishies, Nice Cubes, Ice Cubes, and Cheese Squishy sensory stress toys. Super dough-y feel, ASMR approved, non-toxic, and washable.";

  const icons = {};
  if (settings.site_favicon) {
    icons.icon = settings.site_favicon;
    icons.shortcut = settings.site_favicon;
    icons.apple = settings.site_favicon;
  } else {
    icons.icon = "/favicon.ico";
  }

  const customHtmlTags = settings.custom_html_tags || "";
  const { verification: customVerification, other: customOtherMetas } = parseCustomMetaTags(customHtmlTags);

  const metadata = {
    metadataBase: new URL(baseUrl),
    title: {
      default: defaultTitle,
      template: `%s | ${siteName}`,
    },
    description: defaultDescription,
    icons,
    alternates: {
      canonical: baseUrl,
      languages: {
        'en': baseUrl,
        'x-default': baseUrl,
      },
    },
    keywords: [
      "needoh squishy",
      "needoh nice cube",
      "needoh ice cube",
      "cheese squishy",
      "squishy stress toy",
      "sensory fidget toys",
      "asmr squishy",
      "dough squishy ball",
      "stress relief toy",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: baseUrl,
      siteName: siteName,
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: `${siteName} - Premium Squishy & Sensory Relief Toys`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [`${baseUrl}/opengraph-image.png`],
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

  if (Object.keys(customVerification).length > 0) {
    metadata.verification = { other: customVerification };
  }

  if (Object.keys(customOtherMetas).length > 0) {
    metadata.other = customOtherMetas;
  }

  return metadata;
}

export default async function RootLayout({ children }) {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const baseUrl = getBaseUrl(settings);
  const siteName = settings.site_name || siteSettings.siteName || "NeeDoh Squishy World";
  const activeThemeClass = `theme-${settings.site_theme || 'gummy'}`;
  const customHtmlTags = settings.custom_html_tags || '';

  // Organization & WebSite JSON-LD Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": siteName,
        "description": settings.meta_description || siteSettings.seoDescription,
        "publisher": { "@id": `${baseUrl}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": siteName,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon.ico`
        }
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${activeThemeClass}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {customHtmlTags && (
          <script
            id="custom-html-tags-injector"
            dangerouslySetInnerHTML={{
              __html: `(function(){
                try {
                  var temp = document.createElement('div');
                  temp.innerHTML = ${JSON.stringify(customHtmlTags)};
                  Array.from(temp.childNodes).forEach(function(node){
                    if (!node.tagName) return;
                    var tag = node.tagName.toUpperCase();
                    if (tag === 'SCRIPT') {
                      var s = document.createElement('script');
                      Array.from(node.attributes).forEach(function(attr){ s.setAttribute(attr.name, attr.value); });
                      s.appendChild(document.createTextNode(node.innerHTML));
                      document.head.appendChild(s);
                    } else if (tag === 'LINK' || tag === 'STYLE' || tag === 'META') {
                      var elem = node.cloneNode(true);
                      document.head.appendChild(elem);
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
