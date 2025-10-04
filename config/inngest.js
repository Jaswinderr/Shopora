// config/inngest.js
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "shopora-next" });

// Create Inngest functions as factories
export function syncUserCreation() {
  return inngest.createFunction(
    { id: "sync-user-from-clerk" },
    { event: "clerk/user.created" },
    async ({ event }) => {
      const { default: connectDB } = await import("./db.js");
      const { default: User } = await import("../models/user.js");

      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      };

      await connectDB();
      await User.create(userData);
    }
  );
}

export function syncUserUpdation() {
  return inngest.createFunction(
    { id: "update-user-from-clerk" },
    { event: "clerk/user.updated" },
    async ({ event }) => {
      const { default: connectDB } = await import("./db.js");
      const { default: User } = await import("../models/user.js");

      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      };

      await connectDB();
      await User.findByIdAndUpdate(id, userData);
    }
  );
}

export function syncUserDeletion() {
  return inngest.createFunction(
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
