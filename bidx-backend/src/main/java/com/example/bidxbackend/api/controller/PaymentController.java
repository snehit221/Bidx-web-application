package com.example.bidxbackend.api.controller;

import com.example.bidxbackend.api.model.Payment;
import com.example.bidxbackend.api.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @PostMapping("/processPayment")
    public String processPayment(@RequestBody Payment request) {
        // Save payment information to MongoDB
        paymentRepository.save(request);

        // Log payment details
        System.out.println("Received payment token: " + request.getToken());
        System.out.println("Amount: " + request.getAmount());
        System.out.println("User ID: " + request.getUserId());
        System.out.println("Product ID: " + request.getProductId());

        // Return a response to the client
        return "Payment token received successfully and saved to the database";
    }
}
