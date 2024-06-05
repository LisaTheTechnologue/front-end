import { Component, Input } from '@angular/core';
import { Feedback } from '../../models/trip.model';

@Component({
  selector: 'app-feedback-card',
  templateUrl: './feedback-card.component.html',
  styleUrls: ['./feedback-card.component.css']
})
export class FeedbackCardComponent {
  @Input() feedback: Feedback
  ngOnInit(): void {
    this.feedback.imageByte = 'data:image/jpeg;base64,' + this.feedback.imageByte;
  }
}
