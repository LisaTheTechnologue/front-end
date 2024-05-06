import { Component, Input } from '@angular/core';
import { Feedback } from '../../_shared/models/trip.model';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.css']
})
export class FeedbackViewComponent {
  @Input() feedback: Feedback
}
