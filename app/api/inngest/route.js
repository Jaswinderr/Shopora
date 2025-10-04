import { serve } from "inngest/next";

export async function GET() {
  return new Response(JSON.stringify({ message: "Inngest endpoint is live" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Helper to create handlers at runtime
async function getHandlers() {
  const {
    getInngestClient,
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
  } = await import("@/config/inngest.js");

  const client = getInngestClient();

  return serve({
    client,
    functions: [
      syncUserCreation(client),
      syncUserUpdation(client),
      syncUserDeletion(client),
    ],
  });
}

export async function POST(req) {
  const handlers = await getHandlers();
  return handlers.POST(req);
}

export async function PUT(req) {
  const handlers = await getHandlers();
  return handlers.PUT(req);
}
