package com.example.bidxbackend.api.repository;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.request.ProductSearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

/**
 * @author snehitroda
 */
public interface ICustomProductRepository {
    Page<Product> fetchData(ProductSearchRequest productSearchRequest, PageRequest pageRequest);
}
