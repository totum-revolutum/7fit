import { supabase } from "../lib/supabaseClient";

export async function sendContactToSupabase(name: string, phone: string) {
  const { data, error } = await supabase
    .from("contact_requests")
    .insert([{ name, phone }]);

  if (error) throw error;
  return data;
}

export async function sendContactToTelegram(name: string, phone: string) {
  const response = await fetch(
    "https://mqrcavmlaazkmvqmztss.supabase.co/functions/v1/send-to-telegram",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ name, phone }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram API error: ${text}`);
  }

  return await response.json();
}
