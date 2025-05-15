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
  { name: 'Пробне тренування', price: '500 грн' },
  { name: '1 тренування', price: '1000 грн' },
  { name: '8 тренувань', price: '7200 грн' },
  { name: '16 тренувань', price: '13 600 грн' },
  { name: '24 тренувань', price: '19 200 грн' },
  { name: '50 тренувань', price: '37 500 грн' },
];

export const emsPrices: PriceItem[] = [
  { name: 'Пробне тренування', price: '950 грн' },
  { name: '4 тренування', price: '3600 грн' },
  { name: '8 тренувань', price: '6800 грн' },
  { name: '16 тренувань', price: '18 200 грн' },
  { name: '24 тренувань', price: '18 300 грн' },
  { name: '50 тренувань', price: '35 600 грн' },
];

export const fitnessPrices: PriceItem[] = [
  { name: 'Пробне тренування', price: '400 грн' },
  { name: '4 тренування', price: '3000 грн' },
  { name: '8 тренувань', price: '5700 грн' },
  { name: '16 тренувань', price: '15 300 грн' },
  { name: '24 тренувань', price: '30 000 грн' },
  { name: '50 тренувань', price: '30 000 грн' },
];
