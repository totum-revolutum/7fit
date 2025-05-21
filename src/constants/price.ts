export interface PriceItem {
  name: string;
  price: string;
}

export interface TrainingPrices {
  type: string;
  title: string;
  prices: PriceItem[];
}

export const boxingPrices: PriceItem[] = [
  { name: "Пробне тренування", price: "300 грн" },
  { name: "1 тренування", price: "750 грн" },
  { name: "6 тренувань", price: "4 200 грн" },
  { name: "12 тренувань", price: "8 100 грн" },
  { name: "18 тренувань", price: "11 400 грн" },
  { name: "24 тренувань", price: "14 400 грн" },
];

export const emsPrices: PriceItem[] = [
  { name: "Пробне тренування", price: "500 грн" },
  { name: "1 тренування", price: "900 грн" },
  { name: "4 тренування", price: "3 400 грн" },
  { name: "8 тренувань", price: "6 400 грн" },
  { name: "16 тренувань", price: "12 200 грн" },
  { name: "24 тренувань", price: "17 200 грн" },
  { name: "50 тренувань", price: "33 700 грн" },
];

export const fitnessPrices: PriceItem[] = [
  { name: "Пробне тренування", price: "400 грн" },
  { name: "1 тренування", price: "800 грн" },
  { name: "4 тренування", price: "3 000 грн" },
  { name: "8 тренувань", price: "5 700 грн" },
  { name: "16 тренувань", price: "10 800 грн" },
  { name: "24 тренувань", price: "15 300 грн" },
  { name: "50 тренувань", price: "30 000 грн" },
];
