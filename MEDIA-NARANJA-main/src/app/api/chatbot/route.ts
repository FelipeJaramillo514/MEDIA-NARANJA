import { NextRequest } from "next/server";
import { Answers, recommendProducts, buildReason, formatCOP, waLinkFor } from "@/lib/recommendation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const answers = (body?.answers ?? {}) as Answers;
    const top = recommendProducts(answers, 3);

    const result = top.map((p) => ({
      id: p.id,
      name: p.name,
      price: `COP $${formatCOP(p.price)}`,
      reason: buildReason(p, answers),
      wa: waLinkFor(p),
    }));

    return new Response(JSON.stringify({ ok: true, recommendations: result }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_request" }), {
      headers: { "content-type": "application/json" },
      status: 400,
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ ok: true, message: "Naranjita chatbot endpoint listo." }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
