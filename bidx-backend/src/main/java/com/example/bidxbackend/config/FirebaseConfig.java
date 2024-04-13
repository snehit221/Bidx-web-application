package com.example.bidxbackend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {
    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        String path = "firebase-adminsdk.json";
        // String path = "/Users/kaushikdhola/Documents/Dalhousie University/Term 2/Advanced Web/BidX/csci-5709-grp-03/bidx-backend/src/main/resources/firebase-adminsdk.json";
        FileInputStream serviceAccount = new FileInputStream(path);

        @SuppressWarnings("deprecation")
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("bidx-store.appspot.com")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}