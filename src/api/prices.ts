import { supabase } from "../lib/supabaseClient";

export interface PriceItem {
  id: number;
  category: string; // "ДЗЮДО/БОКС" | "EMS" | "ФІТНЕС"
  name: string;     // "1 тренування", "8 тренувань", "Пробне тренування"
  price: string;    // "4 200 грн"
  created_at?: string;
}

export type NewPriceItem = Omit<PriceItem, "id" | "created_at">;

export const getPrices = async (): Promise<PriceItem[]> => {
  const { data, error } = await supabase
    .from("price")
    .select("*")
    .order("category", { ascending: true })
    .order("id", { ascending: true });

  if (error) throw error;
  return data ?? [];
};

export const addPrice = async (item: NewPriceItem): Promise<PriceItem> => {
  const { data, error } = await supabase.from("price").insert(item).select().single();
  if (error) throw error;
  return data!;
};

export const updatePrice = async (
  id: number,
  patch: Partial<NewPriceItem>
): Promise<PriceItem> => {
  const { data, error } = await supabase.from("price").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data!;
};

export const deletePrice = async (id: number): Promise<void> => {
  const { error } = await supabase.from("price").delete().eq("id", id);
  if (error) throw error;
};
