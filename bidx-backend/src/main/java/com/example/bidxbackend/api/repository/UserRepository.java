package com.example.bidxbackend.api.repository;

import com.example.bidxbackend.api.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Aggregation;

import java.util.Optional;
/**
 * @author KaushikChanabhaiDhola
 */
public interface UserRepository extends MongoRepository<User, String> {

    @Aggregation("{ $group: { _id: null, maxId: { $max: '$userId' } } }")
    Integer findMaxUserId();
    Optional<User> findByEmail(String email);
    Optional<User> findById(String userId);

}
