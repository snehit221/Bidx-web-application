package com.example.bidxbackend.api.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Slf4j
@Data
@Getter
@Setter
@Document(collection = "payments")

public class Payment {
    @Id
    private String token;
    private String amount;
    private String userId;
    private String productId;

}
