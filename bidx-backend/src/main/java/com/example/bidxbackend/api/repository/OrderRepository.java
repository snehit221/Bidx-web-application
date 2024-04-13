package com.example.bidxbackend.api.repository;

import com.example.bidxbackend.api.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Ubaidullah
 */
@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
     List<Order> findByUserId(String userId);
     List<Order> findByProductIdIn(List<String> productIds);
}
