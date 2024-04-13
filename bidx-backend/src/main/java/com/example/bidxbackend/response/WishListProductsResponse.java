package com.example.bidxbackend.response;


import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.dto.ApiResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author snehitroda
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishListProductsResponse {

    private List<Product> userWishList;

    private ApiResponseDTO status;

    public WishListProductsResponse(ApiResponseDTO apiResponseDTO) {
    }
}
