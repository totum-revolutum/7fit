// Форматує число як "14 400 грн"
export const formatPriceUAH = (value: number | string): string => {
  const num = typeof value === "string" ? Number(value.replace(/[^\d]/g, "")) : value;
  if (Number.isNaN(num)) return "0 грн";
  return `${num.toLocaleString("uk-UA").replace(/\u00A0/g, " ")} грн`;
};

// Визначає правильну форму слова "тренування"
export const trainingWordUA = (n: number) => {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs >= 11 && abs <= 14) return "тренувань";
  if (last === 1) return "тренування";
  if (last >= 2 && last <= 4) return "тренування";
  return "тренувань";
};

// Будує name для позиції
export const buildTrainingName = (opts: { isTrial?: boolean; count?: number }): string => {
  if (opts.isTrial) return "Пробне тренування";
  const c = Math.max(0, Number(opts.count || 0));
  return `${c} ${trainingWordUA(c)}`.trim();
};

// Парсить count з name (для попереднього заповнення в режимі редагування)
export const parseCountFromName = (name: string): { isTrial: boolean; count?: number } => {
  const lower = name.toLowerCase();
  if (lower.includes("пробн")) return { isTrial: true };
  const m = name.match(/\d+/);
  return m ? { isTrial: false, count: Number(m[0]) } : { isTrial: false, count: undefined };
};
