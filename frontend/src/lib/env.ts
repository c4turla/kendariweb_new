// Environment configuration - Directus-based architecture
// All data (blog, portfolio, leads, files) flows through Directus CMS

export const env = {
  NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055",
};
