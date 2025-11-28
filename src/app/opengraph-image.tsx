import { ImageResponse } from 'next/og';
import { getRestaurantConfig } from '@/hooks/useRestaurantConfig';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const config = await getRestaurantConfig();

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#f59e0b',
            marginBottom: 20,
          }}
        >
          {config.branding.name}
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#fbbf24',
            marginBottom: 10,
          }}
        >
          {config.branding.tagline}
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#cbd5e1',
            textAlign: 'center',
            maxWidth: '80%',
          }}
        >
          {config.branding.description}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
