export interface Product {
  "name": string;
  "basko": ProductDetails,
  "cf": ProductDetails,
}

export type Shop = 'cf' | 'basko';

interface ProductDetails {
  "brand": string,
  "price": number,
  "qty": number
}

