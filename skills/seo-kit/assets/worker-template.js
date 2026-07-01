// =============================================================================
// __BUSINESS_NAME__ — Cloudflare Worker (SEO Kit v2)
// Handles: Prerender for bots, static SEO files, schema injection, upstream proxy
// Deploy to: Cloudflare Workers
//
// Originally created by AAA Accelerator (https://aaaaccelerator.com)
// v2 enhanced by Nick Martin, PatriotAgentic LLC (https://patriotagentic.com)
// =============================================================================

// --- Static SEO Files (served directly by the worker) ---

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- __SITEMAP_ENTRIES__: Generate one <url> block per route -->
  <!-- Example:
  <url>
    <loc>https://__DOMAIN__/</loc>
    <lastmod>__DATE__</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  -->
</urlset>`;

const ROBOTS_TXT = `# __BUSINESS_NAME__ — robots.txt

# Search Engines (RECOMMENDED: always allow)
User-agent: Googlebot
User-agent: Bingbot
User-agent: Yandex
User-agent: Baiduspider
User-agent: DuckDuckBot
User-agent: Applebot
Allow: /

# AI Crawlers — __AI_CRAWLER_POLICY__
# TRADE-OFF: Allowing AI crawlers improves visibility in ChatGPT, Perplexity,
# and Claude search results, but content may be used for model training.
# See references/robots-txt-template.md for details.
__AI_CRAWLER_RULES__

# Social / Preview Bots (RECOMMENDED: always allow for link previews)
User-agent: facebookexternalhit
User-agent: Twitterbot
User-agent: LinkedInBot
User-agent: WhatsApp
User-agent: Slackbot
User-agent: Discordbot
User-agent: TelegramBot
Allow: /

# Default policy for unrecognized bots
User-agent: *
Allow: /

Sitemap: https://__DOMAIN__/sitemap.xml

# AI Crawler Info — see https://__DOMAIN__/llms.txt`;

const LLMS_TXT = `# __BUSINESS_NAME__

> __BUSINESS_DESCRIPTION__

## Services
<!-- __SERVICES__: format as "- [Service Name](https://__DOMAIN__/services/slug): Description" -->

## Use Cases
<!-- __USE_CASES__: format as "- [Use Case](https://__DOMAIN__/use-cases/slug): Description" -->

## Key Facts
<!-- __KEY_FACTS__: 3-5 bullet points about the business -->

## Contact
- Website: https://__DOMAIN__
- Email: __EMAIL__
- Phone: __PHONE__
- Book a call: https://__DOMAIN__/__CONTACT_PATH__

## Optional
<!-- __OPTIONAL__: Lower priority resources (blog, legal, changelog, etc.) -->`;

const STATIC_FILES = {
  "/sitemap.xml": { body: SITEMAP_XML, type: "application/xml" },
  "/robots.txt": { body: ROBOTS_TXT, type: "text/plain" },
  "/llms.txt": { body: LLMS_TXT, type: "text/plain" },
};

// --- Schema Markup (JSON-LD) ---
// Replace these with actual business data. See references/schema-patterns.md.

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://__DOMAIN__/#organization",
  "name": "__BUSINESS_NAME__",
  "url": "https://__DOMAIN__",
  "description": "__BUSINESS_DESCRIPTION__",
  "founder": {
    "@type": "Person",
    "name": "__FOUNDER_NAME__",
    "jobTitle": "__FOUNDER_TITLE__"
  },
  "foundingDate": "__FOUNDING_YEAR__",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "__STREET_ADDRESS__",
    "addressLocality": "__CITY__",
    "addressRegion": "__REGION__",
    "postalCode": "__POSTCODE__",
    "addressCountry": "__COUNTRY_CODE__"
  },
  "email": "__EMAIL__",
  "telephone": "__PHONE_E164__",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "__PHONE_E164__",
    "contactType": "customer service",
    "email": "__EMAIL__",
    "availableLanguage": "English"
  },
  "sameAs": [/* "__LINKEDIN_URL__", "__TWITTER_URL__" */]
};

const SCHEMA_LOCAL = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://__DOMAIN__/#localbusiness",
  "name": "__BUSINESS_NAME__",
  "url": "https://__DOMAIN__",
  "description": "__BUSINESS_DESCRIPTION__",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "__STREET_ADDRESS__",
    "addressLocality": "__CITY__",
    "addressRegion": "__REGION__",
    "postalCode": "__POSTCODE__",
    "addressCountry": "__COUNTRY_CODE__"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "__LAT__", "longitude": "__LNG__" },
  "telephone": "__PHONE_E164__",
  "email": "__EMAIL__",
  "priceRange": "__PRICE_RANGE__",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "__OPENS__",
    "closes": "__CLOSES__"
  }],
  "areaServed": [
    /* { "@type": "Country", "name": "__COUNTRY__" } */
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "__CATALOG_NAME__",
    "itemListElement": [
      /* { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "__SERVICE__", "description": "__DESC__" }} */
    ]
  }
};

// __PERSON_SCHEMAS__: Add one const per team member
// const SCHEMA_PERSON_NAME = { "@context": "https://schema.org", "@type": "Person", ... };

// __FAQ_SCHEMAS__: Add one const per page with FAQs
// const SCHEMA_FAQ_PAGENAME = { "@context": "https://schema.org", "@type": "FAQPage", ... };

// __WEBAPP_SCHEMA__: Uncomment and customise for SaaS/AI products
// const SCHEMA_WEBAPP = {
//   "@context": "https://schema.org",
//   "@type": "WebApplication",
//   "@id": "https://__DOMAIN__/#webapp",
//   "name": "__APP_NAME__",
//   "url": "https://__DOMAIN__",
//   "description": "__APP_DESCRIPTION__",
//   "applicationCategory": "BusinessApplication",
//   "operatingSystem": "All",
//   "browserRequirements": "Requires JavaScript",
//   "offers": {
//     "@type": "Offer",
//     "price": "__PRICE__",
//     "priceCurrency": "USD"
//   },
//   "featureList": ["__FEATURE_1__", "__FEATURE_2__"]
// };

// Breadcrumb helper
function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Map paths to their schema arrays
// __SCHEMA_ROUTING__: Customise this for the site's actual routes
function getSchemasForPath(pathname) {
  const path = pathname.toLowerCase().replace(/\/$/, "") || "/";
  const home = { name: "Home", url: "https://__DOMAIN__" };

  switch (path) {
    case "/":
      return [SCHEMA_ORG, SCHEMA_LOCAL, breadcrumb([home])];
    // Add cases for each route — see references/schema-patterns.md for the mapping
    default:
      return [];
  }
}

function buildSchemaScripts(pathname) {
  const schemas = getSchemasForPath(pathname);
  if (schemas.length === 0) return "";
  return schemas
    .map(s => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");
}

class SchemaInjector {
  constructor(pathname) {
    this.schemaHtml = buildSchemaScripts(pathname);
  }
  element(element) {
    if (this.schemaHtml) {
      element.prepend(this.schemaHtml, { html: true });
    }
  }
}

// --- OPTIONAL: Meta Tag Injection ---
// Uncomment the MetaInjector usage in handleRequest() to enable.
// See references/meta-injection-patterns.md for configuration.

// Route-to-meta mapping — customise per site
// function getMetaForPath(pathname) {
//   const path = pathname.toLowerCase().replace(/\/$/, "") || "/";
//   const defaults = {
//     title: "__BUSINESS_NAME__ — __TAGLINE__",
//     description: "__BUSINESS_DESCRIPTION__",
//     image: "https://__DOMAIN__/og-image.png",
//     type: "website",
//   };
//   switch (path) {
//     case "/":
//       return defaults;
//     default:
//       return defaults;
//   }
// }
//
// class MetaInjector {
//   constructor(pathname, domain) {
//     this.meta = getMetaForPath(pathname);
//     this.domain = domain;
//     this.pathname = pathname;
//   }
//   element(element) {
//     const m = this.meta;
//     const url = `https://${this.domain}${this.pathname}`;
//     element.append(`<link rel="canonical" href="${url}" />`, { html: true });
//     element.append(`<meta property="og:title" content="${m.title}" />`, { html: true });
//     element.append(`<meta property="og:description" content="${m.description}" />`, { html: true });
//     element.append(`<meta property="og:image" content="${m.image}" />`, { html: true });
//     element.append(`<meta property="og:url" content="${url}" />`, { html: true });
//     element.append(`<meta property="og:type" content="${m.type}" />`, { html: true });
//     element.append(`<meta name="twitter:card" content="summary_large_image" />`, { html: true });
//     element.append(`<meta name="twitter:title" content="${m.title}" />`, { html: true });
//     element.append(`<meta name="twitter:description" content="${m.description}" />`, { html: true });
//     element.append(`<meta name="twitter:image" content="${m.image}" />`, { html: true });
//   }
// }

// --- Bot Detection ---

const BOT_AGENTS = [
  "googlebot","yahoo! slurp","bingbot","yandex","baiduspider","facebookexternalhit",
  "twitterbot","rogerbot","linkedinbot","embedly","quora link preview","showyoubot",
  "outbrain","pinterest/0.","developers.google.com/+/web/snippet","slackbot","vkshare",
  "w3c_validator","redditbot","applebot","whatsapp","flipboard","tumblr","bitlybot",
  "skypeuripreview","nuzzel","discordbot","google page speed","qwantify","pinterestbot",
  "bitrix link preview","xing-contenttabreceiver","chrome-lighthouse","telegrambot",
  "oai-searchbot","chatgpt","gptbot","claudebot","amazonbot","perplexity",
  "google-inspectiontool","integration-test",
];

const IGNORE_EXTENSIONS = [
  ".js",".css",".xml",".less",".png",".jpg",".jpeg",".gif",".pdf",".doc",".txt",".ico",
  ".rss",".zip",".mp3",".rar",".exe",".wmv",".avi",".ppt",".mpg",".mpeg",".tif",".wav",
  ".mov",".psd",".ai",".xls",".mp4",".m4a",".swf",".dat",".dmg",".iso",".flv",".m4v",
  ".torrent",".woff",".ttf",".svg",".webmanifest",
];

// --- Security Headers ---

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

const HTML_CACHE_HEADERS = {
  ...SECURITY_HEADERS,
  "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
};

// --- Helper ---

function isRedirect(status) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}

function addHeaders(response, headers) {
  const newResp = new Response(response.body, response);
  for (const [key, value] of Object.entries(headers)) {
    newResp.headers.set(key, value);
  }
  return newResp;
}

// --- Entry Point ---

export default {
  async fetch(request, env) {
    try {
      if (!env?.ORIGIN_URL) {
        return new Response("Missing ORIGIN_URL variable", { status: 500 });
      }
      if (!env?.PRERENDER_TOKEN) {
        return new Response("Missing PRERENDER_TOKEN secret", { status: 500 });
      }
      const originUrl = env.ORIGIN_URL;
      if (!originUrl.startsWith("https://")) {
        return new Response("ORIGIN_URL must start with https://", { status: 500 });
      }
      return await handleRequest(request, env);
    } catch (err) {
      console.error(err);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

// --- Request Handler ---

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const PUBLIC_HOST = url.host;
  const pathName = url.pathname.toLowerCase();

  // 1. Serve static SEO files directly
  const staticFile = STATIC_FILES[pathName];
  if (staticFile) {
    return new Response(staticFile.body, {
      status: 200,
      headers: {
        "Content-Type": staticFile.type,
        "Cache-Control": "public, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  // 2. Bot detection
  const userAgent = (request.headers.get("User-Agent") || "").toLowerCase();
  const isPrerender = request.headers.get("X-Prerender");
  const dot = pathName.lastIndexOf(".");
  const extension = dot >= 0 ? pathName.substring(dot).toLowerCase() : "";
  const isBot = BOT_AGENTS.some((bot) => userAgent.includes(bot.toLowerCase()));
  const isGetLike = request.method === "GET" || request.method === "HEAD";
  const isIgnoredExt = extension && IGNORE_EXTENSIONS.includes(extension);

  // 3. Bots -> Prerender (GET/HEAD only, no assets, no loops)
  if (isGetLike && !isPrerender && isBot && !isIgnoredExt) {
    const prerenderUrl = `https://service.prerender.io/${encodeURIComponent(url.href)}`;
    const newHeaders = new Headers(request.headers);
    newHeaders.set("X-Prerender-Token", env.PRERENDER_TOKEN);
    newHeaders.set("X-Prerender-Int-Type", "CloudFlare");
    newHeaders.delete("Host");
    return fetch(new Request(prerenderUrl, {
      headers: newHeaders,
      redirect: "manual",
    }));
  }

  // 4. Everyone else -> upstream
  const upstreamBase = new URL(env.ORIGIN_URL);
  const upstreamUrl = new URL(request.url);
  upstreamUrl.protocol = upstreamBase.protocol;
  upstreamUrl.hostname = upstreamBase.hostname;

  const h = new Headers(request.headers);
  h.set("Host", upstreamBase.hostname);
  h.set("X-Forwarded-Host", PUBLIC_HOST);
  h.set("X-Forwarded-Proto", "https");
  h.delete("cf-connecting-ip");
  h.delete("x-forwarded-for");
  h.delete("forwarded");

  const upstreamReq = new Request(upstreamUrl.toString(), {
    method: request.method,
    headers: h,
    body: isGetLike ? undefined : request.body,
    redirect: "manual",
  });

  const resp = await fetch(upstreamReq);

  // Rewrite redirects to keep users on the public hostname
  if (isRedirect(resp.status)) {
    const loc = resp.headers.get("Location") || "";
    let newLoc = loc.replaceAll(upstreamBase.hostname, PUBLIC_HOST);
    newLoc = newLoc.replace(/^http:\/\//i, "https://");
    const newHeaders = new Headers(resp.headers);
    if (loc) newHeaders.set("Location", newLoc);
    return new Response(resp.body, { status: resp.status, headers: newHeaders });
  }

  // 5. Inject schema markup into HTML responses + add security/cache headers
  const contentType = resp.headers.get("Content-Type") || "";
  if (contentType.includes("text/html") && isGetLike) {
    const schemas = getSchemasForPath(url.pathname);
    if (schemas.length > 0) {
      const transformed = new HTMLRewriter()
        .on("head", new SchemaInjector(url.pathname))
        // OPTIONAL: Uncomment to enable meta tag injection
        // .on("head", new MetaInjector(url.pathname, PUBLIC_HOST))
        .transform(resp);
      return addHeaders(transformed, HTML_CACHE_HEADERS);
    }
    return addHeaders(resp, HTML_CACHE_HEADERS);
  }

  return resp;
}
