package com.example.bidxbackend.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class FirebaseStorageService {

    private static final String BUCKET_NAME="bidx-store.appspot.com";

    public static Map<String, String> uploadImages(MultipartFile[] images) throws IOException {
        Map<String, String> imageUrls = new HashMap<>();

        String path = "firebase-adminsdk.json";
        FileInputStream serviceAccount = new FileInputStream(path);

        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()
                .getService();

        for (MultipartFile image : images) {
            String imageName = generateUniqueImageName(image);
            Path tempFile = Files.createTempFile(imageName, "");
            try {
                Files.copy(image.getInputStream(), tempFile, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

                // Generate a custom token for the image
                String customToken = UUID.randomUUID().toString();

                BlobId blobId = BlobId.of(BUCKET_NAME, imageName);
                Map<String, String> metadata = new HashMap<>();
                metadata.put("firebaseStorageDownloadTokens", customToken);
                BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                        .setContentType(image.getContentType())
                        .setMetadata(metadata)
                        .build();

                storage.create(blobInfo, Files.readAllBytes(tempFile));

                // Construct the download URL
                String imageUrl = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media&token=%s", BUCKET_NAME, imageName, customToken);
                imageUrls.put(imageName, imageUrl);
            } finally {
                Files.deleteIfExists(tempFile);
            }
        }

        return imageUrls;
    }

    private static String generateUniqueImageName(MultipartFile image) {
        String originalName = image.getOriginalFilename();
        String extension = "";
        int lastDotIndex = originalName.lastIndexOf('.');
        if (lastDotIndex > 0) {
            extension = originalName.substring(lastDotIndex);
        }
        String uniqueName = UUID.randomUUID().toString() + extension;
        return uniqueName;
    }
}
