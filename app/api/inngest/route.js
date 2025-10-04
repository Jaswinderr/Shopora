// app/api/inngest/route.js
import { serve } from "inngest/next";

export async function GET() {
  return new Response(JSON.stringify({ message: "Inngest endpoint is live" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  const {
    inngest,
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  } = await import("@/config/inngest.js");

  const handlers = serve({
    client: inngest,
    functions: [
      syncUserCreation(),
      syncUserUpdation(),
      syncUserDeletion(),
    ],
  });

  return handlers.POST(req);
}

export async function PUT(req) {
  const {
    inngest,
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  } = await import("@/config/inngest.js");

  const handlers = serve({
    client: inngest,
    functions: [
      syncUserCreation(),
      syncUserUpdation(),
      syncUserDeletion(),
    ],
  });

  return handlers.PUT(req);
}
