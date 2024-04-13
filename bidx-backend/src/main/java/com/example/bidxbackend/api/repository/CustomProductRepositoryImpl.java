package com.example.bidxbackend.api.repository;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.request.ProductSearchRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @implNote custom mongo db repo class implemented.
 * <p>This class is responsible for building as well as executing the
 * paginated mongo db query for product search use case.</p>
 * @author snehitroda
 */
@Repository
@RequiredArgsConstructor
public class CustomProductRepositoryImpl implements ICustomProductRepository {

    private final MongoTemplate mongoTemplate;
    Logger log = LoggerFactory.getLogger(CustomProductRepositoryImpl.class);


    @Override
    public Page<Product> fetchData(ProductSearchRequest productSearchRequest, PageRequest pageRequest) {
        log.info("inside findByFilteredMethod...");
        Page<Product> productList;

        Query createdQueryWithFilters = buildQuery(pageRequest,productSearchRequest);
        productList = executeQuery(createdQueryWithFilters, pageRequest);

        return productList;
    }

    public Query buildQuery(PageRequest pageable, ProductSearchRequest productSearchRequest){
        log.info("inside buildQuery... filers: {}", productSearchRequest.getFilterBy());
        Query query = new Query();
        query.addCriteria(Criteria.where("name").regex("(?i)" + productSearchRequest.getProductName())); // Case-insensitive regex

        if(productSearchRequest.getIsFilterBy()){
            productSearchRequest.getFilterBy().forEach((key, value) -> {
                query.addCriteria(Criteria.where(key).regex("(?i)" + value)); // Case-insensitive regex for filter criteria
            });
        }


        query.with(pageable);
        return query;
    }

    private Page<Product> executeQuery(Query query, PageRequest pageable) {
        long totalCount = mongoTemplate.count(query, Product.class);
        query.with(pageable);
        List<Product> productList = mongoTemplate.find(query, Product.class);
        return new PageImpl<>(productList, pageable, totalCount);
    }
}
