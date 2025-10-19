"use client";

import * as React from "react";
import type { Payment } from "@/data/payments/columns";

interface PaymentsContextType {
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  addPayment: (payment: Omit<Payment, "id">) => Promise<void>;
  updatePayment: (id: string, payment: Partial<Payment>) => Promise<void>;
  deletePayments: (ids: string[]) => Promise<void>;
  refreshPayments: () => Promise<void>;
}

const PaymentsContext = React.createContext<PaymentsContextType | undefined>(
  undefined
);

export function PaymentsProvider({ children }: { children: React.ReactNode }) {
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Load payments from API
  const refreshPayments = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/payments");
      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching payments:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load payments on mount
  React.useEffect(() => {
    refreshPayments();
  }, [refreshPayments]);

  const addPayment = React.useCallback(async (payment: Omit<Payment, "id">) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const newPayment = await response.json();
      setPayments((prev) => [...prev, newPayment]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error creating payment:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePayment = React.useCallback(
    async (id: string, updatedFields: Partial<Payment>) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/payments/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        });

        if (!response.ok) {
          throw new Error("Failed to update payment");
        }

        const updatedPayment = await response.json();
        setPayments((prev) =>
          prev.map((payment) =>
            payment.id === id ? updatedPayment : payment
          )
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error updating payment:", err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deletePayments = React.useCallback(async (ids: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/payments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete payments");
      }

      setPayments((prev) => prev.filter((payment) => !ids.includes(payment.id)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error deleting payments:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      payments,
      isLoading,
      error,
      addPayment,
      updatePayment,
      deletePayments,
      refreshPayments,
    }),
    [payments, isLoading, error, addPayment, updatePayment, deletePayments, refreshPayments]
  );

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
}

export function usePayments() {
  const context = React.useContext(PaymentsContext);
  if (context === undefined) {
    throw new Error("usePayments must be used within a PaymentsProvider");
  }
  return context;
}