import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import routes from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqETlJde_r2fKYzMVbE4HVs5W8UAJfI40",
  authDomain: "bidx-store.firebaseapp.com",
  projectId: "bidx-store",
  storageBucket: "bidx-store.appspot.com",
  messagingSenderId: "836122518535",
  appId: "1:836122518535:web:9e09d390e7d811e45eb6a2",
  measurementId: "G-VFF8GJ2S52"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)), 
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      AngularFireAuthModule
    ) 
  ]
};
export { firebaseConfig };