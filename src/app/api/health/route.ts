import { NextResponse } from "next/server";
import { checkDatabaseConnection } from "@/lib/db/payments";

// GET /api/health - Check API and database health
export async function GET() {
  try {
    const dbHealthy = await checkDatabaseConnection();

    if (!dbHealthy) {
      return NextResponse.json(
        {
          status: "unhealthy",
          api: "ok",
          database: "disconnected",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: "healthy",
      api: "ok",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        api: "ok",
        database: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
