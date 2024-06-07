import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Lightbox, LightboxEvent } from 'ngx-lightbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})
export class ImageLightboxComponent {
  @Input() slides: any[] = []; 
  selectedImageIndex: number = -1;
  isOpen:boolean;
  lightboxImages: any[] = [];
  constructor() {
    // this.images = this.slides.map(img => `data:image/jpeg;base64,${img}`);
    this.lightboxImages = this.slides.map(img => ({
      src: `${img}`,  // Assuming your images are JPEGs and base64 encoded
    }));
    
  }

  openImageModal(index: number): void {
    this.isOpen = true;
    this.selectedImageIndex = index;
  }
  
  closeImageModal(): void {
    this.isOpen = false;
  }

  currentIndex = 0;
  getVisibleSlides(): string[] {
    const startIndex = Math.floor(this.currentIndex / 3) * 3;
    return this.slides.slice(startIndex, startIndex + 3);
  }
  
  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
  nextSlide(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    }
  }
  
}
