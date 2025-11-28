"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@apollo/client/react";
import { format } from "date-fns";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CREATE_RESERVATION } from "@/lib/graphql/mutations";
import { GET_SERVICES_BY_PROVIDER } from "@/lib/graphql/queries";

const reservationSchema = z.object({
  serviceId: z.string().min(1, "Seleccione un servicio"),
  customerName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  customerEmail: z.string().email("Correo electrónico inválido"),
  customerPhone: z.string().regex(/^[\d\s\-\+\(\)]+$/, "Teléfono inválido"),
  startDatetime: z
    .string()
    .min(1, "La fecha y hora de inicio son obligatorias"),
  endDatetime: z.string().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
  paymentStatus: z.enum(["unpaid", "paid", "pending"]).optional(),
  specialRequests: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

interface ReservationFormProps {
  onSuccess?: () => void;
}

// form fields updated to match CreateAppointment mutation

export function ReservationForm({ onSuccess }: ReservationFormProps) {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [createReservation, { loading }] = useMutation(CREATE_RESERVATION);
  const serviceProviderId =
    process.env.NEXT_PUBLIC_SERVICE_PROVIDER_ID ||
    process.env.NEXT_PUBLIC_RESTAURANT_ID;

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useQuery(GET_SERVICES_BY_PROVIDER, {
    variables: { serviceProviderId },
    skip: !serviceProviderId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const onSubmit = async (data: ReservationFormData) => {
    try {
      setSubmitStatus("idle");

      // Get service provider ID from environment
      const serviceProviderId =
        process.env.NEXT_PUBLIC_SERVICE_PROVIDER_ID ||
        process.env.NEXT_PUBLIC_RESTAURANT_ID;
      if (!serviceProviderId) {
        throw new Error("Service provider ID not configured");
      }

      // Use start/end datetimes as ISO strings and ensure end >= start
      const start = new Date(data.startDatetime);
      const startDatetime = start.toISOString();
      let endDatetime = startDatetime;
      if (data.endDatetime) {
        const end = new Date(data.endDatetime);
        if (end.getTime() >= start.getTime()) {
          endDatetime = end.toISOString();
        } else {
          // If end is before start, default to startDatetime
          endDatetime = startDatetime;
        }
      }

      await createReservation({
        variables: {
          data: {
            serviceProviderId,
            serviceId: data.serviceId,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            startDatetime,
            endDatetime,
            // any other fields required by the backend can be added here
          },
        },
      });

      setSubmitStatus("success");
      reset();

      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
  };

  const minDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  interface Service {
    id: string;
    name: string;
    description?: string;
    durationMinutes?: number;
    priceAmount?: number;
    currency?: string;
    allowsOnlinePayment?: boolean;
    isActive?: boolean;
    createdAt?: string;
  }

  type ServicesQueryResult = { servicesByProvider?: Service[] };
  const services: Service[] =
    (servicesData as ServicesQueryResult)?.servicesByProvider || [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-1">
        <Select
          {...register("serviceId")}
          label="Servicio"
          className="appearance-none bg-white"
          error={errors.serviceId?.message}
          disabled={loading || servicesLoading}
          options={
            servicesLoading
              ? [{ value: "", label: "Cargando servicios..." }]
              : servicesError
              ? [{ value: "", label: "Error cargando servicios" }]
              : [
                  { value: "", label: "Seleccione un servicio" },
                  ...services
                    .filter((s: Service) => s.isActive)
                    .map((s: Service) => ({
                      value: s.id,
                      label: `${s.name} — ${s.currency || "$"}${
                        s.priceAmount ?? "Consultar"
                      } · ${s.durationMinutes ?? ""} min`,
                    })),
                ]
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          {...register("customerName")}
          label="Nombre completo"
          placeholder="Juan Pérez"
          error={errors.customerName?.message}
          disabled={loading}
        />
        <Input
          {...register("customerEmail")}
          type="email"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          error={errors.customerEmail?.message}
          disabled={loading}
        />
      </div>

      <Input
        {...register("customerPhone")}
        type="tel"
        label="Teléfono"
        placeholder="+56 9 1234 5678"
        error={errors.customerPhone?.message}
        disabled={loading}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          {...register("startDatetime")}
          type="datetime-local"
          label="Fecha y hora de inicio"
          min={minDate}
          error={errors.startDatetime?.message}
          disabled={loading}
        />
        <Input
          {...register("endDatetime")}
          type="datetime-local"
          label="Fecha y hora de fin (opcional)"
          min={minDate}
          error={errors.endDatetime?.message}
          disabled={loading}
        />
      </div>

      <TextArea
        {...register("specialRequests")}
        label="Solicitudes especiales (opcional)"
        placeholder="Necesidades especiales, requisitos o comentarios"
        error={errors.specialRequests?.message}
        disabled={loading}
      />

      <Button
        type="submit"
        isLoading={loading}
        className="w-full bg-gray-600"
        size="lg"
      >
        {loading ? "Enviando..." : "Reservar servicio"}
      </Button>

      {submitStatus === "success" && (
        <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
          ¡Cita creada con éxito!
        </div>
      )}
      {submitStatus === "error" && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          Error al crear la cita. Por favor intenta de nuevo.
        </div>
      )}
    </form>
  );
}
