package com.example.bidxbackend.api.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

/**
 * @implNote mongo db model class responsible for persisting the Order.
 * @author Ubaidullah
 */
@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private String productId;
    private String bidId;
    private double amount;
    private BillingDetails billingDetails;
    private OrderStatus status;
    private String cancellationReason;
    private String cancellationComment;
    private LocalDateTime cancellationDate;
    @CreatedDate
    private LocalDateTime orderDate;

    @DBRef
    private User user;

    @DBRef
    private Product product;
}
