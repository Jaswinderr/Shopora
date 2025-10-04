import { serve } from "inngest/next";

export const GET = async () => {
  return new Response(JSON.stringify({ message: "Inngest endpoint is live" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

async function getHandlers() {
  const { Inngest } = await import("inngest");
  const client = new Inngest({ id: "shopora-next" });

  const syncUserCreation = client.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
      const { default: connectDB } = await import("@/config/db.js");
      const { default: User } = await import("@/models/user.js");
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      await connectDB();
      await User.create({
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      });
    }
  );

  const syncUserUpdation = client.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
      const { default: connectDB } = await import("@/config/db.js");
      const { default: User } = await import("@/models/user.js");
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      await connectDB();
      await User.findByIdAndUpdate(id, {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      });
    }
  );

  const syncUserDeletion = client.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
      const { default: connectDB } = await import("@/config/db.js");
      const { default: User } = await import("@/models/user.js");
      const { id } = event.data;
      await connectDB();
      await User.findByIdAndDelete(id);
    }
  );

  return serve({
    client,
    functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
  });
}

export const POST = async (req) => {
  const handlers = await getHandlers();
  return handlers.POST(req);
};

export const PUT = async (req) => {
  const handlers = await getHandlers();
  return handlers.PUT(req);
};
