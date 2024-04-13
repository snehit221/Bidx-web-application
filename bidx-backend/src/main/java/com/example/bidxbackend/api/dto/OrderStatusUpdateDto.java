package com.example.bidxbackend.api.dto;
import com.example.bidxbackend.api.model.OrderStatus;
import lombok.Data;

/**
 * @implNote DTO class responsible for Order Status
 * @author Ubaidullah
 */
@Data
public class OrderStatusUpdateDto {
    private OrderStatus status;
    private String cancellationReason;
    private String cancellationComment;

}

