
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://emergencyelectricrepair.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/profile/', '/pro/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
