package com.example.bidxbackend.service;
import com.example.bidxbackend.api.model.User;
import com.example.bidxbackend.api.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * @implNote  service responsible for interacting with repository layer for users collection.
 * @author KaushikChanabhaiDhola
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUser(String userId) {
        return userRepository.findById(userId);
    }

    public User addUser(User newUser) {
        return userRepository.save(newUser);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    
}
