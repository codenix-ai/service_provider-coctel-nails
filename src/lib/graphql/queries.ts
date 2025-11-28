import { gql } from "@apollo/client";

/**
 * GraphQL query to fetch service provider configuration by ID
 * Matches the backend schema with siteConfig, images, etc.
 */
export const GET_SERVICE_PROVIDER_CONFIG = gql`
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
`;

/**
 * GraphQL mutation to update service provider configuration
 */
export const UPDATE_SERVICE_PROVIDER_CONFIG = gql`
  mutation UpdateServiceProviderConfig(
    $serviceProviderId: ID!
    $input: ServiceProviderInput!
  ) {
    updateServiceProvider(id: $serviceProviderId, input: $input) {
      id
      businessName
      siteConfig
    }
  }
`;

export const GET_SERVICES_BY_PROVIDER = gql`
  query GetServicesByProvider($serviceProviderId: String!) {
    servicesByProvider(serviceProviderId: $serviceProviderId) {
      id
      name
      description
      durationMinutes
      priceAmount
      currency
      allowsOnlinePayment
      isActive
      createdAt
    }
  }
`;
