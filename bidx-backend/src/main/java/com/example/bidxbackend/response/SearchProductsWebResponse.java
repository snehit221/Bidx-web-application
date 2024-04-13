package com.example.bidxbackend.response;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.dto.ApiResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

/**
 * @implNote  response class for product search results as per criteria q.
 * @author snehitroda
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchProductsWebResponse {

    private Page<Product> products;

    private ApiResponseDTO status;

    public SearchProductsWebResponse(ApiResponseDTO apiResponseDTO) {
        this.status = apiResponseDTO;
    }
}
