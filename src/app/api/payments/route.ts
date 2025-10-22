import { NextResponse } from "next/server";
import {
  getAllPayments,
  createPayment,
  deletePayments,
} from "@/lib/db/payments";

// GET /api/payments - Get all payments
export async function GET() {
  try {
    const payments = await getAllPayments();
    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create a new payment
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.amount || !body.status) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, amount, status" },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ["pending", "processing", "success", "failed"];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be: pending, processing, success, or failed" },
        { status: 400 }
      );
    }

    // Validate amount
    const amount = parseFloat(body.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Amount must be a positive number" },
        { status: 400 }
      );
    }

    const payment = await createPayment({
      name: body.name,
      email: body.email,
      amount: amount,
      status: body.status,
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}

// DELETE /api/payments - Delete multiple payments
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    // Validate IDs
    if (!body.ids || !Array.isArray(body.ids) || body.ids.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'ids' array" },
        { status: 400 }
      );
    }

    const count = await deletePayments(body.ids);

    return NextResponse.json({
      success: true,
      deleted: count,
    });
  } catch (error) {
    console.error("Error deleting payments:", error);
    return NextResponse.json(
      { error: "Failed to delete payments" },
      { status: 500 }
    );
  }
}
