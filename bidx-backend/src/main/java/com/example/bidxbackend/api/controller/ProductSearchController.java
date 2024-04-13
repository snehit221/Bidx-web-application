package com.example.bidxbackend.api.controller;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.dto.ApiResponseDTO;
import com.example.bidxbackend.request.ProductSearchRequest;
import com.example.bidxbackend.response.SearchProductsWebResponse;
import com.example.bidxbackend.response.WishListProductsResponse;
import com.example.bidxbackend.service.ISearchProductsService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @implNote controller class responsible for searching product(s) as per criteria query.
 * @author snehitroda
 */
@RestController
@RequestMapping("/api/v1/search/")
@RequiredArgsConstructor
public class ProductSearchController {

    private final ISearchProductsService searchProductsService;

    Logger log = LoggerFactory.getLogger(ProductSearchController.class);

    @PostMapping("/products")
    public ResponseEntity<SearchProductsWebResponse> searchProductsByCriteria(@Validated @RequestBody ProductSearchRequest productSearchRequest) {
        log.info("** inside : {}", productSearchRequest);
        log.info("going to fetch products...");
        SearchProductsWebResponse searchProductsWebResponse;
        try {
            searchProductsWebResponse = searchProductsService.getSearchProductResults(productSearchRequest);
            ApiResponseDTO apiResponseDTO = new ApiResponseDTO("successfully fetched products.", HttpStatus.OK.value());
            searchProductsWebResponse.setStatus(apiResponseDTO);

        } catch (Exception e) {
            log.info("failed to search products.");
            e.printStackTrace();
            searchProductsWebResponse = new SearchProductsWebResponse(new ApiResponseDTO("failed.", 500));
            return ResponseEntity.ok(searchProductsWebResponse);
        }
        return ResponseEntity.ok(searchProductsWebResponse);
     }

    @PostMapping("/products-wish-list")
    public ResponseEntity<WishListProductsResponse> searchUserWishList(@Validated @RequestBody List<String> userWishListIds) {
        log.info("** user wish list : {}", userWishListIds);
        log.info("going to  products wish list...");
        WishListProductsResponse wishListProductsResponse;
        try {
            wishListProductsResponse = searchProductsService.getUserWishListResults(userWishListIds);
            ApiResponseDTO apiResponseDTO = new ApiResponseDTO("successfully fetched products wish list.", HttpStatus.OK.value());
            wishListProductsResponse.setStatus(apiResponseDTO);

        } catch (Exception e) {
            log.info("failed to search products.");
            e.printStackTrace();
            wishListProductsResponse = new WishListProductsResponse(new ApiResponseDTO("failed to get wishlist.", 500));
            return ResponseEntity.ok(wishListProductsResponse);
        }
        return ResponseEntity.ok(wishListProductsResponse);
    }
    }

