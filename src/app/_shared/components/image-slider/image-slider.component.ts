import { Component, Input, OnInit } from '@angular/core';
interface Slide {
  imageUrl: string;
  altText: string;
}
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {

  @Input() slides: any[] = []; // Input to receive slide data from parent component

  currentSlideIndex = 0;

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }
  selectSlide(index: number) {
    this.currentSlideIndex = index;
  }
}
