# Meta Tag Injection Patterns (Cloudflare HTMLRewriter)

> Originally created by [AAA Accelerator](https://aaaaccelerator.com).
> v2 enhanced by Nick Martin, [PatriotAgentic LLC](https://patriotagentic.com).

Reference for injecting meta tags at the Cloudflare Worker edge using HTMLRewriter. This is an **opt-in** feature — the MetaInjector class is included in worker-template.js but commented out by default.

## When to Use

- Your SPA does **not** set OG/canonical tags client-side (most Lovable/Bolt/React apps don't)
- You want search engines and social platforms to see correct meta tags without waiting for JS execution
- You need per-route canonical URLs to prevent duplicate content issues

## When NOT to Use

- Your SPA already sets OG tags via `react-helmet`, `next/head`, or similar — enabling Worker injection creates **duplicate tags**
- Solution: either remove client-side OG tags or skip Worker injection

## Canonical URL

Prevents duplicate content when the same page is accessible via multiple URLs.

```html
<link rel="canonical" href="https://example.com/services" />
```

**Why it matters for SPAs:** Without server-side canonical tags, search engines may index query-parameter variants (`?ref=...`, `?utm_...`) as separate pages.

**HTMLRewriter pattern:**
```js
element.append(`<link rel="canonical" href="${url}" />`, { html: true });
```

## Open Graph Tags

Control how your pages appear when shared on Facebook, LinkedIn, and other platforms.

```html
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Page description" />
<meta property="og:image" content="https://example.com/og-image.png" />
<meta property="og:url" content="https://example.com/page" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Business Name" />
```

**Recommended og:image dimensions:** 1200x630px (PNG or JPG)

**HTMLRewriter pattern:**
```js
element.append(`<meta property="og:title" content="${meta.title}" />`, { html: true });
element.append(`<meta property="og:description" content="${meta.description}" />`, { html: true });
element.append(`<meta property="og:image" content="${meta.image}" />`, { html: true });
element.append(`<meta property="og:url" content="${url}" />`, { html: true });
element.append(`<meta property="og:type" content="${meta.type}" />`, { html: true });
```

## Twitter Card Tags

Control how your pages appear when shared on X (Twitter).

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Page description" />
<meta name="twitter:image" content="https://example.com/og-image.png" />
```

**Card types:** `summary` (small image), `summary_large_image` (large image — recommended)

**HTMLRewriter pattern:**
```js
element.append(`<meta name="twitter:card" content="summary_large_image" />`, { html: true });
element.append(`<meta name="twitter:title" content="${meta.title}" />`, { html: true });
element.append(`<meta name="twitter:description" content="${meta.description}" />`, { html: true });
element.append(`<meta name="twitter:image" content="${meta.image}" />`, { html: true });
```

## Route-to-Meta Mapping

Customise `getMetaForPath()` in worker-template.js with route-specific meta data:

| Route | og:title | og:description | og:type |
|-------|----------|---------------|---------|
| `/` | `Business Name — Tagline` | Business description | `website` |
| `/services` | `Services — Business Name` | Services overview | `website` |
| `/services/[slug]` | `Service Name — Business Name` | Service description | `website` |
| `/about` | `About — Business Name` | About description | `website` |
| `/blog` | `Blog — Business Name` | Blog description | `website` |
| `/blog/[slug]` | `Post Title — Business Name` | Post excerpt | `article` |
| `/contact` | `Contact — Business Name` | Contact description | `website` |
| `/pricing` | `Pricing — Business Name` | Pricing description | `website` |
| `/demo` | `Demo — Business Name` | Demo description | `website` |

## How to Enable

1. **In worker-template.js**, uncomment the `getMetaForPath()` function and `MetaInjector` class
2. **Customise `getMetaForPath()`** with route-specific titles, descriptions, and images
3. **In `handleRequest()`**, uncomment the `.on("head", new MetaInjector(...))` line
4. **Set the OG image:** Upload a 1200x630px image and update the default image URL
5. **Deploy** and test with:
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
   - `curl -s https://DOMAIN/ | grep -i 'og:'`

## Testing

```bash
# Check OG tags are present
curl -s https://DOMAIN/ | grep -i 'og:title'
curl -s https://DOMAIN/ | grep -i 'og:description'
curl -s https://DOMAIN/ | grep -i 'og:image'

# Check canonical URL
curl -s https://DOMAIN/ | grep -i 'canonical'

# Check Twitter Card
curl -s https://DOMAIN/ | grep -i 'twitter:card'
```
