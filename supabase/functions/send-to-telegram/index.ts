import { serve } from "https://deno.land/std@0.192.0/http/server.ts";

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204, // use 204 No Content for preflight
      headers: corsHeaders,
    });
  }

  try {
    const { name, phone } = await req.json();

    const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!BOT_TOKEN || !CHAT_ID) {
      throw new Error("Telegram credentials are missing");
    }

    const message = `Нова заявка:\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}`;
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramData.ok) {
      throw new Error(`Telegram API error: ${telegramData.description}`);
    }

    return new Response(JSON.stringify({ success: true, data: telegramData }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});
