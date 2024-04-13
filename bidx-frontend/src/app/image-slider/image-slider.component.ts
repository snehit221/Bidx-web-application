// @author - KaushikChanabhaiDhola
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SlideInterface } from './image-slider.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})

export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() slides: SlideInterface[] = [];

  currentIndex: number = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  resetTimer() {
    this.clearTimer();
    if (typeof window !== 'undefined') {
      this.timeoutId = window.setTimeout(() => this.goToNext(), 5000);
    }
  }

  clearTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  goToPrevious(): void {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.resetTimer();
  }

  goToNext(): void {
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
    this.resetTimer();
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
    this.resetTimer();
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }

}
