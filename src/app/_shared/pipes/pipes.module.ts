import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelPolicyPipe } from './cancel-policy.pipe';
import { TripLevelPipe } from './trip-level.pipe';
import { TripStatusPipe } from './trip-status.pipe';

@NgModule({
  declarations: [		
    CancelPolicyPipe,
      TripLevelPipe,
      TripStatusPipe
   ],
  imports: [
    CommonModule
  ],
  exports: [CancelPolicyPipe,
    TripLevelPipe,
    TripStatusPipe
  ]
})
export class PipesModule { }