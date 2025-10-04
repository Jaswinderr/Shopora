import { serve } from "inngest/next";

export const GET = async (req, res) => {
  res.status(200).json({ message: "Inngest GET endpoint" });
};

export const POST = async (req, res) => {
  const { inngest, syncUserCreation, syncUserUpdation, syncUserDeletion } = await import("@/config/inngest");

  const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
      syncUserCreation,
      syncUserUpdation,
      syncUserDeletion,
    ],
  });

  return POST(req, res);
};
