package com.example.bidxbackend.api.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.bidxbackend.api.model.Product;

/**
 * @author KaushikChanabhaiDhola
 */
public interface IProductRepository extends MongoRepository<Product, String>{
    List<Product> findByUserId(String userId);
    Page<Product> findByNameRegexIgnoreCase(String searchQuery, Pageable pageable);

    List<Product> findAllByIdIn(List<String> ids);

}