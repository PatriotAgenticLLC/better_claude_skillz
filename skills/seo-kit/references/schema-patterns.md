# Schema Markup Patterns (JSON-LD)

> Originally created by [AAA Accelerator](https://aaaaccelerator.com).
> v2 enhanced by Nick Martin, [PatriotAgentic LLC](https://patriotagentic.com).

Reference for generating schema.org JSON-LD objects. All schemas are injected as `<script type="application/ld+json">` in `<head>`.

## Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://__DOMAIN__/#organization",
  "name": "__BUSINESS_NAME__",
  "url": "https://__DOMAIN__",
  "description": "__DESCRIPTION__",
  "founder": {
    "@type": "Person",
    "name": "__FOUNDER_NAME__",
    "jobTitle": "__FOUNDER_TITLE__"
  },
  "foundingDate": "__YEAR__",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "__STREET__",
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
  "sameAs": ["__LINKEDIN_URL__", "__TWITTER_URL__"]
}
```

## LocalBusiness / ProfessionalService

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://__DOMAIN__/#localbusiness",
  "name": "__BUSINESS_NAME__",
  "url": "https://__DOMAIN__",
  "description": "__DESCRIPTION__",
  "address": { "...same as Organization..." },
  "geo": { "@type": "GeoCoordinates", "latitude": __LAT__, "longitude": __LNG__ },
  "telephone": "__PHONE_E164__",
  "email": "__EMAIL__",
  "priceRange": "__PRICE_RANGE__",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "__OPEN__",
    "closes": "__CLOSE__"
  }],
  "areaServed": [
    { "@type": "Country", "name": "__COUNTRY__" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "__CATALOG_NAME__",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "__SERVICE_NAME__",
          "description": "__SERVICE_DESC__"
        }
      }
    ]
  }
}
```

## Person

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://__DOMAIN__/__TEAM_PATH__#__SLUG__",
  "name": "__PERSON_NAME__",
  "jobTitle": "__JOB_TITLE__",
  "worksFor": {
    "@type": "Organization",
    "@id": "https://__DOMAIN__/#organization",
    "name": "__BUSINESS_NAME__"
  },
  "url": "https://__DOMAIN__/__TEAM_PATH__",
  "knowsAbout": ["__SKILL_1__", "__SKILL_2__"],
  "sameAs": ["__LINKEDIN_URL__"]
}
```

## FAQPage

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "__QUESTION__",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "__ANSWER__ (under 300 words for rich result eligibility)"
      }
    }
  ]
}
```

Generate 3-5 FAQs per page. Source from service descriptions, pricing, process, and common objections.

## BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://__DOMAIN__" },
    { "@type": "ListItem", "position": 2, "name": "__PAGE_NAME__", "item": "https://__DOMAIN__/__PATH__" }
  ]
}
```

Every page should have breadcrumbs. Depth matches the URL hierarchy.

## WebApplication (SaaS / AI Products)

Use for browser-accessed SaaS products, AI tools, and web apps. Best fit for products like chatbots, dashboards, and online tools.

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://__DOMAIN__/#webapp",
  "name": "__APP_NAME__",
  "url": "https://__DOMAIN__",
  "description": "__APP_DESCRIPTION__",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "__PRICE__",
    "priceCurrency": "USD",
    "availability": "https://schema.org/OnlineOnly"
  },
  "featureList": ["__FEATURE_1__", "__FEATURE_2__", "__FEATURE_3__"],
  "screenshot": "https://__DOMAIN__/screenshot.png",
  "creator": {
    "@type": "Organization",
    "@id": "https://__DOMAIN__/#organization"
  }
}
```

**Application categories:** `BusinessApplication`, `CommunicationApplication`, `ProductivityApplication`, `DeveloperApplication`, `UtilitiesApplication`

## Product (with Multi-Typing)

Use when you want to leverage Product rich results (pricing, reviews, availability). Can be multi-typed with WebApplication for SaaS products.

```json
{
  "@context": "https://schema.org",
  "@type": ["Product", "WebApplication"],
  "@id": "https://__DOMAIN__/#product",
  "name": "__PRODUCT_NAME__",
  "url": "https://__DOMAIN__",
  "description": "__PRODUCT_DESCRIPTION__",
  "brand": {
    "@type": "Organization",
    "@id": "https://__DOMAIN__/#organization"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "__LOW_PRICE__",
    "highPrice": "__HIGH_PRICE__",
    "priceCurrency": "USD",
    "offerCount": "__PLAN_COUNT__",
    "availability": "https://schema.org/OnlineOnly"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "__RATING__",
    "reviewCount": "__REVIEW_COUNT__"
  },
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All"
}
```

**Note on multi-typing:** Using `"@type": ["Product", "WebApplication"]` lets you leverage properties from both types. This makes your listing eligible for Product rich results while accurately describing a web application.

## HowTo (Tutorials / Guides)

Use on tutorial pages, setup guides, and process documentation. AI search engines particularly value HowTo schema.

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "__GUIDE_TITLE__",
  "description": "__GUIDE_DESCRIPTION__",
  "totalTime": "PT__MINUTES__M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "__STEP_1_TITLE__",
      "text": "__STEP_1_DESCRIPTION__",
      "url": "https://__DOMAIN__/__GUIDE_PATH__#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "__STEP_2_TITLE__",
      "text": "__STEP_2_DESCRIPTION__",
      "url": "https://__DOMAIN__/__GUIDE_PATH__#step-2"
    }
  ]
}
```

## Route-to-Schema Mapping

| Route Pattern | Schemas |
|---------------|---------|
| `/` (homepage) | Organization + LocalBusiness + Breadcrumb |
| `/about` | Organization + FAQ + Breadcrumb |
| `/services` | FAQ (service questions) + Breadcrumb |
| `/services/*` | Breadcrumb (Services > Specific Service) |
| `/team` or `/our-team` | Person (each team member) + Breadcrumb |
| `/team/*` | Person (individual) + Breadcrumb |
| `/contact` | Breadcrumb |
| `/blog` | Breadcrumb |
| `/blog/*` | Breadcrumb (Blog > Post Title) |
| `/case-studies` | Breadcrumb |
| `/pricing` | Product + AggregateOffer + Breadcrumb |
| `/demo` | WebApplication + Breadcrumb |
| `/use-cases` | FAQ + Breadcrumb |
| `/use-cases/*` | HowTo + Breadcrumb |
| `/docs` or `/guides` | Breadcrumb |
| `/docs/*` or `/guides/*` | HowTo + Breadcrumb |

Implement via `getSchemasForPath(pathname)` function in the Worker, returning an array of schema objects per path.

## SaaS Business Recommendations

For a typical SaaS or AI product site:

1. **Homepage:** Organization + LocalBusiness (if physical location) + WebApplication + Breadcrumb
2. **Pricing page:** Product (multi-typed with WebApplication) + AggregateOffer + FAQ + Breadcrumb
3. **Demo/app page:** WebApplication + Breadcrumb
4. **Use case pages:** HowTo + FAQ + Breadcrumb
5. **Blog/guides:** HowTo (for tutorials) + Breadcrumb
6. **About page:** Organization + Person (founders) + FAQ + Breadcrumb

**Limit to 1-2 primary schema types per page** plus Breadcrumb. Too many schemas dilute signal clarity.
