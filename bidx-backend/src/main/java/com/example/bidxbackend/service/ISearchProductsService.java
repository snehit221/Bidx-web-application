package com.example.bidxbackend.service;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.request.ProductSearchRequest;
import com.example.bidxbackend.response.SearchProductsWebResponse;
import com.example.bidxbackend.response.WishListProductsResponse;

import java.util.List;

/**
 * @implNote search service interface created that defined the product search related methods.
 * @author snehitroda
 */
public interface ISearchProductsService {

    SearchProductsWebResponse getSearchProductResults(ProductSearchRequest productSearchRequest) throws Exception;
    WishListProductsResponse getUserWishListResults(List<String> wishListIds);

}
