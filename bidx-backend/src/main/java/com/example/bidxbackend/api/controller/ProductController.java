

package com.example.bidxbackend.api.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.example.bidxbackend.api.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.bidxbackend.api.model.Product;
import com.example.bidxbackend.service.FirebaseStorageService;
import com.example.bidxbackend.service.ProductService;

/**
 * @implNote controller class responsible for handling product operations.
 * @author KaushikChanabhaiDhola
 */
@RestController
@RequestMapping("/products")
public class ProductController {


    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public Product addProduct(
            @RequestParam("userId") String userId,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("initialBid") double initialBid,
            @RequestParam("category") String category,
            @RequestParam("city") String city,
            @RequestParam("province") String province,
            @RequestParam("auctionDeadline") LocalDateTime auctionDeadline,
            @RequestParam("itemValue") double itemValue,
            @RequestParam("images") MultipartFile[] images) throws Exception {

        return productService.saveProductWithImages(userId, name, description, initialBid, category, city, province, auctionDeadline, itemValue, images);
    }

    @GetMapping("/getAllProducts")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/getProducts/{userId}")
    public List<Product> getProducts(@PathVariable("userId") String userId) {
        return productService.getProductsForUserId(userId);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable("productId") String productId) {
        Product product = productService.getProductById(productId);
        return product;
        //return productService.prepareProductImages(product);
    }
    
    @PostMapping(value = "/update/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product updateProduct(
            @PathVariable("productId") String productId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "images", required = false) MultipartFile[] images) throws Exception {

        Product product = productService.getProductById(productId);
        System.out.println("Products"+product);
        if (name != null) {
            product.setName(name);
        }
        if (description != null) {
            product.setDescription(description);
        }
        if (category != null) {
            product.setCategory(category);
        }

        if (images != null && images.length > 0) {
            productService.deleteProductImages(product);
            Map<String, String> imageUrls = FirebaseStorageService.uploadImages(images);
            Map<String, String> modifiedImageUrls = productService.modifyMapKeys(imageUrls);
            product.getImages().clear();
            product.setImages(modifiedImageUrls);
        }

        return productService.saveProduct(product);
    }

    @PostMapping("/concludeBidding/{productId}")
    public ResponseEntity<?> concludeBidding(@PathVariable("productId") String productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            if (!product.isBiddingConcluded()) {
                product.setBiddingConcluded(true);
                productService.saveProduct(product);
                return ResponseEntity.ok().body("Bidding has been successfully concluded for product ID " + productId);
            } else {
                return ResponseEntity.badRequest().body("Bidding has already been concluded for product ID " + productId);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("productId") String productId) {
        productService.deleteProductById(productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
