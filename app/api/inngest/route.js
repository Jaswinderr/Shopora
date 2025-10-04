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
    syncUserCreationFactory,
    syncUserUpdationFactory,
    syncUserDeletionFactory,
  } = await import("@/config/inngest.js");

  const client = getInngestClient();

  return serve({
    client,
    functions: [
      syncUserCreationFactory(client),
      syncUserUpdationFactory(client),
      syncUserDeletionFactory(client),
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
