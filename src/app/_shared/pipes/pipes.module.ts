import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CancelPolicyPipe } from './cancel-policy.pipe';

@NgModule({
  declarations: [CancelPolicyPipe],
  imports: [
    CommonModule
  ],
  exports: [CancelPolicyPipe]
})
export class PipesModule { }