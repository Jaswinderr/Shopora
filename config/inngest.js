// config/inngest.js
import { Inngest } from "inngest";

// Export a function to get a new client at runtime
export function getInngestClient() {
  return new Inngest({ id: "shopora-next" });
}

// Factory for user creation
export function syncUserCreationFactory(client) {
  return client.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
      const { default: connectDB } = await import("./db.js");
      const { default: User } = await import("../models/user.js");

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
}

export function syncUserUpdationFactory(client) {
  return client.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
      const { default: connectDB } = await import("./db.js");
      const { default: User } = await import("../models/user.js");

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
}

export function syncUserDeletionFactory(client) {
  return client.createFunction(
    { id: "delete-user-with-clerk" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
      const { default: connectDB } = await import("./db.js");
      const { default: User } = await import("../models/user.js");

      const { id } = event.data;

      await connectDB();
      await User.findByIdAndDelete(id);
    }
  );
}
