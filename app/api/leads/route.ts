import { NextRequest, NextResponse } from "next/server";

const businessTypes = new Set([
  "cafe_restaurante",
  "padaria_confeitaria",
  "beleza",
  "loja_presentes",
  "pet_shop",
  "mercado_bairro",
  "outro",
]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function invalid(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== request.nextUrl.origin) {
        return invalid("Não foi possível validar esta solicitação.", 403);
      }
    } catch {
      return invalid("Não foi possível validar esta solicitação.", 403);
    }
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return invalid("Formato de solicitação inválido.", 415);
  }

  let body: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 8_192) {
      return invalid("O formulário excedeu o tamanho permitido.", 413);
    }
    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return invalid("Os dados enviados são inválidos.");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return invalid("Não foi possível ler os dados do formulário.");
  }

  // Silently accept honeypot submissions so automated spam receives no signal.
  if (cleanText(body.website, 200)) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const contactName = cleanText(body.contactName, 120);
  const businessName = cleanText(body.businessName, 120);
  const email = cleanText(body.email, 254).toLowerCase() || null;
  const phone = cleanText(body.phone, 24) || null;
  const businessType = cleanText(body.businessType, 40) || null;
  const message = cleanText(body.message, 600) || null;
  const wantsPresentation = body.wantsPresentation === true;
  const contactPermission = body.contactPermission === true;

  if (contactName.length < 2 || businessName.length < 2) {
    return invalid("Informe seu nome e o nome do comércio.");
  }
  if (!email && !phone) {
    return invalid("Informe um e-mail ou WhatsApp para podermos responder.");
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return invalid("Confira o endereço de e-mail informado.");
  }
  if (businessType && !businessTypes.has(businessType)) {
    return invalid("Selecione uma opção válida para o segmento.");
  }
  if (!contactPermission) {
    return invalid("Precisamos da sua autorização para responder a esta solicitação.");
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim()
    || process.env.SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !publishableKey) {
    return invalid("O formulário ainda não está conectado ao banco de dados.", 503);
  }

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/business_interest_leads`, {
      method: "POST",
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        contact_name: contactName,
        business_name: businessName,
        email,
        phone,
        business_type: businessType,
        wants_presentation: wantsPresentation,
        message,
        contact_permission: contactPermission,
      }),
      cache: "no-store",
    });
  } catch {
    return invalid("Não foi possível conectar ao banco agora. Tente novamente em instantes.", 503);
  }

  if (!response.ok) {
    console.error("Lead submission failed with status", response.status);
    return invalid("Não foi possível registrar seu interesse agora. Tente novamente em instantes.", 502);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
