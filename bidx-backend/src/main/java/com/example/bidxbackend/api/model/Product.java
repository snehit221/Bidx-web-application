package com.example.bidxbackend.api.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @implNote mongo db model class responsible for persisting the product details.
 * @author KaushikChanabhaiDhola, snehitroda
 */
@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
    private double initialBid;
    private String category;
    private String condition;
    private String city;
    private String province;
    private Map<String, String> images = new HashMap<>();
    @CreatedDate
    private LocalDateTime listedDate;
    private LocalDateTime auctionDeadline;
    private double itemValue;
    private boolean biddingConcluded;

    @DBRef
    private User user;

}
