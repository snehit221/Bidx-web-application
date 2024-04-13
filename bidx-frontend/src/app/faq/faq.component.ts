import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryBarComponent } from "../category-bar/category-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderBarComponent } from "../header-bar/header-bar.component";

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule,HeaderBarComponent, CategoryBarComponent, FooterComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  faqData = [
    {
      question: 'How can I place a bid on an item?',
      answer: 'To place a bid on an item, navigate to the item\'s page and enter your bid amount in the designated field. Then, click the "Place Bid" button.'
    },
    {
      question: 'Can I retract or cancel a bid?',
      answer: 'No, once a bid is placed, it cannot be retracted or canceled. Please ensure you are certain about your bid before placing it.'
    },
    {
      question: 'How do I know if I have won an auction?',
      answer: 'If you have won an auction, you will receive a notification via email or within your BidX account. Additionally, the item will be marked as "Won" in your bidding history.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'BidX accepts various payment methods including credit/debit cards, PayPal, and bank transfers. You can choose your preferred payment method during the checkout process.'
    },
    {
      question: 'Is shipping available?',
      answer: 'Yes, BidX offers shipping services for items purchased through the platform. Shipping options and costs may vary depending on your location and the seller\'s preferences.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'If you have any questions or need assistance, you can contact our customer support team through the "Contact Us" page on the BidX website. We are available 24/7 to assist you.'
    },
    // Add more questions and answers as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
