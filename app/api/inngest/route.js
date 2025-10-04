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
  // Dynamically import Inngest client & functions at runtime
  const { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } = await import("@/config/inngest.js");

  // Create API handlers
  const handlers = serve({
    client: inngest,
    functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
  });

  // Delegate the request to Inngest POST handler
  return handlers.POST(req);
}
