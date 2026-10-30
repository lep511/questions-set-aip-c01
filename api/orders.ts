import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const event = req.body;
  const order = event.detail;

  console.log("Received order from EventBridge:", JSON.stringify(order));

  return res.status(200).json({
    message: "Order received",
    orderId: order?.orderId,
  });
}
