// Shahroz Ahmad

package com.example.bidxbackend.api.repository;

import com.example.bidxbackend.api.model.Bid;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface IBidRepository extends MongoRepository<Bid, String> {
    List<Bid> findByProductId(String productId);
}
