import { RestaurantConfig } from '@/hooks/useRestaurantConfig';

export function getRestaurantStructuredData(config: RestaurantConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: config.branding.name,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
    description: config.branding.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.contact.address.street,
      addressLocality: config.contact.address.city,
      addressRegion: config.contact.address.state,
      postalCode: config.contact.address.zip,
      addressCountry: config.contact.address.country,
    },
    telephone: config.contact.phone,
    email: config.contact.email,
    servesCuisine: 'Fine Dining',
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
        opens: '17:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '17:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '17:00',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '247',
    },
  };
}
