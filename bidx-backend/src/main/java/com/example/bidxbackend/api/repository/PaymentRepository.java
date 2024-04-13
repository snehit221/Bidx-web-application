package com.example.bidxbackend.api.repository;

import com.example.bidxbackend.api.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository<Payment, String> {

}
