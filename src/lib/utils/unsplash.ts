export interface UnsplashImageConfig {
  id: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
}

export function getUnsplashUrl(config: UnsplashImageConfig): string {
  const { id, width = 1920, height = 1080, quality = 80 } = config;
  
  // Check if id is already a full URL
  if (id.startsWith('http://') || id.startsWith('https://')) {
    // If it's a full URL, just append query parameters
    const separator = id.includes('?') ? '&' : '?';
    return `${id}${separator}w=${width}&h=${height}&q=${quality}&auto=format&fit=crop`;
  }
  
  // Otherwise, construct the full Unsplash URL
  return `https://images.unsplash.com/${id}?w=${width}&h=${height}&q=${quality}&auto=format&fit=crop`;
}
