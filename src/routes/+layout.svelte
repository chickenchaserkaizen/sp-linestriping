<script lang="ts">
  import "../app.css";
  import { Toaster } from "svelte-sonner";
  import { services } from "$lib/data/services";
  import { testimonials } from "$lib/data/testimonials";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "S&P Line Striping & Sealcoating",
    image: "https://spstriping.com/logo.png",
    description:
      "Professional line striping, sealcoating, and ADA-compliant markings for the Central Valley",
    telephone: "+1-559-704-3141",
    email: "spstripingfresno@gmail.com",
    url: "https://spstriping.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fresno",
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "36.8119315",
      longitude: "-119.700816",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "36.8119315",
        longitude: "-119.700816",
      },
      geoRadius: "80000",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating.toString(),
      },
      reviewBody: t.quote,
    })),
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Line Striping & Sealcoating Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.desc,
        },
      })),
    },
    sameAs: [
      "https://www.tiktok.com/@spstripingfresno?_r=1&_t=ZP-93cWbq7hxkt",
      "https://youtube.com/@spstriping?si=zhp-eNQhVeFdM7-j",
    ],
  };
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>S&P Line Striping | Fresno's Striping & Sealcoating Experts</title>
  <meta
    name="description"
    content="Professional line striping, sealcoating, and ADA-compliant markings for the Central Valley. 12+ years experience, 2400+ projects completed."
  />
  <meta
    name="keywords"
    content="line striping, sealcoating, parking lot striping, ADA compliance, fire lane markings, Fresno, Central Valley, California"
  />
  <meta name="author" content="S&P Line Striping and Sealcoating" />

  <!-- Open Graph -->
  <meta
    property="og:title"
    content="S&P Line Striping | Fresno's Striping & Sealcoating Experts"
  />
  <meta
    property="og:description"
    content="Professional line striping, sealcoating, and ADA-compliant markings for the Central Valley."
  />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/logo.png" />
  <meta property="og:url" content="https://spstriping.com" />
  <meta property="og:site_name" content="S&P Line Striping" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="S&P Line Striping | Fresno's Experts" />
  <meta
    name="twitter:description"
    content="Professional line striping and sealcoating services for the Central Valley."
  />
  <meta name="twitter:image" content="/logo.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/logo.png" />

  <!-- Preload critical assets -->
  <link
    rel="preload"
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
    as="style"
  />

  <!-- Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<Toaster position="top-center" richColors />

<slot />
