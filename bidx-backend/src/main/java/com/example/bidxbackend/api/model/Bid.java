// Shahroz Ahmad

package com.example.bidxbackend.api.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "bidType")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ManualBid.class, name = "manual"),
        @JsonSubTypes.Type(value = AutomaticBid.class, name = "automatic")
})
@Data
@Document(collection = "bids")
public abstract class Bid {
    @Id
    private String id;
    private String productId;
    private String userId;
    private double bidAmount;
    @CreatedDate
    private LocalDateTime bidDate;
    private boolean isWinningBid = false;
}