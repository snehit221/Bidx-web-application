package com.example.bidxbackend.service;

import com.example.bidxbackend.api.dto.OrderStatusUpdateDto;
import com.example.bidxbackend.api.model.Order;
import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.api.model.OrderStatus;
import com.example.bidxbackend.api.repository.IProductRepository;
import com.example.bidxbackend.api.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @implNote order service interface that defines order management operations.
 * @author Ubaidullah
 */
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final IProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, IProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order saveOrder(Order order) {
        order.setStatus(OrderStatus.PENDING);
        return this.orderRepository.save(order);
    }

    public Optional<Order> getOrderById(String id) {
        return this.orderRepository.findById(id);
    }

    public List<Order> getAllOrders() {
        return this.orderRepository.findAll();
    }

    public void deleteOrderById(String id) {
        this.orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByUserId(String userId) {
        return this.orderRepository.findByUserId(userId);
    }

    public void deleteOrder(String orderId) {
        Optional<Order> order = this.orderRepository.findById(orderId);
        if (order.isPresent()) {
            this.orderRepository.deleteById(orderId);
        } else {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }
    }
    public Order cancelOrder(String orderId, Map<String, Object> cancellationData) {
        Order order = this.orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        if (order.getStatus() == OrderStatus.PENDING || order.getStatus() == OrderStatus.PROCESSED) {
            order.setStatus(OrderStatus.CANCELED);
            order.setCancellationReason((String) cancellationData.get("reason"));
            order.setCancellationComment((String) cancellationData.get("comment"));
            order.setCancellationDate(LocalDateTime.now());
            return this.orderRepository.save(order);
        } else {
            throw new RuntimeException("Order cannot be canceled in its current status");
        }
    }

    public List<Order> getOrdersForSeller(String sellerId) {
        List<String> productIds = this.productRepository.findByUserId(sellerId)
                .stream()
                .map(Product::getId)
                .collect(Collectors.toList());
        return this.orderRepository.findByProductIdIn(productIds);
    }

    public Order updateOrderStatus(String orderId, OrderStatusUpdateDto statusUpdateDto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        order.setStatus(statusUpdateDto.getStatus());
        if ("CANCELED".equals(statusUpdateDto.getStatus())) {
            order.setCancellationReason(statusUpdateDto.getCancellationReason());
            order.setCancellationComment(statusUpdateDto.getCancellationComment());
        }

        return orderRepository.save(order);
    }
}
