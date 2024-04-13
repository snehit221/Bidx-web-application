// @author - KaushikChanabhaiDhola

import { Product } from "./Product";

export interface WishlistResponse {
  status: {
    message: string;
    httpResponseCode: number;
  };
  userWishList: Product[];
}