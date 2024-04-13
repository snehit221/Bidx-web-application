package com.example.bidxbackend.api.model;

import lombok.Data;

/**
 * @implNote class responsible for the billing details.
 * @author Ubaidullah
 */
@Data
public class BillingDetails {
    private String firstName;
    private String lastName;
    private String streetAddress;
    private String city;
    private String state;
    private String zipcode;
    private String paymentMethod;
    private String orderNotes;
    private String paymentToken;
}
