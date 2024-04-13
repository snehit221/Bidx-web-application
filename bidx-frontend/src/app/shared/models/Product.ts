
// product model containing all the product details - to be shown on SRP and PDP pages.

// using interface to define the structure of the product to better follow SOLID
export interface Product {
  id: string;
  userId: number;
  name: string;
  description: string;
  initialBid: number;
  category: string;
  condition: string;
  city: string;
  province: string;
  images: any;
  user: any;
}
