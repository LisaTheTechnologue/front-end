import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css']
})
export class FeedbackCardComponent {
  @Input() feedback: any
  ngOnInit(): void {
    this.feedback.imageURL = 'data:image/jpeg;base64,' + this.feedback.byteImg;
  }
}
