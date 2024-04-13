package com.example.bidxbackend.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.bidxbackend.api.model.User;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.http.MediaType;
import java.util.Optional;
import com.example.bidxbackend.api.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.bidxbackend.api.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.bidxbackend.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;

/**
 * @implNote  service responsible for interacting with repository layer for interacting with products collection based on operations.
 * @author KaushikChanabhaiDhola
 */
@Service
public class ProductService {
    private final IProductRepository productRepository;
    @SuppressWarnings("unused")
    private final UserRepository userRepository;

    @Value("${firebase.bucket-name}")
    private String bucketName;

    @Autowired
    public ProductService(IProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product saveProductWithImages(String userId, String name, String description, double initialBid,
                                         String category, String city, String province, LocalDateTime auctionDeadline,
                                         double itemValue, MultipartFile[] images) throws Exception {
        Product product = new Product();
        product.setUserId(userId);
        product.setName(name);
        product.setDescription(description);
        product.setInitialBid(initialBid);
        product.setCategory(category);
        product.setCity(city);
        product.setProvince(province);
        product.setAuctionDeadline(auctionDeadline);
        product.setItemValue(itemValue);
        product.setBiddingConcluded(false);
        Map<String, String> imageUrls = FirebaseStorageService.uploadImages(images);

        Map<String, String> modifiedImageUrls = modifyMapKeys(imageUrls);

        product.setImages(modifiedImageUrls);

        return productRepository.save(product);
    }


    public Map<String, String> modifyMapKeys(Map<String, String> originalMap) {
        Map<String, String> modifiedMap = new HashMap<>();
        for (Map.Entry<String, String> entry : originalMap.entrySet()) {
            String modifiedKey = entry.getKey().replace(".", "_");
            modifiedMap.put(modifiedKey, entry.getValue());
        }
        return modifiedMap;
    }

    public Product saveProductWithUserId(Product product, String userId) {
        product.setUserId(userId);
        return productRepository.save(product);
    }

    public Product getProductById(String id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        } else {
            throw new RuntimeException("Product not found with ID: " + id);
        }
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProductById(String id) {
        productRepository.deleteById(id);
    }
    public Product prepareProductImages(Product product) {
        Map<String, String> imageMap = product.getImages();
        for (Map.Entry<String, String> entry : imageMap.entrySet()) {
            String imageName = entry.getKey();

            String firebaseStorageUrl = "gs://bidx-store.appspot.com/" + imageName;
            entry.setValue("data:" + MediaType.APPLICATION_OCTET_STREAM.toString() + ";base64," + firebaseStorageUrl);
        }
        return product;
    }

    private void deleteImagesFromFirebaseStorage(List<String> imageUrlsToDelete) throws IOException {

        String path = "firebase-adminsdk.json";
        FileInputStream serviceAccount = new FileInputStream(path);

        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
                .getService();

        for (String imageUrl : imageUrlsToDelete) {
            String objectName = getImageObjectNameFromUrl(imageUrl);
            Blob blob = storage.get(bucketName, objectName);
            if (blob != null) {
                blob.delete();

                System.out.println("Deleted image: " + imageUrl);
            } else {
                System.out.println("Image not found: " + imageUrl);
            }
        }
    }

    public void deleteProductImages(Product product) throws IOException {
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            List<String> imageUrlsToDelete = new ArrayList<>(product.getImages().values());
            deleteImagesFromFirebaseStorage(imageUrlsToDelete);
            product.getImages().clear();
        }
    }

    private String getImageObjectNameFromUrl(String imageUrl) {
        String[] parts = imageUrl.split("/");
        return parts[parts.length - 1];
    }

    public List<Product> getProductsForUserId(String userId) {
        return productRepository.findByUserId(userId);
    }
}