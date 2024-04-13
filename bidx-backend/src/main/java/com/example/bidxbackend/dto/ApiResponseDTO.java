package com.example.bidxbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Custom API response class for modularized API response management.
 * @author snehitroda
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponseDTO {

    private String message;
    private Integer HttpResponseCode;
}
