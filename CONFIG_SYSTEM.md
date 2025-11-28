# Restaurant Configuration System

This boilerplate includes a flexible configuration system that allows you to customize all text content, branding, and theme colors through a single JSON configuration file or API endpoint.

## Configuration Structure

The configuration is defined in `/src/config/restaurant-config.json` and includes:

### 1. Branding

- Restaurant name
- Tagline
- Description
- Logo URL

### 2. Theme

- Primary, secondary, and accent colors (hex values)
- Font families for headings and body text

### 3. Content Sections

- **Hero**: Title, subtitle, description, background image, CTA buttons
- **About**: Story paragraphs and stats
- **Menu**: Menu items with categories, descriptions, and prices
- **Gallery**: Image gallery configuration
- **Testimonials**: Customer reviews
- **Contact**: Address, phone, email, hours, social media links
- **Navigation**: Menu items and labels
- **Footer**: Footer text
- **Reservation Form**: Field labels and messages

### 4. SEO

- Meta title template
- Description template
- Keywords

## Usage

### Client Components

Use the `useConfig` hook in client components:

```tsx
'use client';

import { useConfig } from '@/context/ConfigContext';

export function MyComponent() {
  const { config, loading, error } = useConfig();

  if (loading) return <div>Loading...</div>;
  if (error || !config) return <div>Error loading configuration</div>;

  return (
    <div>
      <h1>{config.branding.name}</h1>
      <p>{config.branding.tagline}</p>
    </div>
  );
}
```

### Server Components

Use the `getRestaurantConfig` function:

```tsx
import { getRestaurantConfig } from '@/hooks/useRestaurantConfig';

export default async function Page() {
  const config = await getRestaurantConfig();

  return (
    <div>
      <h1>{config.branding.name}</h1>
    </div>
  );
}
```

## API Integration

### Fetching Configuration

The system is designed to fetch configuration from a backend API:

```typescript
// In production, update /src/hooks/useRestaurantConfig.ts:

const response = await fetch('https://your-backend.com/api/restaurant-config');
const data = await response.json();
setConfig(data);
```

### API Endpoint

An example API route is provided at `/src/app/api/config/route.ts`:

- **GET /api/config** - Fetch current configuration
- **PUT /api/config** - Update configuration (requires authentication)

### Backend Integration Steps

1. **Set up your backend API** to serve configuration JSON
2. **Update `/src/hooks/useRestaurantConfig.ts`**:
   ```typescript
   const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/restaurant-config');
   ```
3. **Add authentication** for PUT requests to protect configuration updates
4. **Validate** incoming configuration against the schema

## Theme Customization

### CSS Variables

The theme colors are applied as CSS variables in `globals.css`:

```css
:root {
  --color-primary: #d97706;
  --color-primary-dark: #b45309;
  /* ... */
}
```

These can be dynamically updated based on configuration:

```typescript
// Apply theme colors
const colors = config.theme.colors;
document.documentElement.style.setProperty('--color-primary', colors.primary);
```

### Dynamic Color Application

Create a `ThemeProvider` component to apply colors:

```tsx
'use client';

import { useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useConfig();

  useEffect(() => {
    if (config?.theme.colors) {
      const { colors } = config.theme;
      document.documentElement.style.setProperty('--color-primary', colors.primary);
      document.documentElement.style.setProperty('--color-primary-dark', colors.primaryDark);
      // ... apply other colors
    }
  }, [config]);

  return <>{children}</>;
}
```

## Configuration File Example

```json
{
  "branding": {
    "name": "Le Jardin Élégant",
    "tagline": "Where Culinary Art Meets Elegance",
    "description": "Experience fine dining at its finest"
  },
  "theme": {
    "colors": {
      "primary": "#d97706",
      "primaryDark": "#b45309",
      "primaryLight": "#f59e0b"
    }
  },
  "hero": {
    "title": "Le Jardin Élégant",
    "buttons": [
      {
        "text": "Reserve a Table",
        "action": "openReservation",
        "variant": "primary"
      }
    ]
  }
}
```

## Multi-tenancy Support

This configuration system supports multi-tenancy:

1. **Pass restaurant ID** in the API request:

   ```typescript
   const response = await fetch(`/api/config?restaurantId=${restaurantId}`);
   ```

2. **Store multiple configurations** in your database
3. **Serve different configurations** based on subdomain or path

## Caching

For production, implement caching:

```typescript
// Cache configuration in Redis or similar
const cachedConfig = await redis.get(`restaurant:${id}:config`);
if (cachedConfig) return JSON.parse(cachedConfig);

// Fetch from database
const config = await db.getRestaurantConfig(id);

// Cache for 1 hour
await redis.set(`restaurant:${id}:config`, JSON.stringify(config), 'EX', 3600);
```

## Type Safety

All configuration is fully typed using TypeScript. See `/src/types/config.ts` for the complete type definitions.

## Testing

Test configuration changes:

```typescript
// Mock configuration
const mockConfig = {
  branding: { name: 'Test Restaurant' /* ... */ },
  // ... rest of config
};

// In tests
jest.mock('@/context/ConfigContext', () => ({
  useConfig: () => ({ config: mockConfig, loading: false, error: null }),
}));
```

## Environment Variables

Add to `.env.local`:

```env
# API endpoint for configuration
NEXT_PUBLIC_API_URL=https://your-backend.com/api

# For server-side configuration fetching
API_SECRET_KEY=your-secret-key
```

## Admin Panel Integration

To build an admin panel for configuration management:

1. Create admin routes under `/admin`
2. Add form to edit configuration JSON
3. Call PUT `/api/config` to save changes
4. Add authentication middleware
5. Implement validation

## Best Practices

1. **Validate** all configuration data before saving
2. **Version** configurations for rollback capability
3. **Backup** configurations before updates
4. **Log** all configuration changes
5. **Test** thoroughly after configuration updates
6. **Cache** configuration data appropriately
7. **Monitor** for configuration fetch errors

## Migration from Static Data

To migrate existing constants:

1. Move data from `/src/lib/constants/*` to configuration JSON
2. Update components to use `useConfig()` hook
3. Test all pages thoroughly
4. Remove old constant files

## Support

For issues or questions about the configuration system, refer to the documentation or create an issue in the repository.
