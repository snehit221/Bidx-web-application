package com.example.bidxbackend.api.model;

import java.util.List;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @implNote mongo db model class responsible for persisting the users details.
 * @author KaushikChanabhaiDhola
 */
@Data
@Document(collection = "users")
public class User {
    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    @DBRef
    private List<Product> products;
}
