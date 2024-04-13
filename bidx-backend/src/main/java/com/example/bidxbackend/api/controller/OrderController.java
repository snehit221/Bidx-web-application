package com.example.bidxbackend.api.controller;

import com.example.bidxbackend.api.dto.OrderStatusUpdateDto;
import com.example.bidxbackend.api.model.Order;
import com.example.bidxbackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * @implNote controller class responsible for handling order operations.
 * @author Ubaidullah
 */
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        Optional<Order> orderOptional = orderService.getOrderById(orderId);
        if (orderOptional.isPresent()) {
            return ResponseEntity.ok(orderOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        Order savedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

    @PatchMapping("/{orderId}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderId, @RequestBody OrderStatusUpdateDto statusUpdateDto) {
        try {
            Order updatedOrder = orderService.updateOrderStatus(orderId, statusUpdateDto);
            return ResponseEntity.ok(updatedOrder);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable String userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable String orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable String orderId, @RequestBody Map<String, Object> cancellationData) {
        try {
            Order order = orderService.cancelOrder(orderId, cancellationData);
            return ResponseEntity.ok(order);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<Order>> getOrdersForSeller(@PathVariable String sellerId) {
        List<Order> orders = orderService.getOrdersForSeller(sellerId);
        if (!orders.isEmpty()) {
            return ResponseEntity.ok(orders);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
