<script lang="ts">
  import '../app.css';
  import { Toaster } from 'svelte-sonner';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "S&P Line Striping and Sealcoating",
    "description": "Professional line striping, sealcoating, and ADA-compliant markings for the Central Valley",
    "telephone": "+1-559-704-3141",
    "email": "spstripingfresno@gmail.com",
    "url": "https://spstriping.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fresno",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "36.8119315",
      "longitude": "-119.700816"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50"
    },
    "priceRange": "$$",
    "openingHours": ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
    "sameAs": [
      "https://www.tiktok.com/@spstriping",
      "https://www.youtube.com/@spstriping"
    ]
  };
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>S&P Line Striping | Fresno's Striping & Sealcoating Experts</title>
  <meta name="description" content="Professional line striping, sealcoating, and ADA-compliant markings for the Central Valley. 12+ years experience, 2400+ projects completed." />
  <meta name="keywords" content="line striping, sealcoating, parking lot striping, ADA compliance, fire lane markings, Fresno, Central Valley, California" />
  <meta name="author" content="S&P Line Striping and Sealcoating" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="S&P Line Striping | Fresno's Striping & Sealcoating Experts" />
  <meta property="og:description" content="Professional line striping, sealcoating, and ADA-compliant markings for the Central Valley." />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/logo.png" />
  <meta property="og:url" content="https://spstriping.com" />
  <meta property="og:site_name" content="S&P Line Striping" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="S&P Line Striping | Fresno's Experts" />
  <meta name="twitter:description" content="Professional line striping and sealcoating services for the Central Valley." />
  <meta name="twitter:image" content="/logo.png" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/logo.png" />
  
  <!-- Preload critical assets -->
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" as="style" />
  
  <!-- Structured Data -->
  {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<Toaster position="top-center" richColors />

<slot />
