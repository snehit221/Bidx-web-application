import { Injectable } from "@angular/core";
import { Product } from "../shared/models/Product";

/* This class is used to load the default products and achieve separation of concerns */
@Injectable({
    providedIn: 'root',
})
export class DefaultProducts {
    loadDefaultSearchProducts(): Product[] {
        return [
            new Product(
                "6604c9264cd17d41d12751eb",
                'Bed',
                500,
                'New',
                'Furniture',
                '/assets/products/bed.jpg',
                { name: 'Seller1', email: 'seller1@example.com' }
            ),
            new Product(
                "6604c9264cd17d41d12751eb",
                'Guitar',
                300,
                'Used',
                'Music Instruments',
                '/assets/products/guitar.jpg',
                { name: 'Seller2', email: 'seller2@example.com' }
            ),
            new Product(
                "6604c9264cd17d41d12751eb",
                'Headphone',
                50,
                'Refurbished',
                'Electronics',
                '/assets/products/headphone.jpg',
                { name: 'Seller3', email: 'seller3@example.com' }
            ),
            new Product(
                "6604c9264cd17d41d12751eb",
                'iPhone',
                800,
                'New',
                'Electronics',
                '/assets/products/iphone.jpg',
                { name: 'Seller4', email: 'seller4@example.com' }
            ),
            new Product(
                "6604c9264cd17d41d12751eb",
                'Monitor',
                200,
                'Used',
                'Electronics',
                '/assets/products/monitor.jpg',
                { name: 'Seller5', email: 'seller5@example.com' }
            ),
            new Product(
                "6604c9264cd17d41d12751eb",
                'Study Table',
                100,
                'New',
                'Furniture',
                '/assets/products/studyTable.jpg',
                { name: 'Seller6', email: 'seller6@example.com' }
            )
        ];
    }
}