import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../MaterialModule';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BoardUserRoutingModule } from './board-user-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BoardUserRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ]
})
export class TripModule { }
