export type RestaurantConfig = {
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
    hours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
    social: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
  };
  navigation: {
    items: Array<{
      text: string;
      link: string;
    }>;
    reserveButtonText: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
  };
  reservationForm: {
    title: string;
    fields: string[];
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
};

/**
 * Returns a minimal fallback configuration for build time
 */
function getFallbackConfig(): RestaurantConfig {
  return {
    branding: {
      name: "Proveedor de Servicios",
      tagline: "Servicio Profesional",
      description: "Servicio de calidad",
      logo: {
        url: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
        alt: "Logo",
      },
    },
    theme: {
      colors: {
        primary: "#8B4513",
        primaryDark: "#6B3410",
        primaryLight: "#A0522D",
        secondary: "#D4AF37",
        accent: "#CD853F",
        background: "#FFFFFF",
        text: "#2C1810",
      },
      fonts: {
        heading: "Playfair Display",
        body: "Inter",
      },
    },
    hero: {
      title: "Bienvenido",
      subtitle: "Servicio Profesional",
      description: "Servicio de calidad",
      backgroundImage: {
        id: "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
        alt: "Hero",
      },
      buttons: [
        { text: "Contáctanos", action: "#contact", variant: "primary" },
      ],
    },
    about: {
      title: "Acerca de Nosotros",
      paragraphs: ["Brindamos servicio de calidad."],
      stats: [
        { value: "10+", label: "Años" },
        { value: "500+", label: "Clientes" },
        { value: "5★", label: "Calificación" },
      ],
    },
    menu: {
      title: "Nuestros Servicios",
      subtitle: "Lo que ofrecemos",
      items: [],
    },
    gallery: {
      title: "Galería",
      subtitle: "Nuestro trabajo",
      images: [],
    },
    testimonials: {
      title: "Testimonios",
      subtitle: "Lo que dicen nuestros clientes",
      items: [],
    },
    contact: {
      title: "Contáctanos",
      subtitle: "Ponte en contacto",
      address: { street: "", city: "", state: "", zip: "", country: "" },
      phone: "",
      email: "",
      hours: {
        monday: "9:00 AM - 6:00 PM",
        tuesday: "9:00 AM - 6:00 PM",
        wednesday: "9:00 AM - 6:00 PM",
        thursday: "9:00 AM - 6:00 PM",
        friday: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "Cerrado",
      },
      social: { instagram: "", facebook: "", twitter: "" },
    },
    navigation: {
      items: [
        { text: "Inicio", link: "#hero" },
        { text: "Servicios", link: "#services" },
        { text: "Contacto", link: "#contact" },
      ],
      reserveButtonText: "Reservar",
    },
    footer: {
      aboutText: "Proveedor de servicios de calidad",
      copyrightText: `© ${new Date().getFullYear()} Todos los derechos reservados.`,
    },
    reservationForm: {
      title: "Reservar",
      fields: ["name", "email", "phone", "date", "time", "partySize"],
      submitButton: "Reservar",
      submittingButton: "Reservando...",
      successMessage: "¡Reserva exitosa!",
      errorMessage: "Error al reservar.",
    },
    seo: {
      title: "Proveedor de Servicios",
      description: "Servicio profesional de calidad",
      keywords: ["servicios", "profesional"],
    },
  };
}

/**
 * Server-side function to get service provider configuration using GraphQL
 * Fetches from backend and decodes siteConfig JSON
 */
export async function getRestaurantConfig(): Promise<RestaurantConfig> {
  const serviceProviderId =
    process.env.NEXT_PUBLIC_SERVICE_PROVIDER_ID ||
    process.env.NEXT_PUBLIC_RESTAURANT_ID;
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

  // Return fallback config if environment variables are not set (build time)
  if (!serviceProviderId || !endpoint) {
    console.warn("Environment variables not set, using fallback config");
    return getFallbackConfig();
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetServiceProviderConfig($serviceProviderId: String!) {
            serviceProvider(id: $serviceProviderId) {
              id
              businessName
              type
              phone
              email
              description
              location
              address
              whatsappNumber
              coverImage
              slug
              siteConfig
              images {
                id
                url
                key
                createdAt
              }
              services {
                id
                serviceProviderId
                name
                description
                durationMinutes
                priceAmount
                currency
                allowsOnlinePayment
                isActive
                createdAt
                updatedAt
              }
              isActive
              createdAt
              updatedAt
            }
          }
        `,
        variables: { serviceProviderId },
      }),
      next: { revalidate: 3600 } as any, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error("GraphQL query failed: " + JSON.stringify(result.errors));
    }

    const serviceProvider = result.data?.serviceProvider;

    if (!serviceProvider) {
      throw new Error("Service provider not found");
    }

    // siteConfig already comes as JSON object from GraphQL
    if (serviceProvider.siteConfig) {
      const siteConfigData = serviceProvider.siteConfig;

      // Build config from siteConfig data
      const decodedConfig: RestaurantConfig = {
        ...siteConfigData,
        branding: {
          ...siteConfigData.branding,
          name: serviceProvider.businessName || siteConfigData.branding?.name,
          description:
            serviceProvider.description || siteConfigData.branding?.description,
        },
        // Map services to menu items
        menu: {
          ...siteConfigData.menu,
          items: serviceProvider.services?.length
            ? serviceProvider.services
                .filter((service: any) => service.isActive)
                .map((service: any) => ({
                  id: service.id,
                  name: service.name,
                  category: "Servicio",
                  description: service.description || "",
                  price: service.priceAmount
                    ? `${service.currency || "$"}${service.priceAmount}`
                    : "Consultar",
                }))
            : siteConfigData.menu?.items || [],
        },
        // Use images from backend if available
        gallery: {
          ...siteConfigData.gallery,
          images: serviceProvider.images?.length
            ? serviceProvider.images.map((img: any) => ({
                id: img.url,
                alt: img.key || "Gallery image",
              }))
            : siteConfigData.gallery?.images || [],
        },
      };

      return decodedConfig;
    } else {
      // Return default config when siteConfig is null
      const defaultConfig: RestaurantConfig = {
        branding: {
          name: serviceProvider.businessName || "Proveedor de Servicios",
          tagline: "Proveedor de Servicios Profesionales",
          description:
            serviceProvider.description ||
            "Servicio de calidad en el que puedes confiar",
          logo: {
            url:
              serviceProvider.coverImage ||
              "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
            alt: serviceProvider.businessName || "Logo",
          },
        },
        theme: {
          colors: {
            primary: "#8B4513",
            primaryDark: "#6B3410",
            primaryLight: "#A0522D",
            secondary: "#D4AF37",
            accent: "#CD853F",
            background: "#FFFFFF",
            text: "#2C1810",
          },
          fonts: {
            heading: "Playfair Display",
            body: "Inter",
          },
        },
        hero: {
          title: serviceProvider.businessName || "Bienvenido",
          subtitle: "Servicio Profesional",
          description:
            serviceProvider.description ||
            "Servicio de calidad en el que puedes confiar",
          backgroundImage: {
            id:
              serviceProvider.coverImage ||
              "https://images.unsplash.com/photo-1560179707-f14e90ef3623",
            alt: "Imagen de fondo",
          },
          buttons: [
            {
              text: "Contáctanos",
              action: "#contact",
              variant: "primary",
            },
          ],
        },
        about: {
          title: "Acerca de Nosotros",
          paragraphs: [
            serviceProvider.description || "Brindamos servicio de calidad.",
          ],
          stats: [
            { value: "10+", label: "Años de Experiencia" },
            { value: "500+", label: "Clientes Felices" },
            { value: "5★", label: "Calificación" },
          ],
        },
        menu: {
          title: "Nuestros Servicios",
          subtitle: "Lo que ofrecemos",
          items: serviceProvider.services?.length
            ? serviceProvider.services
                .filter((service: any) => service.isActive)
                .map((service: any) => ({
                  id: service.id,
                  name: service.name,
                  category: "Servicio",
                  description: service.description || "",
                  price: service.priceAmount
                    ? `${service.currency || "$"}${service.priceAmount}`
                    : "Consultar",
                }))
            : [],
        },
        gallery: {
          title: "Galería",
          subtitle: "Nuestro trabajo",
          images:
            serviceProvider.images?.map((img: any) => ({
              id: img.url,
              alt: img.key || "Imagen de galería",
            })) || [],
        },
        testimonials: {
          title: "Testimonios",
          subtitle: "Lo que dicen nuestros clientes",
          items: [],
        },
        contact: {
          title: "Contáctanos",
          subtitle: "Ponte en contacto",
          address: {
            street: serviceProvider.address || "",
            city: serviceProvider.location || "",
            state: "",
            zip: "",
            country: "",
          },
          phone: serviceProvider.phone || "",
          email: serviceProvider.email || "",
          hours: {
            monday: "9:00 AM - 6:00 PM",
            tuesday: "9:00 AM - 6:00 PM",
            wednesday: "9:00 AM - 6:00 PM",
            thursday: "9:00 AM - 6:00 PM",
            friday: "9:00 AM - 6:00 PM",
            saturday: "10:00 AM - 4:00 PM",
            sunday: "Cerrado",
          },
          social: {
            instagram: "",
            facebook: "",
            twitter: "",
          },
        },
        navigation: {
          items: [
            { text: "Inicio", link: "#hero" },
            { text: "Acerca", link: "#about" },
            { text: "Servicios", link: "#services" },
            { text: "Galería", link: "#gallery" },
            { text: "Contacto", link: "#contact" },
          ],
          reserveButtonText: "Reservar Ahora",
        },
        footer: {
          aboutText:
            serviceProvider.description || "Proveedor de servicios de calidad",
          copyrightText: `© ${new Date().getFullYear()} ${
            serviceProvider.businessName
          }. Todos los derechos reservados.`,
        },
        reservationForm: {
          title: "Reservar una Cita",
          fields: ["name", "email", "phone", "date", "time", "partySize"],
          submitButton: "Reservar Ahora",
          submittingButton: "Reservando...",
          successMessage: "¡Tu cita ha sido reservada exitosamente!",
          errorMessage:
            "Error al reservar la cita. Por favor intenta de nuevo.",
        },
        seo: {
          title: `${serviceProvider.businessName} | ${serviceProvider.location}`,
          description:
            serviceProvider.description ||
            "Proveedor de servicios profesionales",
          keywords: [
            serviceProvider.businessName,
            serviceProvider.type,
            serviceProvider.location,
          ].filter(Boolean),
        },
      };

      return defaultConfig;
    }
  } catch (err) {
    // During build time, if the server is not available, return fallback config
    console.error("Error fetching service provider config:", err);
    console.warn("Using fallback configuration");
    return getFallbackConfig();
  }
}
