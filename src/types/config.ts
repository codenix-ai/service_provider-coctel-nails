// Type definitions for restaurant configuration
export interface RestaurantConfig {
  branding: {
    name: string;
    tagline: string;
    description: string;
    logo: {
      url: string;
      alt: string;
    };
  };
  theme: {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage: {
      id: string;
      query: string;
      alt: string;
    };
    buttons: Array<{
      text: string;
      action: string;
      variant: string;
    }>;
  };
  about: {
    title: string;
    paragraphs: string[];
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  menu: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      category: string;
      description: string;
      price: string;
    }>;
  };
  gallery: {
    title: string;
    subtitle: string;
    images: Array<{
      id: string;
      query: string;
      alt: string;
    }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      rating: number;
      comment: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    phone: string;
    email: string;
    hours: Record<string, string>;
    social: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
  };
  navigation: {
    items: Array<{
      label: string;
      href: string;
    }>;
    reserveButtonText: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
  };
  reservationForm: {
    title: string;
    fields: Record<string, any>;
    submitButton: string;
    submittingButton: string;
    successMessage: string;
    errorMessage: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
