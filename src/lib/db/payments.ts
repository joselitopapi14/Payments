import { prisma } from "./prisma";
import type { Payment as PrismaPayment } from "@prisma/client";

// Type that matches our frontend Payment type
export type Payment = {
  id: string;
  name: string;
  email: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
};

// Convert Prisma Payment to Frontend Payment
function toPayment(payment: PrismaPayment): Payment {
  return {
    id: payment.id,
    name: payment.name,
    email: payment.email,
    amount: payment.amount,
    status: payment.status as Payment["status"],
  };
}

/**
 * Get all payments from database
 */
export async function getAllPayments(): Promise<Payment[]> {
  const payments = await prisma.payment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return payments.map(toPayment);
}

/**
 * Get a single payment by ID
 */
export async function getPaymentById(id: string): Promise<Payment | null> {
  const payment = await prisma.payment.findUnique({
    where: { id },
  });
  return payment ? toPayment(payment) : null;
}

/**
 * Create a new payment
 */
export async function createPayment(
  data: Omit<Payment, "id">
): Promise<Payment> {
  const payment = await prisma.payment.create({
    data: {
      name: data.name,
      email: data.email,
      amount: data.amount,
      status: data.status,
    },
  });
  return toPayment(payment);
}

/**
 * Update a payment by ID
 */
export async function updatePayment(
  id: string,
  data: Partial<Omit<Payment, "id">>
): Promise<Payment> {
  const payment = await prisma.payment.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.status !== undefined && { status: data.status }),
    },
  });
  return toPayment(payment);
}

/**
 * Delete a single payment by ID
 */
export async function deletePayment(id: string): Promise<void> {
  await prisma.payment.delete({
    where: { id },
  });
}

/**
 * Delete multiple payments by IDs
 */
export async function deletePayments(ids: string[]): Promise<number> {
  const result = await prisma.payment.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return result.count;
}

/**
 * Check if database connection is healthy
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
