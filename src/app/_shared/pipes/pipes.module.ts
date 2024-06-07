import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelPolicyPipe } from './cancel-policy.pipe';
import { TripLevelPipe } from './trip-level.pipe';
import { TripStatusPipe } from './trip-status.pipe';
import { GenderPipe } from './gender.pipe';
import { PaymentStatusPipe } from './payment-status.pipe';

@NgModule({
  declarations: [				
    CancelPolicyPipe,
      TripLevelPipe,
      TripStatusPipe,
      GenderPipe,
      PaymentStatusPipe
   ],
  imports: [
    CommonModule
  ],
  exports: [CancelPolicyPipe,
    TripLevelPipe,
    TripStatusPipe,
    GenderPipe,
    PaymentStatusPipe
  ]
})
export class PipesModule { }