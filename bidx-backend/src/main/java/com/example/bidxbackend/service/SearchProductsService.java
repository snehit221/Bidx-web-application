package com.example.bidxbackend.service;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.api.repository.ICustomProductRepository;
import com.example.bidxbackend.api.repository.IProductRepository;
import com.example.bidxbackend.request.ProductSearchRequest;
import com.example.bidxbackend.response.SearchProductsWebResponse;
import com.example.bidxbackend.response.WishListProductsResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @implNote  service responsible for interacting with repository layer for search query of products.
 * @author snehitroda
 */
@Service
@RequiredArgsConstructor
public class SearchProductsService implements ISearchProductsService{

    private final IProductRepository productRepository;
    private final ICustomProductRepository customProductRepository;

    Logger log = LoggerFactory.getLogger(SearchProductsService.class);

    @Override
    public SearchProductsWebResponse getSearchProductResults(ProductSearchRequest productSearchRequest) {
        Page<Product> productList;
        SearchProductsWebResponse searchProductsWebResponse = new SearchProductsWebResponse();
        log.info("inside getSearchProductResults with Q: {}", productSearchRequest.getProductName());
        PageRequest pageRequest;
        if(productSearchRequest.getIsSortBy()){  // sort case
            pageRequest = PageRequest.of(productSearchRequest.getPage(), productSearchRequest.getSizePerPage(), productSearchRequest.getSortDirection(), productSearchRequest.getSortField());
        }
        else{
            pageRequest = PageRequest.of(productSearchRequest.getPage(), productSearchRequest.getSizePerPage());
        }

        System.out.println("calling mongo for query...");
        productList = customProductRepository.fetchData(productSearchRequest,pageRequest);

        log.info("productList paginated: {}", productList);
        searchProductsWebResponse.setProducts(productList);
        return searchProductsWebResponse;
    }

    @Override
    public WishListProductsResponse getUserWishListResults(List<String> wishListIds) {
        WishListProductsResponse wishListProductsResponse = new WishListProductsResponse();
        wishListProductsResponse.setUserWishList(productRepository.findAllByIdIn(wishListIds));
        return wishListProductsResponse;
    }


}
