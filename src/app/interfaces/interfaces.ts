export interface Product {
  "name": string;
  "basko": ProductDetails,
  "cf": ProductDetails,

}

interface ProductDetails {
  "brand": string,
  "price": number,
  "qty": number
}