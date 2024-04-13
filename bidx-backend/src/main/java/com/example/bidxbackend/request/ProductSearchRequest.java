package com.example.bidxbackend.request;

import lombok.*;
import org.springframework.data.domain.Sort;

import java.util.HashMap;

/**
 * request class for product search
 * @author snehitroda
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductSearchRequest {

    @NonNull
    private String productName;   // search Query -> Q
    @NonNull
    private Integer page;
    @NonNull
    private Integer sizePerPage;
    @Builder.Default
    private Boolean isSortBy = false;
    private String sortField;
    private Sort.Direction sortDirection;
    @Builder.Default
    private Boolean isFilterBy = false;
    private HashMap<String,String> filterBy;

}
