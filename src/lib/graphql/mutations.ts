import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation CreateAppointment($data: CreateAppointmentInput!) {
    createAppointment(data: $data) {
      id
      serviceProviderId
      serviceId
      customerName
      customerEmail
      customerPhone
      startDatetime
      endDatetime
      status
      paymentStatus
      createdAt
    }
  }
`;
