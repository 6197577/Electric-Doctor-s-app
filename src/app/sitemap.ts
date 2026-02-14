import { MetadataRoute } from 'next';
import { TOP_50_CITIES_PRICING } from '@/lib/pricing-data';
import { SERVICES } from '@/lib/seo-utils';

/**
 * @fileOverview Automated sitemap generation for SEO scale.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://emergencyelectricrepair.com';

  // Base routes
  const routes = [
    '', 
    '/diagnose', 
    '/audit', 
    '/commercial-audit',
    '/marketplace', 
    '/subscriptions', 
    '/generator-logs', 
    '/ev-readiness', 
    '/video-consult', 
    '/tracking',
    '/products/smart-panels',
    '/predictive-maintenance'
  ].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    })
  );

  // Dynamic service-city landing pages
  const dynamicPages = SERVICES.flatMap((service) =>
    TOP_50_CITIES_PRICING.map((city) => ({
      url: `${baseUrl}/services/${service.id}/${city.city.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...routes, ...dynamicPages];
}
