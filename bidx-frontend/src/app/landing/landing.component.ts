// Shahroz Ahmad

import { Component } from '@angular/core';
import { ImageSliderComponent } from '../image-slider/image-slider.component';
import { SlideInterface } from '../image-slider/image-slider.interface';
import { CategoryBarComponent } from '../category-bar/category-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { FaqComponent } from '../faq/faq.component';
import { CardViewComponent } from '../shared/card-view/card-view.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    ImageSliderComponent,
    CategoryBarComponent,
    FooterComponent,
    HeaderBarComponent,
    FaqComponent,
    CardViewComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  slides: SlideInterface[] = [
    { url: '/assets/image1.jpg', title: 'electronic1' },
    { url: '/assets/image2.jpg', title: 'electronic2' },
    { url: '/assets/image3.jpg', title: 'furniture' },
  ];

  topItems = [
    {
      image:
        'https://images.samsung.com/is/image/samsung/hk-en-feature-gear-fit2-pro-76872287?$FB_TYPE_K_MO_JPG$',
      title: 'FitGear Pro Fitness Tracker',
      description:
        'Sleek device for monitoring heart rate, steps, calories, and sleep patterns.',
    },
    {
      image:
        'https://audiofi.ca/cdn/shop/products/iFi-ZEN-CAN_grande.jpg?v=1615588043',
      title: 'AudioZen Wireless Headphones',
      description:
        'Immersive audio with noise-canceling tech. Comfortable for hands-free calling.',
    },
    {
      image:
        'https://media.wired.com/photos/6063a637b1232f1d308ec1d9/master/w_1600%2Cc_limit/Gear-9Barista-Espresso-Maker-SOURCE-9Barista.jpg',
      title: 'EspressoMate Portable Espresso Maker',
      description:
        'Compact and lightweight for on-the-go espresso brewing. Perfect for coffee enthusiasts.',
    },
  ];

  upcomingAuctions = [
    {
      image:
        'https://images.samsung.com/is/image/samsung/hk-en-feature-gear-fit2-pro-76872287?$FB_TYPE_K_MO_JPG$',
      title: 'FitGear Pro Fitness Tracker',
      description:
        'Sleek device for monitoring heart rate, steps, calories, and sleep patterns.',
    },
    {
      image:
        'https://audiofi.ca/cdn/shop/products/iFi-ZEN-CAN_grande.jpg?v=1615588043',
      title: 'AudioZen Wireless Headphones',
      description:
        'Immersive audio with noise-canceling tech. Comfortable for hands-free calling.',
    },
    {
      image:
        'https://media.wired.com/photos/6063a637b1232f1d308ec1d9/master/w_1600%2Cc_limit/Gear-9Barista-Espresso-Maker-SOURCE-9Barista.jpg',
      title: 'EspressoMate Portable Espresso Maker',
      description:
        'Compact and lightweight for on-the-go espresso brewing. Perfect for coffee enthusiasts.',
    },
    {
      image:
        'https://wireo.eu/cdn/shop/files/description-image-5_e026ecc7-d51d-4598-8483-b1c26c101bc0.jpg?v=1704233607&width=1445',
      title: 'SecureView Pro Security Camera',
      description:
        'HD video, night vision, and motion detection for 24/7 home surveillance.',
    },
    {
      image:
        'https://www.shavercentre.com/canada/images/philips-sonicare-dental.jpg',
      title: 'DentaCare Sonic Electric Toothbrush',
      description:
        'Upgrade oral hygiene with powerful sonic tech. Rechargeable for travel.',
    },
  ];
}
