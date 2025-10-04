// app/api/inngest/route.js
import { serve } from "inngest/next";

// GET endpoint for health check
export async function GET() {
  return new Response(JSON.stringify({ message: "Inngest endpoint is live" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST endpoint for Inngest events
export async function POST(req) {
  const { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } = await import("@/config/inngest.js");

  const handlers = serve({
    client: inngest,
    functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
  });

  return handlers.POST(req);
}

// PUT endpoint (needed by Inngest Cloud)
export async function PUT(req) {
  const { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } = await import("@/config/inngest.js");

  const handlers = serve({
    client: inngest,
    functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
  });

  return handlers.PUT(req);
}
